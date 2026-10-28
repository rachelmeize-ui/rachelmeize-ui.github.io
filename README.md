# 张美泽 · 把好奇变成作品

[打开个人网站](https://rachelmeize-ui.github.io/) · [下载项目作品集](https://rachelmeize-ui.github.io/assets/meize-project-portfolio.pdf?v=20261028-universe-pdf) · [Gmail 联系](mailto:rachel.meize@gmail.com)

![蓝色星海风格的个人项目网站首页](assets/site-preview.webp)

## 精选项目

| 项目 | 可以展开的内容 |
| --- | --- |
| [AI 能力评测](https://rachelmeize-ui.github.io/#case-evaluation) | 回答记录、错误归因、歧义探针与评测范围 |
| [CampusBudget](https://rachelmeize-ui.github.io/#case-campus) | AI 辅助原型、保存前确认、日期误判修复与预设测试 |
| [FinFair](https://rachelmeize-ui.github.io/#case-finfair) | 金融信息对照、原文追溯与团队分工 |
| [金融项目汇报 Skill](https://rachelmeize-ui.github.io/#case-skill) | 事实分级、版本状态、V1/V2 与场景复测 |
| [银行客户营销响应预测](https://rachelmeize-ui.github.io/#case-marketing) | 离线模型评估、指标解释与客户触达建议 |

网站包含星海流星、开场缩放、滚动计数、横向项目轮播、案例档案、日期解析交互演示、PDF 下载与手机端导航。支持暂停星空动效、键盘切换与减少动态效果。每个案例均说明项目范围、个人或团队分工，以及当前验证情况。

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

封面、探索记录、Selected Work、作品、错误演示、作品背后的判断、AI 协作与结尾构成八个滚动场景。五个项目集中在作品场景内左右浏览，分类高亮和进度点跟随当前项目；可使用触屏滑动、触控板、箭头按钮或方向键。结尾联系卡片居中，页脚单独靠下排列。每段留有阅读距离，再以渐入区间依次退场、进入；背景连续缓慢放大、切换并配合轻微内容缩放。前三页保留数字随滚动增减、回看时退回 0、票券分层进入、Selected Work 卡片横向滑入、封面文字与星空互动。完整案例和 PDF 仍点击查看。

场景切换不添加 Enter 操作，也不劫持滚轮。手机端（宽度不超过 760px）、短窗口和减少动态效果使用普通连续阅读；手机端仍保留数字滚动、Selected Work 滑入和作品轻微缩放。窗口变化与字体加载后重新计算位置。大标题分别使用折叠渐入、描边填充、星海文字蒙版与指针压力反馈，正文仅做有限次渐入，暂停或减少动态效果时保持静态可读。

为避免闪动和重绘，取消全页开场缩放、封面重复背景、滚动时的大面积模糊和裁切，仅更新共享背景与可见场景的透明度及轻微变换。新打开或刷新网站从封面开始；站内导航仍可定位章节，案例档案直接链接继续有效。

星海场景 `assets/portal-ocean.webp` 由内置 image_gen 生成，完整提示词和原图保存在本机开发资料中。其他星海与项目视觉来自作者提供的材料。项目数据、验证范围和个人分工未因视觉改版而变化。

“我在意”章节使用女性学习者的 AI 概念场景，不代表候选人真实照片。静帧由内置 image_gen 生成，人物动作由 Hugging Face 上 `zerogpu-aoti/wan2-2-fp8da-aoti-faster` 的 Wan 2.2 公共演示、免费匿名额度生成；原始片段 3.56 秒、832×480，经正反循环处理为约 7 秒的网页视频，没有额外的整幅镜头晃动。流星为独立 CSS 轨迹。离开章节、打开弹窗、暂停动效、切到后台或开启减少动态效果时暂停视频，省流量模式使用静态封面。原图、动作提示词及原始片段保存在本机开发资料中。

作品集已同步为 10 页星海视觉，包含可选择文字、矢量图表、实际界面、目录跳转和联系信息。
