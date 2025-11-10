项目规则与维护手册（2025-11-10）

概述
- 目标：构建并维护一个用于个人展示的静态网站，部署于 GitHub Pages（`Legend717.github.io`）。
- 技术栈：纯 `HTML/CSS/JS`，无后端；默认入口为 `index.html`。
- 语言：支持中英文切换（默认中文），所有可本地化文本通过 `data-i18n`/`data-i18n-attr` 与字典驱动。

项目结构
- 根目录：`index.html`（首页）、`post.html`（详情页）、`styles.css`、`script.js`、`blog/`（Markdown 内容）。
- 示例：
  - `blog/vla.md`、`blog/vla.en.md`
  - `blog/pi.md`、`blog/pi.en.md`

页面与模块
- 导航栏：首页、关于我、作品集、项目、碎碎念；右侧包含主题切换与语言切换。
- 首页横幅：头像、姓名、别名、个人标语与快速行动按钮。
- 关于我：教育背景与技能标签（内联标签）。
- 作品集：论文/文章等展示。
- 项目展示：卡片式呈现项目与技术栈。
- 碎碎念（Thoughts）：卡片集合，自动摘要与标签；标题可点击进入详情。
- 页脚：研究兴趣、快速链接、联系邮箱、版权信息、返回顶部。

国际化与语言切换
- 入口：导航右侧 `language-toggle` 的 `中/EN` 两按钮。
- 状态：使用 `localStorage.lang` 持久化；`html[lang]` 与 `document.title` 按语言更新。
- 文案：页面元素带 `data-i18n`；属性翻译用 `data-i18n-attr`（如 `aria-label`、`title`）。
- 字典：集中于 `script.js` 的 `translations.zh` / `translations.en`；新增文案时请在 HTML 标记键位并在字典两侧补齐。

碎碎念与详情页（内容模型）
- 详情页路径：
  - `post.html?p=<slug>` 读取 `blog/<slug>.<lang>.md`，若不存在则回退 `blog/<slug>.md`。
  - 或 `post.html?md=<path>` 直接指定 Markdown（相对或以 `blog/` 开头）。
- 自动标题与日期：
  - 标题取 Markdown 首个一级标题（首行 `# 标题`）。
  - 日期取开头的首个引言行（首行以 `>` 开头）。
- 自动摘要（首页卡片）：
  - 略去首个标题、开头的引言块与代码块；提取正文前 1–2 个自然段渲染为摘要。
- 标签渲染（首页卡片）：
  - 支持 YAML Front-Matter：`tags`、`tags_zh`、`tags_en`。
  - 按当前语言优先读取 `tags_zh`/`tags_en`，否则回退到 `tags`；渲染到 `.thought-tags`。
- 渲染器：使用 CDN 引入 `marked` 在前端解析 Markdown；加载中与失败文案使用 `thoughts.detail.*` 键位。
- 可选覆盖：若需要维护完全自定义摘要或标签，直接在 `index.html` 的卡片内容中写静态文案或保留空容器。

更新碎碎念的标准流程
1) 选定 `slug` 并创建文件：
   - 必须：`blog/<slug>.md`
   - 可选：`blog/<slug>.en.md`（英文版；中文仍用无后缀的同名文件作为回退）
2) 在 Markdown 顶部编写：
   - 一级标题作为详情页标题：`# 你的标题`
   - 紧随其后写一行日期或注记：`> 2024-10-12`（或其它说明）
   - YAML Front-Matter（如需标签）：
     ```yaml
     ---
     tags: [默认标签]
     tags_zh: [中文标签1, 中文标签2]
     tags_en: [English Tag 1, Tag 2]
     ---
     ```
3) 在首页卡片中添加或更新链接：
   - 标题链接形式：`<h3><a href="post.html?p=<slug>" class="thought-title-link">初始占位标题</a></h3>`
   - 页面加载后，脚本会用 Markdown 的 H1 自动替换标题，并生成摘要/日期/标签。
4) 验证：本地预览并测试语言切换（见下文预览与部署）。

预览与部署
- 本地预览：在项目根目录执行 `python -m http.server 8000`，浏览器打开 `http://localhost:8000/`。
- 部署到 GitHub Pages：代码推送到主分支；Pages 设置为从 `root` 构建（或按仓库设置调整）。

维护规范与检查清单
- 语言切换后，首页碎碎念标题/日期/标签需与当前语言一致。
- 如果某语言版本未提供 Markdown，页面应自动回退到默认文件，不报错。
- 新增文案必须在 `script.js` 的字典两侧补齐；属性翻译通过 `data-i18n-attr`。
- 链接需使用相对路径并保持静态站点要求（不依赖后端）。

待确认的个人信息（用于完善页面文案）
- 中文姓名与英文全名：当前为 `Xingping Chen / Legend`，是否需要中文姓名？
- 个人头像或照片：目前使用占位图标，是否提供图片？
- 邮箱：`chenxp68@mail2.sysu.edu.cn`（已使用），是否新增备用邮箱？
- GitHub：`https://github.com/Legend717`（已使用）。
- 主页标语、研究兴趣关键词：如需更新请注明中英文版本。

后续可选扩展
- 维护清单：可新增 `blog/posts.json` 以自动生成卡片列表，减少首页手动维护。
- 语法高亮：按需引入 `highlight.js`（CDN）。
- 元信息：在 Front-Matter 中加入标题、日期、标签等字段并在前端渲染。