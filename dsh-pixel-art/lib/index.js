/**
 * dsh-pixel-art — LLM-driven GDI+ text-to-image tool for DeepSeek Harness.
 *
 * Generation (`draw_gdi` tool): the agent's own LLM acts as a GDI+ artist and
 * writes a Windows PowerShell script that draws the requested subject with
 * System.Drawing (shapes, gradients, text — every stroke decided by the
 * model). The plugin executes the script with the built-in powershell.exe;
 * GDI+ renders the PNG locally (no external image API), the plugin validates
 * it, saves it under $DSH_HOME/dsh-gdi-art/, and publishes it to the
 * conversation as an inline preview block.
 *
 * Serving: `/dsh-gdi-art/<file>.png` serves the new GDI+ drawings;
 * `/dsh-pixel-art/<file>.png` keeps older pixel-art images visible in
 * existing conversations. Both routes also answer `list.json` with the most
 * recent images for the Settings preview card.
 *
 * Settings namespace `dsh-pixel-art` (Settings → Plugins → Plugin
 * configuration): `enabled` gate and `size` default canvas side. All read at
 * call time (hot-reloadable).
 *
 * @module @deepseek-ai/dsh-pixel-art
 */

import { execFile } from "node:child_process";
import { createReadStream } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { promisify } from "node:util";
import z from "@deepseek-ai/schemastery";
import { installSettingsSection, settingsNamespace } from "@deepseek-ai/dsh-settings";
import { defineTool } from "@deepseek-ai/dsh-tools";
import { createUserMessage } from "@deepseek-ai/dsh-llm";

/** Cordis plugin name used by loader diagnostics. */
export const name = "pixel-art";

/** Services this plugin consumes. */
export const inject = ["tools", "webServer", "attachments"];

/** Stable id the settings section registers under. */
const SETTINGS_NS = settingsNamespace("dsh-pixel-art");

/** Settings namespace carrying the agent's default model route. */
const AGENT_MODEL_NS = settingsNamespace("agent-default-model");

/** Subdirectories of $DSH_HOME where images are stored. */
const PIXEL_OUTPUT_DIR = "dsh-pixel-art";
const GDI_OUTPUT_DIR = "dsh-gdi-art";

/** HTTP route prefixes serving images. */
const PIXEL_ROUTE = "/dsh-pixel-art";
const GDI_ROUTE = "/dsh-gdi-art";

/** Default canvas side length in pixels. */
const DEFAULT_SIZE = 512;
/** Canvas side bounds. */
const MIN_SIZE = 128;
const MAX_SIZE = 1024;

/** Max attempts before giving up: each retry feeds the render error back. */
const MAX_ATTEMPTS = 3;

/** Hard timeout for one powershell.exe render run. */
const RENDER_TIMEOUT_MS = 90_000;

/** Safety cap on the LLM-produced script length. */
const MAX_SCRIPT_CHARS = 64 * 1024;

/** PNG signature used to validate the rendered output. */
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** The settings section shape. */
export const Config = z.object({
  enabled: z.boolean().default(true),
  size: z.number().min(MIN_SIZE).max(MAX_SIZE).default(DEFAULT_SIZE),
});

/** Clamp an integer into [lo, hi]; NaN/undefined fall back to `fallback`. */
function clampInt(value, lo, hi, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(hi, Math.max(lo, Math.round(n)));
}

/** The output directory for one image subfolder, anchored at the DSH home. */
function outputDirOf(sub) {
  const home = process.env.DSH_HOME;
  return home !== void 0 && home.length > 0 ? join(home, sub) : resolve(process.cwd(), sub);
}

/** The loopback origin this web server answers on (0.0.0.0 binds all). */
function originOf(server) {
  const host = server.host === "0.0.0.0" ? "127.0.0.1" : server.host;
  return `http://${host}:${server.port}`;
}

