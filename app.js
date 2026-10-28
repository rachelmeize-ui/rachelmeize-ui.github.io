'use strict';

const REPO = 'https://github.com/rachelmeize-ui/CampusBudget';
const PDF = 'assets/meize-project-portfolio.pdf?v=20261028-universe-pdf';
const external = (label, url) => `<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;

const cases = {
  campus: {
    kicker: '02 / CAMPUSBUDGET / PERSONAL PROJECT',
    title: '把生活费，安排明白。',
    lead: '一个面向大学生的个人预算管理 Web 原型。从记录一笔消费，到理解消费结构，再到安排接下来的生活费。',
    role: '个人项目，使用 Trae 辅助完成初版。本轮提出优化目标，使用 Codex 协作改造界面、修复问题、整理测试与文档。',
    state: '可本地运行，代码已公开。运行时使用本地规则，尚未接入大模型或部署外网应用。',
    image: 'assets/campus-overview.png',
    alt: 'CampusBudget 月度总览真实界面，数据为模拟数据',
    caption: '实际运行界面，使用会话独立的模拟账本。',
    content: `
      <div class="case-grid"><section class="case-section"><h3>用户任务</h3><p>记账后仍有几个实际问题：这个月花了多少，哪些类别占比高，剩下的预算还能怎样安排。原型围绕这些问题组织总览、记账、消费分析、预算与账本管理五个页面。</p></section><section class="case-section"><h3>功能取舍</h3><p>默认提供独立演示账本，减少首次体验前的数据准备。将解析结果转为可修改表单，用户核对金额、日期和分类后，再确认保存。</p></section></div>
      <section class="case-section"><h3>一次具体的修复</h3><p>输入“2026-05-10 奶茶 15”时，初版直接提取第一个数字，将金额识别为 2026 元。本轮先分离日期，再提取唯一金额，增加了多金额、无效日期和异常金额的修改提示。</p></section>
      <div class="case-callout"><strong>2026 元 → 15 元</strong><p>问题修复与确认交互一起推进。正确的解析结果仍然要交给用户核对。</p></div>
      <img class="case-image" loading="lazy" src="assets/campus-entry.png" alt="CampusBudget 的一句话记账与确认表单"><p class="case-caption">解析结果需要确认后保存，画面为实际界面与模拟数据。</p>
      <section class="case-section"><h3>为什么预算与提醒需要解释</h3><p>每日可用金额会先保留预留金和尚未发生的固定支出预算。异常提醒按同类支出的中位数和 MAD 比较，展示样本数与阈值，同类样本不足 5 笔时暂不提示。</p><p>历史月份显示“已结算”，当前月份按包含今天的剩余天数计算，未来月份使用完整月天数，修复原来始终按当月计算的问题。</p></section>
      <div class="case-callout"><strong>24 项预设测试通过</strong><p>覆盖日期与金额解析、金额精度、月份边界、预算约束、异常提醒、存储与页面。另有桌面和手机浏览器检查。测试结果对应有限预设场景。</p></div>
      <section class="case-section"><h3>下一步验证计划</h3><p>观察试用者完成记一笔、改分类、设预算的过程，记录任务完成、误操作和纠正情况。该用户验证尚未执行。</p></section>
      <div class="case-actions">${external('代码与运行说明', REPO)}${external('对应版本的自动检查', REPO + '/actions/runs/40483297695')}<a class="text-link" href="#playground" data-close-to="playground">试试日期解析演示 ↘</a></div>`
  },
  finfair: {
    kicker: '03 / FINFAIR / TEAM PROTOTYPE',
    title: '金融信息，回到原文核对。',
    lead: '将金融产品说明书与宣传文案放在同一个阅读路径里，提示信息差异，并给出原文证据与页码。',
    role: '参与功能与流程讨论，承担商业计划书、产品演示与最终汇报交付。团队核心代码由另一位成员完成。',
    state: '团队既有原型。以下使用项目内置模拟说明书与宣传材料，当前未验证真实用户购买效果。',
    image: 'assets/finfair.png',
    alt: 'FinFair 团队原型的规则模式分析结果历史截图',
    caption: '团队原型历史真实截图，当前画面为规则模式，未启用大模型 Agent。',
    content: `
      <section class="case-section"><h3>需要解决的问题</h3><p>宣传中的收益数字、说明书里的定义，以及分散的费用和退出条件，可能形成理解差异。产品围绕“说明书上传、宣传对照、差异提示、证据追溯、报告导出”组织核对流程。</p></section>
      <section class="case-section"><h3>用一个模拟案例说明</h3><div class="case-table-wrap"><table class="case-table"><thead><tr><th>宣传表述</th><th>原文证据</th><th>需要澄清的信息</th></tr></thead><tbody><tr><td>“年化 3.20%”</td><td>P.1：业绩比较基准 3.20%，说明“不是预期收益率”。</td><td>收益性质需要澄清，避免直接理解为确定收益。</td></tr><tr><td>“到期稳稳拿”</td><td>P.1：非保本浮动收益型，不保证本金和收益。</td><td>提示本金及收益的不确定性，保留核对入口。</td></tr><tr><td>未说明提前退出条件</td><td>P.2：存续期内原则上不开放投资者主动申购或赎回。</td><td>帮助用户理解 180 天期限内的流动性限制。</td></tr></tbody></table></div><p>表格依据模拟材料整理，展示产品的对照结构，不对应真实金融产品。</p></section>
      <div class="case-grid"><section class="case-section"><h3>证据紧邻结论</h3><p>用户看到风险提示时，应能顺着页码和引文回到原文，理解判断依据。原文入口是核对动作的一部分。</p></section><section class="case-section"><h3>让不确定性可见</h3><p>遇到字段缺失、引用失败或复杂条款时，提示继续核对。用户需要理解产品能够支持的判断范围。</p></section></div>
      <section class="case-section"><h3>理解团队实现的能力与边界</h3><p>团队结合规则提取、同一模型配置下的两阶段语义处理与程序引文检查。逐字引文需要存在于指定页，失败时进行拦截或降级。引用存在，仍需要检查解释是否成立。</p></section>
      <section class="case-section"><h3>下一步验证计划</h3><p>让试用者回到原文解释收益、费用和退出条件，观察证据入口是否被使用，记录理解偏差与任务完成情况。该计划尚未执行。</p></section>
      <div class="case-actions"><a class="text-link" href="${PDF}" download="张美泽_项目作品集_星海新版.pdf">下载完整作品集 ↓</a></div>`
  },
  marketing: {
    kicker: '05 / BANK MARKETING / DATA & DECISION',
    title: '先找到，更值得联系的人。',
    lead: '用银行客户的产品使用与交易行为构建特征，比较分类模型，讨论客户分层与触达优先级。',
    role: '本人负责数据处理、建模对比与图表，借助 Claude Code 辅助实现；组员负责 PPT 整合。',
    state: '基于实践数据完成离线分析。未进行真实营销投放，也未验证留存、付费或实际增收。',
    image: 'assets/marketing-story.webp',
    alt: '原项目 PPT 中关于产品使用、交易行为、账户余额和 RFM 的特征工程页面',
    caption: '原汇报中的特征工程页面。PPT 由组员整合，数据与图表工作由本人完成。',
    content: `
      <div class="case-callout"><strong>4,050 名客户 · 18 项特征 · 6 种模型</strong><p>基于四张数据表完成客户信息与交易记录处理，整理 RFM、产品使用和余额变化等特征。</p></div>
      <section class="case-section"><h3>先比较，再解释</h3><p>保存的结果采用 70% / 30% 随机训练与测试划分，random_state 为 42。六种分类模型的 AUC 如下，横轴范围为 0 到 1。</p><div class="case-chart" role="img" aria-label="六种模型的离线 AUC：AdaBoost 0.7271，随机森林 0.7240，逻辑回归 0.7133，XGBoost 0.7078，决策树 0.7029，SVM 0.6532">${[['AdaBoost',.7271],['随机森林',.7240],['逻辑回归',.7133],['XGBoost',.7078],['决策树',.7029],['SVM',.6532]].map(([name, score]) => `<div class="chart-row"><span>${name}</span><span class="chart-track"><span style="width:${score*100}%"></span></span><span>${score.toFixed(4)}</span></div>`).join('')}<div class="chart-axis"><span>0</span><span>0.25</span><span>0.50</span><span>0.75</span><span>1.00</span></div></div></section>
      <section class="case-section"><h3>业务指标应该怎样理解</h3><p>AdaBoost 的 Top 20% 客户 Lift 为 1.906，四舍五入为 1.91。它表示按模型得分筛选的前 20% 客户，在测试集中的平均响应率约为总体的 1.91 倍。</p><p>这一结果可以支持优先触达和分层验证的建议，但不能直接当作真实投放带来的转化增长。</p></section>
      <section class="case-section"><h3>“最优”模型仍需要讨论</h3><p>AdaBoost 的 AUC 为 0.7271，随机森林为 0.7240，差距较小，尚未验证统计显著性。Top 20% Lift 上，AdaBoost 与逻辑回归相同。因此，模型选择还应结合解释性、执行成本和稳定性。</p></section>
      <section class="case-section"><h3>下一步验证计划</h3><p>补充时间切分与稳定性检查，进一步评估历史划分是否反映未来客户表现。再讨论小范围分层触达实验、执行成本和实际业务收益。该业务验证尚未执行。</p></section>
      <div class="case-actions"><a class="text-link" href="${PDF}" download="张美泽_项目作品集_星海新版.pdf">下载完整作品集 ↓</a></div>`
  }
};

cases.evaluation = {
  kicker:'01 / AI EVALUATION / ERROR ANALYSIS',
  title:'回答正确之外，还看什么？',
  lead:'围绕信息不足、错误前提与多重约束设计挑战，再用补充探针观察歧义识别。关注答案怎么错，也检查题目是否真的有区分度。',
  roleLabel:'项目方式',
  role:'小组共同完成。保留正式题面、模型回答、人工判定与对照分析，使用 AI 辅助整理报告。',
  state:'小样本探索。14 份模型或模式回答记录，另有 3 道歧义探针与 7 组模式对照；不能外推为模型综合排名。',
  image:'assets/ai-evaluation.svg',
  alt:'原项目报告中按强行作答、前后矛盾、计算错误、单位放大等类别整理的错误指纹矩阵',
  caption:'原报告中的错误类型矩阵。它反映本次留存样本，未覆盖所有模型能力与使用场景。',
  content:`<section class="case-section"><h3>从“谁分高”到“错在哪里”</h3><p>正式三题分别检查信息不足识别、错误前提纠正和多重约束计算。扩展记录用于观察语言歧义、字符统计等任务。模型或模式名称按当时记录保留，14 份回答不等于 14 个独立模型。</p></section><div class="case-table-wrap"><table class="case-table"><thead><tr><th>原记录中的问题摘要</th><th>错误发生的位置</th><th>为什么值得追问</th></tr></thead><tbody><tr><td>判断“不能确定”，随后仍给出确定收益数值</td><td>信息不足与前后矛盾</td><td>先识别不确定性，还需要检查后续结论是否守住边界。</td></tr><tr><td>800 + 1,200 + 2,400 写成“4.40 万元”</td><td>单位放大</td><td>算式看似正常，金额单位仍需要单独核对。</td></tr><tr><td>配置方案正确，代入金额后收益算成 5,200 元</td><td>计算与方案不一致</td><td>最终方案、中间代入与输出数值应保持一致。</td></tr></tbody></table></div><section class="case-section"><h3>探针题也需要被检查</h3><p>补充测试保留了时间歧义、金融范围歧义和指代歧义三道探针。按原记录的判定口径，时间探针在 7 组配置中有 3 组识别歧义，其余两题均为 7/7。这提示我们继续检查题目难度和区分度。</p></section><section class="case-section"><h3>清理被提示污染的样本</h3><p>一部分初次粘贴记录属于“审阅已有双解分析”，与干净首答不在同一条件下。补充记录明确区分并重新测试，避免把答案已经出现在上下文中的情况当成独立识别。</p></section><div class="case-callout"><strong>一种结果，需要连同条件一起阅读。</strong><p>不同模式可能同时改变模型版本、路由、联网和推理设置，因此这里只做对照观察。样本量、单轮回答和人工判定均限制了结论的适用范围。</p></div><section class="case-section"><h3>后续可改进的评测设计</h3><p>固定提示与上下文，增加重复测试和未见变体。将评分口径先写清，再比较任务完成率、错误类型与澄清行为。该扩展方案尚未执行。</p></section><div class="case-actions"><a class="text-link" href="${PDF}" download="张美泽_项目作品集_星海新版.pdf">下载项目作品集 ↓</a></div>`
};
cases.skill = {
  kicker:'04 / FINTECH PROJECT BRIEFING / SKILL & VERIFICATION',
  title:'让规则，经得起同一场景的复测。',
  lead:'把事实分级、缺失信息处理和版本变更写进可复用的金融项目汇报工作流，再用情景任务检查规则是否成立。',
  roleLabel:'项目方式',
  role:'小组共同完成，使用 AI 辅助形成工作流、Word/PPT 交付材料和测试记录。展示内容依据组内留存的版本与复测证据整理。',
  state:'模拟金融情景下的 Skill 实践。保留 V1/V2 与 7 类场景测试记录，未接入真实机构业务或实际授信决策。',
  image:null,
  content:`<section class="case-section"><h3>一个真实暴露的规则缺口</h3><p>模拟信贷材料同时包含当前 420 万元预算与未来条件性 380 万元安排。V1 将尚未生效的 380 万元当作当前预算，暴露了“数字确实存在于材料里，使用状态却判断错了”的问题。</p></section><div class="skill-case-comparison"><div><span>V1 / 原场景失败</span><strong>380 万元</strong><p>误用未生效的后续安排。</p></div><div><span>V2 / 同场景复测</span><strong>420 万元</strong><p>保留当前预算，380 万登记为未生效变更。</p></div></div><section class="case-section"><h3>V2 增加了什么</h3><p>在应用变更前，先检查批准状态、触发条件、生效时间和适用版本。仅在生效条件明确满足后，变更才能覆盖当前基线，同时记录原值、新值和受影响文件。</p><p>版本对照中，该规则同步进入来源判断、变更流程与最终一致性检查。它是规则原则的补充，而不是把某个案例的 420 或 380 万写死在 Skill 内。</p></section><section class="case-section"><h3>7 类情景，而非一个通过率</h3><div class="case-table-wrap"><table class="case-table"><thead><tr><th>任务</th><th>希望检查的行为</th></tr></thead><tbody><tr><td>T1 正常案例</td><td>区分当前基线与未生效变更，保留失败与复测。</td></tr><tr><td>T2 缺失信息</td><td>将缺少的预算列为待确认，不自动补造。</td></tr><tr><td>T3 不适用任务</td><td>普通写诗请求不进入项目汇报工作流。</td></tr><tr><td>T4 正式变更</td><td>先形成影响清单，再同步修改 Word 与 PPT。</td></tr><tr><td>T5 场景迁移</td><td>从反欺诈切换到信贷时重新识别风险。</td></tr><tr><td>T6 越界请求</td><td>不把要求保证改善的说法写成已验证结果。</td></tr><tr><td>T7 自定义检查</td><td>将未经验证的供应商主张与项目事实区分。</td></tr></tbody></table></div></section><section class="case-section"><h3>检查 AI 诊断本身</h3><p>同组材料纠错实践还保留了问题台账：初版诊断中存在描述不准和遗漏，后续逐条核对来源后修正。AI 的检查结果本身也需要核验，特别是跨文件口径与虚构证据。</p></section><section class="case-section"><h3>当前范围</h3><p>测试记录包含失败、操作问题与复测，不将有限情景直接当作通用可靠率。真实业务还需要更独立的测试集与人工审核机制。</p></section><div class="case-actions"><a class="text-link" href="${PDF}" download="张美泽_项目作品集_星海新版.pdf">下载项目作品集 ↓</a></div>`
};

const dialog = document.getElementById('case-dialog');
const caseContent = document.getElementById('case-content');
let previousFocus;
let previousHash = '#work';
let activeCase;

function openCase(id, updateHash = true) {
  const item = cases[id];
  if (!item) return;
  previousFocus = document.activeElement;
  if (!dialog.open) previousHash = location.hash.startsWith('#case-') ? '#work' : (location.hash || '#work');
  activeCase = id;
  caseContent.innerHTML = `<article class="case-inner"><header class="case-hero"><p class="case-kicker">${item.kicker}</p><h2 id="case-title">${item.title}</h2><p class="case-lead">${item.lead}</p></header><div class="case-meta"><div><strong>${item.roleLabel || "我的参与"}</strong>${item.role}</div><div><strong>当前状态</strong>${item.state}</div></div>${item.image ? `<img class="case-image ${id==='marketing'||id==='evaluation'?'full':''}" src="${item.image}" alt="${item.alt}"><p class="case-caption">${item.caption}</p>` : ""}${item.content}</article>`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
  document.getElementById('dialog-close').focus({preventScroll:true});
  if (updateHash) history.replaceState(null, '', '#case-' + id);
}

dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (location.hash === '#case-' + activeCase) history.replaceState(null, '', previousHash);
  previousFocus?.focus({preventScroll:true});
});
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});

const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '展开导航');
}
menuToggle.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? '关闭导航' : '展开导航');
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const header = document.getElementById('header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 70);
window.addEventListener('scroll', updateHeader, {passive:true});
updateHeader();

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => {
      const selected = other === button;
      other.classList.toggle('active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    document.querySelectorAll('.project').forEach(project => {
      const show = category === 'all' || project.dataset.category === category;
      project.hidden = !show;
      if (show) { count++; project.classList.add('in-view'); }
    });
    document.getElementById('filter-note').textContent = category === 'all' ? '5 个项目，逐项展开' : `当前展示 ${count} 个相关项目`;
  });
});

let mode = 'fixed';
let hasParsed = false;
const input = document.getElementById('entry-input');
const result = document.getElementById('demo-result');
const isoDate = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
function validISO(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const parsed = new Date(Date.UTC(year, month-1, day));
  return parsed.getUTCFullYear()===year && parsed.getUTCMonth()===month-1 && parsed.getUTCDate()===day;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function parseDemo() {
  const raw = input.value.trim();
  hasParsed = true;
  result.className = 'demo-result' + (mode==='old' ? ' is-old' : '');
  let remaining = raw;
  const today = new Date();
  let date = isoDate(today);
  if (mode === 'old') {
    const number = raw.match(/\d+(?:\.\d+)?/);
    if (!number) { result.innerHTML = '<p class="demo-error">没有找到金额。试试“2026-05-10 奶茶 15”。</p>'; return; }
    const amount = Number(number[0]);
    result.innerHTML = `<div class="result-heading"><span>初版：取第一个数字</span><strong>¥ ${amount.toLocaleString('zh-CN')}</strong></div><p class="demo-warning">日期在金额前面时，年份可能被误读成金额。切换“修正后逻辑”，看看这个问题如何被处理。</p>`;
    return;
  }
  const dates = [...raw.matchAll(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/g)];
  if (dates.length > 1) { result.innerHTML='<p class="demo-error">找到多个日期，请一次只记录一笔。</p>'; return; }
  if (dates.length) {
    const match = dates[0];
    date = `${match[1]}-${match[2].padStart(2,'0')}-${match[3].padStart(2,'0')}`;
    if (!validISO(date)) { result.innerHTML='<p class="demo-error">日期不存在，请检查年月日后再试。</p>'; return; }
    remaining = remaining.replace(match[0], ' ');
  } else if (raw.includes('昨天')) {
    today.setDate(today.getDate()-1);
    date = isoDate(today);
  }
  if (/-\s*(?:\d|\.\d)/.test(remaining)) { result.innerHTML='<p class="demo-error">金额需要大于 0，收入与支出通过类型区分。</p>'; return; }
  const amounts = remaining.match(/(?:\d+(?:\.\d+)?|\.\d+)/g) || [];
  if (amounts.length !== 1) { result.innerHTML=`<p class="demo-error">${amounts.length ? '找到多个数字，无法确定这一笔的金额。请拆成单笔记录。' : '没有找到金额。试试“今天午饭 18 元”。'}</p>`; return; }
  const amount = Number(amounts[0]);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) { result.innerHTML='<p class="demo-error">请输入大于 0、且不超过 1,000,000 元的单笔金额。</p>'; return; }
  const category = /收入|兼职|工资/.test(raw) ? '收入' : /奶茶|咖啡|饭|餐|午|晚|早餐/.test(raw) ? '餐饮' : /地铁|公交|交通|打车/.test(raw) ? '交通' : '其他';
  result.innerHTML = `<div class="result-heading"><span>日期已分离，请核对</span><strong>¥ ${amount.toFixed(2)}</strong></div><div class="result-fields"><div><label for="confirm-amount">金额 / 元</label><input id="confirm-amount" type="number" min="0.01" max="1000000" step="0.01" value="${amount.toFixed(2)}"></div><div><label for="confirm-date">日期</label><input id="confirm-date" type="date" value="${date}"></div><div><label for="confirm-category">分类</label><select id="confirm-category">${['餐饮','交通','其他','收入'].map(name=>`<option${name===category?' selected':''}>${name}</option>`).join('')}</select></div></div><button class="confirm-button" id="confirm-demo">核对并确认这笔演示</button>`;
}

document.querySelectorAll('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    mode = button.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach(other => {
      const selected = other === button;
      other.classList.toggle('active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    if (hasParsed) parseDemo();
  });
});
document.getElementById('parse-button').addEventListener('click', parseDemo);
input.addEventListener('keydown', event => { if (event.key === 'Enter') parseDemo(); });
document.addEventListener('click', event => {
  const caseButton = event.target.closest('[data-case]');
  if (caseButton) openCase(caseButton.dataset.case);
  const example = event.target.closest('[data-example]');
  if (example) { input.value = example.dataset.example; parseDemo(); }
  const closeTo = event.target.closest('[data-close-to]');
  if (closeTo) {
    event.preventDefault();
    dialog.close();
    location.hash = closeTo.dataset.closeTo;
    document.getElementById(closeTo.dataset.closeTo)?.scrollIntoView();
  }
  if (event.target.closest('#confirm-demo')) {
    const amount = Number(document.getElementById('confirm-amount').value);
    const date = document.getElementById('confirm-date').value;
    const category = document.getElementById('confirm-category').value;
    if (!Number.isFinite(amount) || amount<=0 || amount>1000000 || !validISO(date)) {
      showToast('请检查金额和日期，再确认这笔演示。'); return;
    }
    result.innerHTML = `<p class="confirmation">已核对：${escapeHTML(date)} · ${escapeHTML(category)} · ${amount.toFixed(2)} 元。<br>演示已完成，不写入真实账本。</p>`;
  }
});

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3600);
}
document.getElementById('copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('rachel.meize@gmail.com');
    showToast('邮箱已复制，期待与你交流。');
  } catch {
    showToast('暂时无法自动复制，可选中页面上的邮箱手动复制。');
  }
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, {threshold:.08, rootMargin:'0px 0px 35px 0px'});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

if (location.hash.startsWith('#case-')) openCase(location.hash.slice(6), false);
