# 个人网站 — 张美泽

深圳大学金融科技学院个人网站项目，使用规范化 AI 开发流程完成。

## 项目说明

这是一个静态个人网站，包含 Hero、About、Skills、Projects、Contact 五个基础区块，发布在 GitHub Pages 上。

## 模板来源

- 基础模板：本项目使用自建静态 HTML/CSS 模板，从零搭建
- 原仓库链接：https://github.com/rachelmeize-ui/rachelmeize-ui.github.io

## 主要修改内容

1. 根据个人背景（深大金融科技学院）定制全部文本内容
2. 设计深蓝 + 青色配色方案，符合金融科技方向
3. 实现响应式布局，适配桌面端和移动端
4. 添加五个基础区块：Hero、About、Skills、Projects、Contact
5. 编写 PRD、Design、Checklist 三份规格文档
6. 完成最终报告和验证截图

## GitHub Pages 链接

- 正式链接：https://rachelmeize-ui.github.io

## 本地预览

直接用浏览器打开 `index.html` 即可预览，或在项目根目录运行：

```bash
# 如果安装了 Python
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 目录结构

```
personal-website/
├─ index.html              # 网站页面
├─ assets/
│  ├─ style.css            # 样式文件
│  └─ images/              # 图片资源
├─ docs/
│  ├─ prd.md               # 产品需求文档
│  ├─ design.md            # 设计说明
│  └─ checklist.md         # 验收清单
├─ report/
│  └─ final-report.md      # 最终报告
├─ screenshots/            # 验证截图
└─ README.md               # 本文件
```

## 提交历史

> 本仓库为 git 仓库，提交记录可在 GitHub 远程仓库查看，也可见 `screenshots/git-log.png`。

| Hash | 日期 | 提交说明 |
|------|------|---------|
| d24e1e9 | 2026-07-24 16:50 | docs: 添加验收截图，更新 Checklist 与最终报告 |
| 436fabb | 2026-07-24 16:17 | feat: 添加 SEO meta 描述与 favicon 优化 |
| f8883bf | 2026-07-24 16:16 | docs: 更新 README 模板来源与线上链接 |
| da0879f | 2026-07-24 15:54 | docs: 完成个人网站 PRD 与设计说明 |
| 补交优化 | 2026-07-24 晚 | chore: 勾选 TA-Claw 提交项、完善报告与截图证据链 |

本地验证命令：

```bash
# 在项目根目录启动静态服务器
python -m http.server 8000
# 浏览器访问 http://localhost:8000 即可本地预览
```

## 隐私说明

本仓库不包含密码、API Key、Token、.env 文件或任何敏感个人信息。加分题 `openclaw-bonus` 的 `config.local.json`（含网关 token）被 `.gitignore` 排除，不会进入提交包。