/** The built-in Windows PowerShell (always present on Windows 10/11). */
function powershellPath() {
  const root = process.env.SystemRoot ?? "C:\\Windows";
  return join(root, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
}

/** Strip a markdown code fence if the model wrapped the script in one. */
function stripFence(text) {
  return text.replace(/```(?:powershell|ps1|pwsh)?/gi, "").trim();
}

/**
 * Validate a PNG buffer and read its pixel dimensions from the IHDR chunk.
 * @param data - the rendered file bytes.
 * @returns {width, height}, or null when the file is not a PNG.
 */
function parsePng(data) {
  if (data.length < 24 || !PNG_MAGIC.equals(data.subarray(0, 8))) return null;
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

/**
 * Run one PowerShell drawing script; the PNG must land at $env:DSH_GDI_OUT.
 * @param scriptPath - path of the .ps1 file to execute.
 * @param outPath - PNG output path injected as DSH_GDI_OUT.
 * @param signal - abort signal (agent cancellation / timeout).
 * @returns the captured stdout/stderr of the run.
 */
async function runPowerShell(scriptPath, outPath, signal) {
  const execFileAsync = promisify(execFile);
  const { stdout, stderr } = await execFileAsync(powershellPath(), [
    "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", scriptPath,
  ], {
    timeout: RENDER_TIMEOUT_MS,
    windowsHide: true,
    maxBuffer: 4 * 1024 * 1024,
    env: { ...process.env, DSH_GDI_OUT: outPath },
    signal,
  });
  return { stdout: String(stdout ?? ""), stderr: String(stderr ?? "") };
}

/**
 * Serve one image directory over one route prefix; `list.json` returns the
 * most recent PNG files (used by the Settings preview card).
 */
function registerImageRoute(ctx, prefix, dir) {
  const server = ctx.get("webServer");
  ctx.effect(() => server.register({
    kind: "prefix",
    path: prefix,
    handler: async (req, res) => {
      const pathname = new URL(req.url ?? "/", "http://dsh.internal").pathname;
      const name = basename(pathname);
      try {
        if (name === "list.json") {
          const entries = (await readdir(dir, { withFileTypes: true }))
            .filter((entry) => entry.isFile() && entry.name.endsWith(".png"))
            .map((entry) => ({ name: entry.name }))
            .sort((a, b) => b.name.localeCompare(a.name))
            .slice(0, 12);
          const body = JSON.stringify({
            files: entries.map((entry) => ({ name: entry.name, url: `${prefix}/${entry.name}` })),
          });
          res.writeHead(200, {
            "content-type": "application/json",
            "content-length": String(Buffer.byteLength(body)),
            "cache-control": "no-cache",
          });
          res.end(body);
          return;
        }
        if (name === "" || name === "/" || !name.endsWith(".png") || name.includes("..")) {
          res.writeHead(404);
          res.end();
          return;
        }
        const file = join(dir, name);
        const info = await stat(file);
        if (!info.isFile()) throw new Error("not a file");
        res.writeHead(200, {
          "content-type": "image/png",
          "content-length": String(info.size),
          "cache-control": "no-cache",
        });
        for await (const chunk of createReadStream(file)) {
          if (!res.write(chunk)) await new Promise((drain) => res.once("drain", drain));
        }
        res.end();
      } catch {
        res.writeHead(404);
        res.end();
      }
    },
  }), `pixel-art: image route ${prefix}`);
}

/**
 * Register the `draw_gdi` tool (LLM-driven GDI+ text-to-image), the settings
 * section, and the image routes.
 * @param ctx - Host root context.
 * @param config - the row config (fallback before settings materialize).
 */
export function apply(ctx, config) {
  let current = () => config;
  installSettingsSection(ctx, SETTINGS_NS, Config, config, {
    setSource: (source) => {
      current = source;
    },
    onChange: () => {},
  });

  registerImageRoute(ctx, PIXEL_ROUTE, outputDirOf(PIXEL_OUTPUT_DIR));
  registerImageRoute(ctx, GDI_ROUTE, outputDirOf(GDI_OUTPUT_DIR));

  ctx.tools.register(defineTool({
    name: "draw_gdi",
    description: "Generate an image from a text description by driving Windows GDI+ (System.Drawing): the agent's own LLM writes a PowerShell drawing script (shapes, gradients, text — every stroke decided by the model) that the plugin runs with the built-in powershell.exe, rendering the PNG locally (no external image API), then shows it inline in the conversation. Use this when the user asks for a picture, illustration, drawing, diagram, logo, or any visual from text. Describe the subject briefly and plainly (e.g. \"a brown dog\"); the model composes the actual drawing.",
    parameters: {
      prompt: {
        type: "string",
        required: true,
        description: "A short, plain description of the subject (e.g. \"a brown dog\").",
      },
      size: {
        type: "number",
        description: "Canvas side length in pixels (128–1024, default 512).",
      },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          path: { type: "string", required: true },
          url: { type: "string", required: true },
          prompt: { type: "string", required: true },
          width: { type: "number", required: true },
          height: { type: "number", required: true },
          bytes: { type: "number", required: true },
          attachment: {
            type: "object",
            required: true,
            additionalProperties: false,
            properties: {
              attachmentId: { type: "string", required: true },
              mediaType: { type: "string", required: true },
              bytes: { type: "number", required: true },
              width: { type: "number", required: true },
              height: { type: "number", required: true },
            },
          },
          supportsImage: { type: "boolean", required: true },
        },
      },
      render: (_args, value) => [
        // Custom block type (NOT "image"): model-side content scans only flag
        // `type: "image"` blocks, so this preview block never poisons the
        // model context on non-vision models; the client plugin's keyed
        // `tool.call.toolview` card renders it as an inline preview window.
        {
          type: "gdi-art-preview",
          url: value.url,
          width: value.width,
          height: value.height,
          bytes: value.bytes,
        },
        {
          type: "text",
          text: [
            `Generated ${value.width}×${value.height} GDI+ drawing (${value.bytes} bytes).`,
            `Open original: ${value.url}`,
            ...(value.supportsImage === true ? [] : ["Current model does not accept image input, so the picture is not embedded in the conversation; preview it via the link above."]),
          ].join("\n"),
        },
      ],
    },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      if (current().enabled === false) {
        throw new Error('GDI+ drawing is disabled (dsh-pixel-art.enabled = false); enable it in Settings → Plugins → Plugin configuration');
      }
      const prompt = typeof args.prompt === "string" && args.prompt.trim().length > 0
        ? args.prompt.trim()
        : "a colorful landscape with a house and trees";
      const size = clampInt(args.size, MIN_SIZE, MAX_SIZE, current().size ?? DEFAULT_SIZE);

      // The agent's own model: same provider/model the session is configured with.
      const settings = ctx.get("settings");
      const modelConfig = settings?.get(AGENT_MODEL_NS);
      const provider = modelConfig?.provider;
      const model = modelConfig?.model;
      if (typeof provider !== "string" || typeof model !== "string") {
        throw new Error("no agent-default-model configured (provider/model missing); cannot call the language model");
      }
      const llm = ctx.get("llm");
      if (llm === void 0) throw new Error("llm service unavailable");

      // Whether the session's model accepts image input: when it does not, the
      // conversation must NOT embed an image block, so the tool returns a text
      // + URL result and the picture is previewed in the conversation card.
      let supportsImage = false;
      try {
        const info = await llm.resolveModelInfo?.(provider, model);
        supportsImage = Array.isArray(info?.inputModalities) && info.inputModalities.includes("image");
      } catch {
        supportsImage = false;
      }

      const dir = outputDirOf(GDI_OUTPUT_DIR);
      await mkdir(dir, { recursive: true });
      const file = `gdi-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}.png`;
      const outPath = join(dir, file);

      let lastScript = "";
      let lastReason = "";
      let attempt = 0;
      let png = null;

      while (attempt < MAX_ATTEMPTS && png === null) {
        const strict = attempt > 0;
        // Keep the prompt SHORT and plain: the model writes the whole drawing
        // itself; the plugin only enforces the plumbing around it.
        const system = [
          "You are a GDI+ drawing artist. Draw the subject with Windows GDI+ (System.Drawing) by writing a PowerShell script.",
          `Canvas size: ${size}×${size} pixels (adapt your layout to it).`,
          "Rules:",
          "- Start the script with: Add-Type -AssemblyName System.Drawing",
          "- Create the bitmap and its Graphics, enable AntiAlias smoothing, and dispose of every GDI object you create.",
          `- Save the finished PNG to the path in the environment variable DSH_GDI_OUT: $bmp.Save($env:DSH_GDI_OUT, [System.Drawing.Imaging.ImageFormat]::Png)`,
          "- You may draw filled shapes, outlines, curves, gradients, text and decorations — be creative, but keep the script valid and self-contained.",
          "- Output ONLY the PowerShell script. No explanations, no markdown fences.",
          ...(strict
            ? [`CRITICAL: the previous script failed to render (${lastReason || "unknown error"}). Output a corrected, complete PowerShell script only.`]
            : []),
          "The picture: " + prompt,
        ].join("\n");
        const userTurn = `Draw "${prompt}" with GDI+. Output only the PowerShell script.`;

        let text = "";
        try {
          const stream = llm.stream({
            provider,
            model,
            system,
            messages: [createUserMessage({ content: [{ type: "text", text: userTurn }] })],
            maxTokens: 8000,
            temperature: 0.8,
            signal: exec.signal,
          });
          for await (const chunk of stream) {
            if (chunk.type === "text-delta") text += chunk.text;
          }
        } catch (error) {
          if (exec.signal.aborted === true) throw new Error("drawing aborted");
          throw new Error(`language model call failed: ${String(error)}`);
        }
        lastScript = text;

        const script = stripFence(text);
        if (script.length === 0) {
          lastReason = "the model returned an empty script";
          attempt++;
          continue;
        }
        if (script.length > MAX_SCRIPT_CHARS) {
          lastReason = `script too long (${script.length} chars; cap ${MAX_SCRIPT_CHARS})`;
          attempt++;
          continue;
        }

        const scriptPath = join(dir, `draw-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}.ps1`);
        try {
          await writeScript(scriptPath, script);
        } catch (error) {
          throw new Error(`could not write drawing script: ${String(error)}`);
        }

        let stderrText = "";
        try {
          const result = await runPowerShell(scriptPath, outPath, exec.signal);
          stderrText = result.stderr;
        } catch (error) {
          if (exec.signal.aborted === true) throw new Error("drawing aborted");
          stderrText = String(error?.stderr ?? error?.message ?? error);
        } finally {
          try {
            await rm(scriptPath, { force: true });
          } catch {
            /* best-effort cleanup */
          }
        }

        try {
          const data = await readFile(outPath);
          if (data.length > 0 && parsePng(data) !== null) {
            png = data;
          } else {
            lastReason = `render produced no valid PNG (${stderrText.slice(0, 300) || "no error output"})`;
            attempt++;
          }
        } catch {
          lastReason = `render produced no PNG file (${stderrText.slice(0, 300) || "no error output"})`;
          attempt++;
        }
      }

      if (png === null) {
        const reason = lastReason ? ` rejected: ${lastReason}; ` : " ";
        throw new Error(`GDI+ rendering failed after ${MAX_ATTEMPTS} attempts (${reason}last script: ${lastScript.length > 400 ? `${lastScript.slice(0, 400)}…` : lastScript || "empty reply"})`);
      }

      const dims = parsePng(png) ?? { width: size, height: size };
      const server = ctx.get("webServer");
      const url = `${originOf(server)}${GDI_ROUTE}/${file}`;

      // Publish the PNG to the attachment store so the conversation can
      // reference it durably.
      const attachments = ctx.get("attachments");
      if (attachments !== void 0 && typeof attachments.saveImage === "function") {
        try {
          const ref = await attachments.saveImage({ data: png, mediaType: "image/png", name: file });
          if (ref !== void 0 && ref.attachmentId !== void 0) {
            return {
              path: outPath,
              url,
              prompt,
              width: dims.width,
              height: dims.height,
              bytes: png.length,
              attachment: {
                attachmentId: String(ref.attachmentId),
                mediaType: ref.mediaType ?? "image/png",
                bytes: ref.bytes ?? png.length,
                width: ref.width ?? dims.width,
                height: ref.height ?? dims.height,
              },
              supportsImage,
            };
          }
        } catch (error) {
          ctx.logger?.warn?.(`pixel-art: attachment publish failed: ${String(error)}`);
        }
      }
      return {
        path: outPath,
        url,
        prompt,
        width: dims.width,
        height: dims.height,
        bytes: png.length,
        attachment: {
          attachmentId: `gdi-art-fallback-${Date.now()}`,
          mediaType: "image/png",
          bytes: png.length,
          width: dims.width,
          height: dims.height,
        },
        supportsImage,
      };
    },
  }));
}

/** Write the LLM-produced script to disk (UTF-8 with BOM for PowerShell). */
async function writeScript(scriptPath, script) {
  // PowerShell 5.1 misreads UTF-8 without BOM when the script contains
  // non-ASCII text (e.g. Chinese comments), so write with a BOM.
  await writeFile(scriptPath, "\uFEFF" + script, "utf8");
}
