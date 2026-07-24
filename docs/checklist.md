# 个人网站 Checklist（验收清单）

> 项目名称：张美泽个人网站
> 版本：v1.0
> 更新日期：2026-07-24
>
> 规则：只有拿到证据后才能把 [ ] 改成 [x]。不把"感觉不错""看起来高级"作为验收标准。

---

## 一、内容检查

- [ ] Hero 区块包含公开称呼、一句话定位、一个明确行动入口
- [ ] About 区块包含真实个人简介和专业方向，无模板作者信息
- [ ] Skills 区块内容具体，不堆砌空泛标签
- [ ] Projects 区块至少 1 个项目卡片，项目状态标注真实
- [ ] Contact 区块至少提供 GitHub 主页链接
- [ ] 全站无占位文字（如 "Lorem ipsum"、"Your Name" 等）

## 二、功能检查

- [ ] 导航栏链接可点击，能平滑滚动到对应区块
- [ ] 项目卡片中的链接可正常打开
- [ ] Contact 区块的 GitHub 链接有效
- [ ] 所有外部链接无死链（逐个点击验证）

## 三、桌面端显示

- [ ] 宽屏（1920px）下布局正常，无横向溢出
- [ ] 文字、图片、间距显示正常
- [ ] 导航栏滚动时保持可见
- [ ] 截图证据：`screenshots/homepage-desktop.png`

## 四、手机端显示

- [ ] 窄屏（375px）下布局正常，无横向溢出
- [ ] 文字最小 14px，可读
- [ ] 导航在移动端可用（汉堡菜单或简化导航）
- [ ] 项目卡片单列排列
- [ ] 截图证据：`screenshots/homepage-mobile.png`

## 五、工程检查

- [ ] README.md 存在且包含项目说明、模板来源、Pages 链接
- [ ] docs/prd.md 存在且非空，与最终网站一致
- [ ] docs/design.md 存在且非空，与最终网站一致
- [ ] docs/checklist.md 存在（本文件）
- [ ] report/final-report.md 存在且内容完整
- [ ] screenshots/ 至少有 4 张截图
- [ ] GitHub 仓库至少 3 次有意义的 Commit
- [ ] 仓库不包含 .env、密码、API Key、依赖目录

## 六、GitHub Pages 发布

- [ ] GitHub Pages 链接可在无痕窗口打开
- [ ] 线上内容与最新 Commit 一致
- [ ] Pages 正式链接已写入 README.md
- [ ] Pages 正式链接已写入 report/final-report.md
- [ ] 截图证据：`screenshots/github-pages.png`
- [ ] 截图证据：`screenshots/checklist.png`（本清单完成状态）

## 七、TA-Claw 提交

- [ ] 在正确项目文件夹中启动了 Claude Code
- [ ] TA-Claw 预览中检查了代码树、报告、截图、匹配会话
- [ ] 预览中未包含密码、API Key、.env 等敏感文件
- [ ] 完成二次确认
- [ ] 看到 "Submitted successfully" 成功回执
