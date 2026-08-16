# DSH GDI+ 文生图插件（让 DeepSeek V4 Flash 自己可以文生图）

> ## ⭐ 核心亮点：不依赖任何其他大模型，即可让 deepseek-v4-flash 文生图
>
> DeepSeek V4 Flash（deepseek-v4-flash）本身**不支持原生图像生成**。本插件的思路是：
> 让 deepseek-v4-flash **自己编写 Windows GDI+（System.Drawing）绘图脚本**，由系统自带的
> `powershell.exe` 在本地渲染成 PNG——全程**只使用 deepseek-v4-flash 这一个模型**，
> **不依赖任何其他大模型**（不需要 DALL·E、Stable Diffusion、Midjourney 等图像模型，
> 也不需要任何外部图像 API），就能让它在对话里"画出"图片。
>
> 效果说明：这是"模型手绘"而非"模型生成"——构图、形状、配色由模型逐笔设计，
> 所以**画面质量只能算"勉强可用"**（类似像素画/简笔画水平），但胜在：
> **零额外依赖、零外部费用、完全本地渲染**。仓库 `examples/` 下的图片就是
> deepseek-v4-flash 的真实输出。

DeepSeek Harness（DSH）插件：把"文生图"交给模型自己写 **Windows GDI+（System.Drawing）** 绘图脚本，由系统自带的 `powershell.exe` 在本地渲染成 PNG，直接显示在对话里——不需要任何外部图像 API。

```
你说"画一只棕色狗" → agent 调用 draw_gdi → 会话模型（deepseek-v4-flash）编写 System.Drawing 绘图脚本
→ powershell.exe 执行 → GDI+ 本地渲染 → PNG 发布到对话内联显示
```

## 包含的插件

| 目录 | 包名 | 作用 |
|---|---|---|
| `dsh-pixel-art/` | `@deepseek-ai/dsh-pixel-art` | 宿主插件：`draw_gdi` 工具（LLM 生成脚本 → powershell.exe 渲染）、`/dsh-gdi-art` 与 `/dsh-pixel-art` 图片服务路由、`dsh-pixel-art` 设置段（enabled / size） |
| `dsh-client-ui-pixel-art/` | `@deepseek-ai/dsh-client-ui-pixel-art` | 浏览器插件：设置页配置卡片（启用开关、默认画布边长、最近图片预览）+ 对话内图片预览卡片（兼容 `draw_gdi` 与旧 `pixel_art`） |

## 安装

1. 将两个插件目录复制到 DSH 部署的插件目录（便携版为 `data\profiles\node_modules\@deepseek-ai\`）。
2. 在 `data\profiles\web\cordis.patch.yml` 中插入：

```yaml
- insert:
    - id: pixel-art
      name: '@deepseek-ai/dsh-pixel-art'
    - id: ui-pixel-art
      name: '@deepseek-ai/dsh-client-ui-pixel-art'
```

3. 重启 DeepSeek Harness，刷新浏览器页面。

## 使用

- 对话中让 agent「画一只狗 / 画个 logo / 画个示意图」即可，agent 会自动调用 `draw_gdi` 工具（参数：`prompt` 描述、`size` 画布边长 128–1024，默认 512）。
- 设置 → 插件 → 插件配置 → 「像素画 / GDI+ 绘图」：启用开关、默认画布边长、最近生成图片预览。
- 生成过程最多重试 3 次：每次把 powershell 的报错反馈给模型修正脚本。

## 示例图片（由 DeepSeek V4 Flash 生成）

仓库 `examples/` 下的所有图片均由 **DeepSeek V4 Flash（deepseek-v4-flash）** 模型在本机生成——模型负责设计构图与脚本，GDI+/像素引擎负责渲染，未使用任何外部图像 API。

**GDI+ 引擎（当前，`draw_gdi` 工具，512×512）**

| 图片 | 说明 |
|---|---|
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/gdi-dog.png" width="256" alt="gdi-dog"> | `gdi-dog.png` 棕色垂耳狗 |
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/gdi-cat.png" width="256" alt="gdi-cat"> | `gdi-cat.png` 橙色小猫 |
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/gdi-mushroom.png" width="256" alt="gdi-mushroom"> | `gdi-mushroom.png` 草地上的红蘑菇 |
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/gdi-landscape.png" width="256" alt="gdi-landscape"> | `gdi-landscape.png` 房子、太阳、树的风景 |

**像素画引擎（旧版，已被 `draw_gdi` 取代）**

> 旧版引擎让 deepseek-v4-flash **一个像素一个像素地输出** 16×16 调色板网格来"画"图：
> 模型要先逐格"读"出每个像素的颜色再生成，这种方式对 deepseek-v4-flash 来说**效果不行**
> （模型不擅长逐像素输出，画出来的图很粗糙），因此被 GDI+ 引擎取代——
> 改成让模型写绘图脚本、由渲染引擎落笔，效果明显更好。以下为旧引擎的存档示例：

| 图片 | 说明 |
|---|---|
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/pixel-dog.png" width="256" alt="pixel-dog"> | `pixel-dog.png` 像素小狗 |
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/pixel-cat.png" width="256" alt="pixel-cat"> | `pixel-cat.png` 像素小猫 |
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/pixel-person.png" width="256" alt="pixel-person"> | `pixel-person.png` 像素小人 |
| <img src="https://cdn.jsdelivr.net/gh/sqs404/dsh-gdi-art-plugins@main/examples/pixel-mushroom.png" width="256" alt="pixel-mushroom"> | `pixel-mushroom.png` 像素蘑菇 |

> 图片通过 jsDelivr CDN 从本仓库加载（`raw.githubusercontent.com` 在部分网络下不可达）。原图也可在 [examples/](examples/) 目录中查看。

## 工作原理与安全提示

- **模型依赖**：`draw_gdi` 调用的是会话当前配置的模型（本项目验证环境为 deepseek-v4-flash）。它只请求这一个模型编写绘图脚本，**不会调用任何其他大模型**；整个生成链路中唯一的"AI"就是会话模型本身，其余全部是本地 PowerShell/GDI+ 渲染。
- 模型输出一段 PowerShell + System.Drawing（GDI+）脚本；插件以当前用户权限运行 `powershell.exe`（`C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`）执行它，输出 PNG 保存在 `$DSH_HOME/dsh-gdi-art/`。
- 脚本渲染有 90 秒超时、64 KB 长度上限；产物会校验 PNG 签名和尺寸。
- ⚠️ 该工具本质是让 LLM 在你本机以当前用户权限执行 PowerShell 代码，请仅在可信环境中使用；生成失败的脚本会反馈给模型重试。
- 包名沿用 `@deepseek-ai/` scope（与 DSH 部署内部命名一致）；如需发布到 npm，请自行更改包名。

## License

MIT
