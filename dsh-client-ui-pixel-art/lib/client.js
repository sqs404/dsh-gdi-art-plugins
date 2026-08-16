window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-pixel-art",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _runtime = require("@deepseek-ai/dsh-client-runtime/client");
		//#region styles
		const css = ".dshPa-card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.dshPa-card:hover{border-color:var(--dsw-alias-label-dimmed)}.dshPa-cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.dshPa-header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.dshPa-header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.dshPa-headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.dshPa-name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.dshPa-description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.dshPa-chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.dshPa-chevronOpen{transform:rotate(180deg)}.dshPa-body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.dshPa-field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.dshPa-field+.dshPa-field{border-top:1px solid var(--dsw-alias-border-l2)}.dshPa-head{align-items:center;gap:8px;display:flex}.dshPa-label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.dshPa-badges{align-items:center;gap:8px;display:inline-flex}.dshPa-badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.dshPa-reset{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.dshPa-reset:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.dshPa-reset:disabled{cursor:default}.dshPa-input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);border-radius:8px;box-sizing:border-box;width:100%;font:inherit;font-size:13px;line-height:1.5;padding:6px 10px}.dshPa-input:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-1px}.dshPa-input:disabled{opacity:.55;cursor:default}.dshPa-hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.dshPa-readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.dshPa-pending{color:var(--dsw-alias-state-warning-primary);font-size:11px;line-height:1.5}.dshPa-preview{flex-direction:column;gap:8px;padding:12px 0;display:flex}.dshPa-previewHead{align-items:center;gap:8px;display:flex}.dshPa-previewTitle{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.dshPa-refresh{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.dshPa-refresh:disabled{cursor:default;opacity:.5}.dshPa-empty{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.dshPa-grid{grid-template-columns:repeat(3,1fr);gap:8px;display:grid}.dshPa-thumb{display:block;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;overflow:hidden;text-decoration:none;background:var(--dsw-alias-bg-layer-1)}.dshPa-thumb img{width:100%;height:auto;display:block}.dshPa-thumbName{display:block;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:4px 6px;font-size:10px;line-height:1.4}.dshPa-footer{justify-content:flex-end;gap:8px;padding:8px 0 12px;display:flex}.dshPa-failed{color:var(--dsw-alias-state-error-primary);margin:0;font-size:12px;line-height:1.5}.dshPa-discard,.dshPa-save{font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:8px;font-size:12px;line-height:1.5;padding:6px 12px}.dshPa-discard:hover:not(:disabled),.dshPa-save:hover:not(:disabled){border-color:var(--dsw-alias-label-dimmed)}.dshPa-discard:disabled,.dshPa-save:disabled{cursor:default;opacity:.5}.dshPa-save{background:var(--dsw-alias-brand-primary,#4d6bfe);border-color:transparent;color:#fff}.dshPa-toolCard{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;flex-direction:column;gap:8px;width:min(280px,100%);margin:4px 0;padding:10px 12px;display:flex}.dshPa-toolError{border-color:var(--dsw-alias-label-error)}.dshPa-toolHead{align-items:center;justify-content:space-between;gap:8px;display:flex}.dshPa-toolBadge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.dshPa-toolState{min-width:0;color:var(--dsw-alias-label-secondary);flex:1;font-size:12px;line-height:1.5}.dshPa-toolOpen{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;text-decoration:underline;text-underline-offset:2px;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.dshPa-toolOpen:hover{color:var(--dsw-alias-label-primary)}.dshPa-toolFrame{display:block;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-layer-1);text-decoration:none;line-height:0}.dshPa-toolFrame img{width:100%;height:auto;display:block;image-rendering:pixelated}.dshPa-toolMeta{color:var(--dsw-alias-label-tertiary);margin:0;font-size:11px;line-height:1.5}.dshPa-toolErrorText{white-space:pre-wrap;word-break:break-word;min-width:0;color:var(--dsw-alias-state-error-primary);margin:0;font-size:11px;line-height:1.5}";
		const tagId = "@deepseek-ai/dsh-client-ui-pixel-art/pixelArtCard.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-pixel-art";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const css_default = {
			"badge": "dshPa-badge",
			"badges": "dshPa-badges",
			"body": "dshPa-body",
			"card": "dshPa-card",
			"cardOpen": "dshPa-cardOpen",
			"chevron": "dshPa-chevron",
			"chevronOpen": "dshPa-chevronOpen",
			"description": "dshPa-description",
			"discard": "dshPa-discard",
			"empty": "dshPa-empty",
			"failed": "dshPa-failed",
			"field": "dshPa-field",
			"footer": "dshPa-footer",
			"grid": "dshPa-grid",
			"head": "dshPa-head",
			"headText": "dshPa-headText",
			"header": "dshPa-header",
			"hint": "dshPa-hint",
			"input": "dshPa-input",
			"label": "dshPa-label",
			"name": "dshPa-name",
			"pending": "dshPa-pending",
			"preview": "dshPa-preview",
			"previewHead": "dshPa-previewHead",
			"previewTitle": "dshPa-previewTitle",
			"readOnly": "dshPa-readOnly",
			"refresh": "dshPa-refresh",
			"reset": "dshPa-reset",
			"save": "dshPa-save",
			"thumb": "dshPa-thumb",
			"thumbName": "dshPa-thumbName",
			"toolBadge": "dshPa-toolBadge",
			"toolCard": "dshPa-toolCard",
			"toolError": "dshPa-toolError",
			"toolErrorText": "dshPa-toolErrorText",
			"toolFrame": "dshPa-toolFrame",
			"toolHead": "dshPa-toolHead",
			"toolMeta": "dshPa-toolMeta",
			"toolOpen": "dshPa-toolOpen",
			"toolState": "dshPa-toolState"
		};
		//#endregion
		//#region form model (staged edits over one settings namespace)
		/** A whole-number field; blank clears, non-finite blocks saving. */
		function numberField(field) {
			return {
				field,
				format: (value) => typeof value === "number" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					const parsed = Number(trimmed);
					return Number.isFinite(parsed) ? { kind: "set", value: parsed } : void 0;
				}
			};
		}
		/** A boolean field; staged text is the literal "true"/"false". */
		function toggleField(field) {
			return {
				field,
				format: (value) => value === false ? "false" : "true",
				parse: (text) => text === "true" || text === "false" ? { kind: "set", value: text === "true" } : void 0
			};
		}
		/** Staged form over one settings scope; writes only on save. */
		var PixelArtForm = class {
			constructor(scope, specs) {
				this.scope = scope;
				this.specs = new Map(specs.map((spec) => [spec.field, spec]));
				this.staged = /* @__PURE__ */ new Map();
				this.listeners = /* @__PURE__ */ new Set();
				this.saving = false;
				this.failed = false;
				scope.subscribe(() => {
					this.publish();
				});
			}
			bind(project) {
				const store = (0, _runtime.createSnapshotStore)(project());
				this.listeners.add(() => {
					store.set(project());
				});
				return store;
			}
			shell() {
				const snapshot = this.scope.getSnapshot();
				const plan = this.plan();
				return {
					available: snapshot.status === "ready",
					writable: snapshot.writable,
					dirty: plan.length > 0,
					invalid: plan.some((item) => item.run === void 0),
					saving: this.saving,
					failed: this.failed
				};
			}
			field(name) {
				const staged = this.staged.get(name);
				const spec = this.specs.get(name);
				if (staged === void 0) return {
					text: spec.format(this.sectionValue(name)),
					overridden: this.stored(name),
					invalid: false
				};
				const write = staged.clear ? { kind: "clear" } : spec.parse(staged.text);
				return {
					text: staged.text,
					overridden: write?.kind === "set",
					invalid: write === void 0
				};
			}
			actions() {
				return {
					edit: (field, text) => {
						this.staged.set(field, { text, clear: false });
						this.failed = false;
						this.publish();
					},
					resetField: (field) => {
						this.staged.set(field, {
							text: this.specs.get(field).format(this.snapshotOf().base?.[field]),
							clear: true
						});
						this.failed = false;
						this.publish();
					},
					save: () => {
						this.save();
					},
					discard: () => {
						if (this.staged.size === 0 && !this.failed) return;
						this.staged.clear();
						this.failed = false;
						this.publish();
					}
				};
			}
			async save() {
				const plan = this.plan();
				const writes = plan.flatMap((item) => item.run === void 0 ? [] : [item.run]);
				if (plan.length === 0 || this.saving || writes.length !== plan.length) return;
				this.saving = true;
				this.failed = false;
				this.publish();
				let landed = true;
				for (const write of writes) landed = await write() && landed;
				if (landed) this.staged.clear();
				this.saving = false;
				this.failed = !landed;
				this.publish();
			}
			plan() {
				const plan = [];
				for (const [field, staged] of this.staged) {
					const spec = this.specs.get(field);
					if (staged.clear) {
						if (this.stored(field)) plan.push({ field, run: () => this.clear(field) });
						continue;
					}
					if (staged.text === spec.format(this.sectionValue(field))) continue;
					const write = spec.parse(staged.text);
					if (write === void 0) plan.push({ field, run: void 0 });
					else if (write.kind === "clear") plan.push({ field, run: () => this.clear(field) });
					else plan.push({ field, run: () => this.store(field, write.value) });
				}
				return plan;
			}
			async clear(field) {
				await this.scope.unset(field);
				return !this.stored(field);
			}
			async store(field, value) {
				await this.scope.set(field, value);
				return this.snapshotOf().user?.[field] === value;
			}
			snapshotOf() {
				return this.scope.getSnapshot();
			}
			sectionValue(field) {
				return this.snapshotOf().value?.[field];
			}
			stored(field) {
				const user = this.snapshotOf().user;
				return user !== void 0 && Object.hasOwn(user, field);
			}
			publish() {
				for (const listener of [...this.listeners]) listener();
			}
		};
		//#endregion
		//#region preview data (recent images over the host route)
		/** Fetch the newest generated images from the host plugin's listing. */
		async function fetchPreviews() {
			const response = await fetch("/dsh-gdi-art/list.json", { cache: "no-store" });
			if (!response.ok) throw new Error(`list ${response.status}`);
			const body = await response.json();
			const files = Array.isArray(body?.files) ? body.files : [];
			return files.filter((entry) => typeof entry?.url === "string");
		}
		/** Load preview entries into component state, tracking the request token. */
		function usePreviews(open, refreshKey) {
			const [entries, setEntries] = react.useState(null);
			const [failed, setFailed] = react.useState(false);
			react.useEffect(() => {
				if (!open) return;
				let alive = true;
				setEntries(null);
				setFailed(false);
				fetchPreviews().then((files) => {
					if (!alive) return;
					setEntries(files);
				}).catch(() => {
					if (!alive) return;
					setFailed(true);
				});
				return () => {
					alive = false;
				};
			}, [open, refreshKey]);
			return { entries, failed };
		}
		//#endregion
		//#region card component
		/** A minimal accessible switch (matches the platform's switch semantics). */
		function PixelSwitch(props) {
			return (0, react_jsx_runtime.jsx)("button", {
				id: props.id,
				type: "button",
				role: "switch",
				"aria-checked": props.checked,
				disabled: props.disabled,
				onClick: props.onToggle,
				style: {
					appearance: "none",
					background: "none",
					border: "none",
					padding: 0,
					cursor: props.disabled ? "default" : "pointer",
					width: 44,
					height: 24,
					borderRadius: 12,
					position: "relative",
					flex: "none",
					background: props.checked ? "var(--dsw-alias-brand-primary, #4d6bfe)" : "var(--dsw-alias-border-l2, #d0d0d0)",
					transition: "background .16s"
				},
				children: (0, react_jsx_runtime.jsx)("span", {
					style: {
						display: "block",
						width: 18,
						height: 18,
						borderRadius: "50%",
						background: "#fff",
						position: "absolute",
						top: 3,
						left: props.checked ? 23 : 3,
						transition: "left .16s",
						boxShadow: "0 1px 2px rgba(0,0,0,.25)"
					}
				})
			});
		}
		/** One numeric field row: label, staged input, override badge + reset. */
		function PixelNumberField(props) {
			return (0, react_jsx_runtime.jsxs)("div", {
				className: css_default.field,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: css_default.head,
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								className: css_default.label,
								htmlFor: props.id,
								children: props.label
							}),
							props.state.overridden ? (0, react_jsx_runtime.jsxs)("span", {
								className: css_default.badges,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: css_default.badge,
										children: props.overriddenLabel
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: css_default.reset,
										disabled: props.disabled,
										onClick: props.onReset,
										children: props.resetLabel
									})
								]
							}) : null
						]
					}),
					(0, react_jsx_runtime.jsx)("input", {
						id: props.id,
						className: css_default.input,
						type: "text",
						inputMode: "numeric",
						value: props.state.text,
						placeholder: props.placeholder ?? "",
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						}
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: css_default.hint,
						children: props.hint
					})
				]
			});
		}
		/**
		* The plugin configuration card: header names the plugin; the body holds
		* the enabled switch, the default canvas size, and a preview grid of the
		* most recent generated images (click a thumbnail to open the original).
		* @param props - locale copy, the card snapshot, form actions, and preview state.
		* @returns the card, or nothing when the namespace is unavailable.
		*/
		function PixelArtCard(props) {
			const { t } = props;
			const [open, setOpen] = react.useState(false);
			const [refreshKey, setRefreshKey] = react.useState(0);
			const state = props.usePixelArtCard((snapshot) => snapshot);
			const preview = usePreviews(open, refreshKey);
			if (!state.available) return null;
			const title = t("title");
			const disabled = !state.writable;
			const checked = state.enabled.text === "true";
			const blocked = !state.dirty || state.invalid || state.saving;
			return (0, react_jsx_runtime.jsxs)("li", {
				className: css_default.card + (open ? " " + css_default.cardOpen : ""),
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: css_default.header,
						"aria-expanded": open,
						"aria-label": `${t(open ? "collapse" : "expand")}: ${title}`,
						onClick: () => {
							setOpen(!open);
						},
						children: [
							(0, react_jsx_runtime.jsxs)("span", {
								className: css_default.headText,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: css_default.name,
										children: title
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: css_default.description,
										children: t("description")
									})
								]
							}),
							state.dirty ? (0, react_jsx_runtime.jsx)("span", {
								className: css_default.pending,
								children: t("unsaved")
							}) : null,
							(0, react_jsx_runtime.jsx)("span", {
								className: css_default.chevron + (open ? " " + css_default.chevronOpen : ""),
								"aria-hidden": true,
								children: "▾"
							})
						]
					}),
					open ? (0, react_jsx_runtime.jsxs)("div", {
						className: css_default.body,
						children: [
							!state.writable ? (0, react_jsx_runtime.jsx)("p", {
								className: css_default.readOnly,
								children: t("readOnly")
							}) : null,
							(0, react_jsx_runtime.jsxs)("div", {
								className: css_default.field,
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: css_default.head,
										children: [
											(0, react_jsx_runtime.jsx)("label", {
												className: css_default.label,
												htmlFor: "plugin-config-pixel-art-enabled",
												children: t("enabled")
											}),
											state.enabled.overridden ? (0, react_jsx_runtime.jsx)("span", {
												className: css_default.badge,
												children: t("overridden")
											}) : null
										]
									}),
									(0, react_jsx_runtime.jsx)(PixelSwitch, {
										id: "plugin-config-pixel-art-enabled",
										checked,
										disabled,
										onToggle: () => {
											props.edit("enabled", checked ? "false" : "true");
										}
									}),
									(0, react_jsx_runtime.jsx)("p", {
										className: css_default.hint,
										children: t("enabledHint")
									})
								]
							}),
							(0, react_jsx_runtime.jsx)(PixelNumberField, {
								id: "plugin-config-pixel-art-size",
								label: t("size"),
								hint: t("sizeHint"),
								placeholder: "512",
								overriddenLabel: t("overridden"),
								resetLabel: t("reset"),
								disabled,
								state: state.size,
								onEdit: (text) => {
									props.edit("size", text);
								},
								onReset: () => {
									props.resetField("size");
								}
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: css_default.preview,
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: css_default.previewHead,
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												className: css_default.previewTitle,
												children: t("previewTitle")
											}),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: css_default.refresh,
												disabled: preview.entries === null,
												onClick: () => {
													setRefreshKey((key) => key + 1);
												},
												children: t("refresh")
											})
										]
									}),
									preview.entries === null ? (0, react_jsx_runtime.jsx)("p", {
										className: css_default.empty,
										children: preview.failed ? t("previewFailed") : t("previewLoading")
									}) : preview.entries.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
										className: css_default.empty,
										children: t("previewEmpty")
									}) : (0, react_jsx_runtime.jsx)("div", {
										className: css_default.grid,
										children: preview.entries.map((entry) => (0, react_jsx_runtime.jsx)("a", {
											className: css_default.thumb,
											href: entry.url,
											target: "_blank",
											rel: "noreferrer",
											title: entry.name,
											children: [
												(0, react_jsx_runtime.jsx)("img", {
													src: entry.url,
													alt: entry.name,
													loading: "lazy"
												}),
												(0, react_jsx_runtime.jsx)("span", {
													className: css_default.thumbName,
													children: entry.name
												})
											]
										}, entry.name))
									})
								]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: css_default.footer,
								children: [
									state.failed ? (0, react_jsx_runtime.jsx)("p", {
										className: css_default.failed,
										children: t("saveFailed")
									}) : null,
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: css_default.discard,
										disabled: (!state.dirty && !state.failed) || state.saving,
										onClick: props.discard,
										children: t("discard")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: css_default.save,
										disabled: blocked,
										onClick: props.save,
										children: state.saving ? t("saving") : t("save")
									})
								]
							})
						]
					}) : null
				]
			});
		}
		const PixelArtCardMemo = react.memo(PixelArtCard);
		//#endregion
		//#region toolview card (inline preview window in the conversation)
		/** Preview payload block types produced by the host plugin's tools. */
		const PREVIEW_TYPES = ["gdi-art-preview", "pixel-art-preview"];
		/** Pick the preview payload block from a settled tool-result's content. */
		function previewBlockOf(content) {
			if (!Array.isArray(content)) return void 0;
			return content.find((block) => PREVIEW_TYPES.includes(block?.type)) ?? void 0;
		}
		/** Join the text blocks of a settled tool-result (for error display). */
		function textOf(content) {
			if (!Array.isArray(content)) return "";
			return content.filter((block) => block?.type === "text" && typeof block.text === "string").map((block) => block.text).join("\n");
		}
		/**
		* Inline preview window for draw_gdi / pixel_art calls: a small framed
		* image with canvas stats and an "open original" link. The preview
		* payload is a custom block type, never `image`, so the model context
		* stays clean on non-vision models while the conversation still shows
		* the picture.
		* @param props - toolview owner (toolName, block, t).
		* @returns the preview card, or the running/error states.
		*/
		function PixelArtToolCard({ toolName, block, t }) {
			const settled = block !== void 0 && "kind" in block;
			const preview = settled ? previewBlockOf(block.content) : void 0;
			const failed = settled && (block.isError === true || block.error !== void 0);
			const badge = toolName ?? "pixel_art";
			if (!settled) {
				return (0, react_jsx_runtime.jsxs)("div", {
					className: css_default.toolCard,
					children: [
						(0, react_jsx_runtime.jsx)("span", {
							className: css_default.toolBadge,
							children: badge
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: css_default.toolState,
							children: t("genRunning")
						})
					]
				});
			}
			if (failed) {
				const message = block.error?.message ?? textOf(block.content) ?? "";
				return (0, react_jsx_runtime.jsxs)("div", {
					className: css_default.toolCard + " " + css_default.toolError,
					children: [
						(0, react_jsx_runtime.jsx)("span", {
							className: css_default.toolBadge,
							children: badge
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: css_default.toolState,
							children: t("genFailed")
						}),
						message ? (0, react_jsx_runtime.jsx)("pre", {
							className: css_default.toolErrorText,
							children: message
						}) : null
					]
				});
			}
			if (preview === void 0) {
				return (0, react_jsx_runtime.jsxs)("div", {
					className: css_default.toolCard,
					children: [
						(0, react_jsx_runtime.jsx)("span", {
							className: css_default.toolBadge,
							children: badge
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: css_default.toolState,
							children: textOf(block.content) || t("genDone")
						})
					]
				});
			}
			return (0, react_jsx_runtime.jsxs)("div", {
				className: css_default.toolCard,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: css_default.toolHead,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: css_default.toolBadge,
								children: badge
							}),
							(0, react_jsx_runtime.jsx)("a", {
								className: css_default.toolOpen,
								href: preview.url,
								target: "_blank",
								rel: "noreferrer",
								children: t("genOpen")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("a", {
						className: css_default.toolFrame,
						href: preview.url,
						target: "_blank",
						rel: "noreferrer",
						title: t("genOpen"),
						children: (0, react_jsx_runtime.jsx)("img", {
							src: preview.url,
							alt: "generated image",
							loading: "lazy"
						})
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: css_default.toolMeta,
						children: t("genMeta", {
							width: preview.width ?? "?",
							height: preview.height ?? "?",
							bytes: preview.bytes ?? "?"
						})
					})
				]
			});
		}
		const PixelArtToolCardMemo = react.memo(PixelArtToolCard);
		//#endregion
		//#region controller + registration
		/** Namespace of the drawing tool's settings (mirrors the host plugin). */
		const NS = "dsh-pixel-art";
		/** Dictionary namespace owned by this plugin. */
		const DICT = "pixelArt";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"title": "像素画 / GDI+ 绘图",
			"description": "LLM 操控 GDI+（System.Drawing）本地生成图片：模型编写 PowerShell 绘图脚本，powershell.exe 渲染，无需外部 API。",
			"enabled": "启用图片生成",
			"enabledHint": "开：agent 可通过 draw_gdi 工具生成图片。关：工具被禁用。",
			"size": "默认画布边长",
			"sizeHint": "未指定 size 时的默认边长（128–1024），默认 512。",
			"previewTitle": "最近生成的图片",
			"refresh": "刷新",
			"previewLoading": "正在加载预览…",
			"previewFailed": "无法加载预览列表（宿主插件未运行？）。",
			"previewEmpty": "还没有生成过图片。在对话中让 agent 调用 draw_gdi 工具即可，生成后这里会出现缩略图。",
			"overridden": "已覆盖",
			"reset": "恢复默认",
			"readOnly": "本部署的设置为只读。",
			"expand": "展开设置",
			"collapse": "收起设置",
			"save": "保存",
			"saving": "保存中…",
			"discard": "放弃修改",
			"unsaved": "未保存",
			"saveFailed": "本部署没有接受这些值，已保留供你修改。",
			"genRunning": "正在生成图片…",
			"genDone": "生成完成",
			"genFailed": "生成失败",
			"genOpen": "打开原图 ↗",
			"genMeta": "画布 {width}×{height} · {bytes} 字节"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"title": "Pixel Art / GDI+ Drawing",
			"description": "LLM-driven GDI+ (System.Drawing) image generation: the model writes a PowerShell drawing script, powershell.exe renders it locally — no external API.",
			"enabled": "Enable image generation",
			"enabledHint": "On: agents can call the draw_gdi tool. Off: the tool refuses with a pointer to this setting.",
			"size": "Default canvas size",
			"sizeHint": "Default side length when size is not specified (128–1024, default 512).",
			"previewTitle": "Recently generated images",
			"refresh": "Refresh",
			"previewLoading": "Loading preview…",
			"previewFailed": "Could not load the preview list (host plugin not running?).",
			"previewEmpty": "No images generated yet. Ask the agent to call the draw_gdi tool in a conversation; thumbnails appear here afterwards.",
			"overridden": "Overridden",
			"reset": "Reset to default",
			"readOnly": "This deployment stores settings read-only.",
			"expand": "Show settings",
			"collapse": "Hide settings",
			"save": "Save",
			"saving": "Saving…",
			"discard": "Discard",
			"unsaved": "Unsaved",
			"saveFailed": "The deployment did not accept these values; they were left for you to correct.",
			"genRunning": "Generating image…",
			"genDone": "Done",
			"genFailed": "Generation failed",
			"genOpen": "Open original ↗",
			"genMeta": "Canvas {width}×{height} · {bytes} bytes"
		};
		/** Required services (cordis fiber inject). */
		const inject = [
			"slots",
			"locale",
			"connection",
			"remote",
			"settingsScope"
		];
		/** Tool names whose results the conversation card renders. */
		const TOOL_KEYS = ["draw_gdi", "pixel_art"];
		/**
		* Mount the configuration card into the plugins settings page and the
		* inline preview window for draw_gdi / pixel_art tool results.
		* @param ctx - the browser plugin context.
		*/
		function apply(ctx) {
			const t = ctx.locale.bind(DICT);
			ctx.effect(() => ctx.locale.register(DICT, {
				zh,
				en
			}), "ui-pixel-art: section dictionaries");
			const controller = new PixelArtForm(ctx.settingsScope.bind({ namespace: NS }), [
				toggleField("enabled"),
				numberField("size")
			]);
			const store = controller.bind(() => ({
				...controller.shell(),
				enabled: controller.field("enabled"),
				size: controller.field("size")
			}));
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				id: "pixel-art",
				order: 35,
				locale: DICT,
				inject: () => ({
					hooks: { pixelArtCard: store },
					...controller.actions()
				})
			}, PixelArtCardMemo));
			// Inline preview window for generated-image calls (keyed toolview;
			// the generic row is replaced for these tool names).
			for (const key of TOOL_KEYS) {
				ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({
					name: "tool.call.toolview",
					key,
					locale: DICT
				}, PixelArtToolCardMemo));
			}
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
