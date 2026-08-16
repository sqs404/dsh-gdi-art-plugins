# DSH GDI+ 文生图插件（LLM 操控 GDI+ 生成本地图片）

DeepSeek Harness（DSH）插件：把"文生图"交给模型自己写 **Windows GDI+（System.Drawing）** 绘图脚本，由系统自带的 `powershell.exe` 在本地渲染成 PNG，直接显示在对话里——不需要任何外部图像 API。

```
你说"画一只棕色狗" → agent 调用 draw_gdi → 会话模型编写 System.Drawing 绘图脚本
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
| [gdi-dog.png](examples/gdi-dog.png) | 棕色垂耳狗 |
| [gdi-cat.png](examples/gdi-cat.png) | 橙色小猫 |
| [gdi-mushroom.png](examples/gdi-mushroom.png) | 草地上的红蘑菇 |
| [gdi-landscape.png](examples/gdi-landscape.png) | 房子、太阳、树的风景 |

**像素画引擎（旧版，已被 `draw_gdi` 取代，16×16 放大）**

| 图片 | 说明 |
|---|---|
| [pixel-dog.png](examples/pixel-dog.png) | 像素小狗 |
| [pixel-cat.png](examples/pixel-cat.png) | 像素小猫 |
| [pixel-person.png](examples/pixel-person.png) | 像素小人 |
| [pixel-mushroom.png](examples/pixel-mushroom.png) | 像素蘑菇 |

## 工作原理与安全提示

- 模型输出一段 PowerShell + System.Drawing（GDI+）脚本；插件以当前用户权限运行 `powershell.exe`（`C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`）执行它，输出 PNG 保存在 `$DSH_HOME/dsh-gdi-art/`。
- 脚本渲染有 90 秒超时、64 KB 长度上限；产物会校验 PNG 签名和尺寸。
- ⚠️ 该工具本质是让 LLM 在你本机以当前用户权限执行 PowerShell 代码，请仅在可信环境中使用；生成失败的脚本会反馈给模型重试。
- 包名沿用 `@deepseek-ai/` scope（与 DSH 部署内部命名一致）；如需发布到 npm，请自行更改包名。

## License

MIT
