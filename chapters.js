/* One continuous sticky world, inspired by the supplied Mostar scroll story.
 * Project overviews below remain in ordinary document flow.
 */
(() => {
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches)return;
  const hero=document.getElementById('home');
  const evidence=document.getElementById('coordinates');
  const work=document.getElementById('work');
  const heading=work.querySelector('.section-heading');
  const shell=document.createElement('section');shell.className='prologue-scroll';shell.setAttribute('aria-label','星海作品序章');
  const stage=document.createElement('div');stage.className='prologue-stage';
  const world=document.createElement('div');world.className='prologue-world';world.setAttribute('aria-hidden','true');
  world.innerHTML='<div class="world-sky"></div><div class="world-planet"></div><div class="world-tide"></div><div class="world-shade"></div>';
  const meteors=hero.querySelector('.meteor-field').cloneNode(true);meteors.classList.add('world-meteors');world.append(meteors);
  const guide=document.createElement('section');guide.className='prologue-guide';guide.setAttribute('aria-label','精选作品引导');
  guide.append(heading);
  const rail=document.createElement('div');rail.className='prologue-index';rail.setAttribute('aria-label','快速定位项目');rail.setAttribute('data-lenis-prevent','');
  const data=[['evaluation','AI 能力评测','错误归因 / 歧义探针'],['campus','CampusBudget','个人原型 / 迭代验证'],['finfair','FinFair','金融信息 / 原文核对'],['skill','金融汇报 Skill','版本规则 / 场景复测'],['marketing','营销响应预测','模型对比 / 业务判断'],['geo','GEO 内容运营','选题策划 / 发布规划']];
  data.forEach(([key,title,note],i)=>{
    const link=document.createElement('a');link.className='prologue-index-card';link.href='#project-'+key;link.setAttribute('aria-label','定位到'+title+'项目概览');
    const number=document.createElement('span');number.className='index-number';number.textContent=String(i+1).padStart(2,'0');number.setAttribute('aria-hidden','true');
    const tag=document.createElement('small');tag.textContent=note;
    const name=document.createElement('strong');name.textContent=title;
    const arrow=document.createElement('span');arrow.className='index-arrow';arrow.textContent='↘';arrow.setAttribute('aria-hidden','true');
    link.append(number,tag,name,arrow);rail.append(link);
  });
  const help=document.createElement('p');help.className='prologue-help';help.textContent='可左右滑动选择项目，也可继续向下浏览；完整案例在项目页点开。';
  guide.append(rail,help);
  const hint=document.createElement('span');hint.className='prologue-scroll-hint';hint.textContent='SCROLL TO EXPLORE ↓';hint.setAttribute('aria-hidden','true');
  hero.before(shell);stage.append(world,hero,evidence,guide,hint);shell.append(stage);
  document.documentElement.classList.add('prologue-mode');
})();
