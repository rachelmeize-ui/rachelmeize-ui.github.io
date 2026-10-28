# 张美泽 · 把好奇变成作品

[打开个人网站](https://rachelmeize-ui.github.io/) · [下载项目作品集](https://rachelmeize-ui.github.io/assets/meize-project-portfolio.pdf) · [Gmail 联系](mailto:rachel.meize@gmail.com)

![蓝色星海风格的个人项目网站首页](assets/site-preview.webp)

## 精选项目

| 项目 | 可以展开的内容 |
| --- | --- |
| [AI 能力评测](https://rachelmeize-ui.github.io/#case-evaluation) | 回答记录、错误归因、歧义探针与评测范围 |
| [CampusBudget](https://rachelmeize-ui.github.io/#case-campus) | AI 辅助原型、保存前确认、日期误判修复与预设测试 |
| [FinFair](https://rachelmeize-ui.github.io/#case-finfair) | 金融信息对照、原文追溯与团队分工 |
| [金融项目汇报 Skill](https://rachelmeize-ui.github.io/#case-skill) | 事实分级、版本状态、V1/V2 与场景复测 |
| [银行客户营销响应预测](https://rachelmeize-ui.github.io/#case-marketing) | 离线模型评估、指标解释与客户触达建议 |

网站包含星海流星、开场缩放、滚动计数、桌面三段展开面板，以及项目筛选、案例档案、日期解析交互演示、PDF 下载与手机端导航。支持暂停星空动效、键盘切换与减少动态效果。每个案例均说明项目范围、个人或团队分工，以及当前验证情况。

## 联系

主要邮箱：rachel.meize@gmail.com

备用邮箱：2024290206@szu.edu.cn

## 本地预览

直接打开 `index.html`，或运行 `python -m http.server 8766 --bind 127.0.0.1` 后访问本机地址。网页使用原生 HTML、CSS 和 JavaScript，无需安装前端依赖。GSAP / ScrollTrigger / Lenis 从公开 CDN 加载，仅用于增强动效；加载失败或开启减少动态效果时，正文、数字、筛选、案例与演示仍可使用。

## 材料说明

项目原型截图使用模拟数据。星海背景与特征工程页面来自作者提供的项目 PPT，仅作网页格式优化，未声明为原创美术作品。没有上传原 PPT、原始客户数据或私密账本。夜海、蓝色蝴蝶与发光海浪背景来自作者提供的参考截图，经网页格式压缩并通过 CSS 蒙板、透明度与模糊处理融入页面。源码、页面与作品集使用 AI 协作制作。

## 交互与文字

参考作者提供的 React Bits TextPressure、MaskedHeading、StrokeText、FoldText、StarBorder、JellyRadio、CardSwap、Galaxy / Particles 示例，以原生 CSS、SVG、Canvas 和 JavaScript 重新组织适合本网站的效果。没有加入 React 或构建步骤。首页项目卡片由访客手动切换；触屏与减少动态效果均保留静态可读内容。暂停星空动效会同步暂停星光边框和背景粒子。

## 连续星海叙事

参考作者提供的 Mostar 电影式滚动示例，封面、探索记录与作品引导共用一个停驻场景。滚动驱动背景分层视差、缓慢推进与文字淡入淡出，五个项目入口随后从侧面进入；不使用逐页窗口、Enter 提示或翻页栏。后续五个项目概览保持普通连续滚动，完整案例与 PDF 仍由访客点击查看。

封面保留真实作品截图卡片、文字互动、星空粒子及 MEIZE 轮廓字。数据分析概览以高对比度原生图表展示六个已保存的离线 AUC，柱长从 0 起算，并注明测试范围。图表结果与个人分工没有因视觉改版而变化。

新增星海场景 `assets/portal-ocean.webp` 由内置 image_gen 生成，用于叙事背景与案例页氛围，完整提示词与原图保存在本机开发资料中。短窗口与减少动态效果使用普通连续阅读；动效资源不可用时正文、筛选、案例与演示仍可使用。

## 项目与后续章节转场

五个项目概览及试验场、制作方式、AI 协作、联系章节均增加随滚动推进的转场：项目画面逐渐展开与回到原尺寸，文字分层进入，背景轻微视差，章节交界以星光细线衔接。动画在内容进入主要阅读区域前完成，并在阅读时保持稳定。没有新增停驻区、滚动锁定或 Enter 操作。

`flow.js` 独立于外部动画库运行，项目筛选、窗口调整与键盘聚焦会重新计算位置。减少动态效果时完整显示正文，不增加转场。
