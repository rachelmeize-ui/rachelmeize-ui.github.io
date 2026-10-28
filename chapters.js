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
  const data=[['evaluation','AI 能力评测','错误归因 / 歧义探针'],['campus','CampusBudget','个人原型 / 迭代验证'],['finfair','FinFair','金融信息 / 原文核对'],['skill','金融汇报 Skill','版本规则 / 场景复测'],['marketing','营销响应预测','模型对比 / 业务判断']];
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
  const sky=world.querySelector('.world-sky'),planet=world.querySelector('.world-planet'),tide=world.querySelector('.world-tide'),shade=world.querySelector('.world-shade');
  let frame=0,mouseX=0,mouseY=0,aimX=0,aimY=0;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const smooth=(a,b,v)=>{const p=clamp((v-a)/(b-a));return p*p*(3-2*p);};
  const active=(node,opacity)=>{node.style.opacity=opacity;node.style.visibility=opacity>.005?'visible':'hidden';node.inert=opacity<.08;};
  const counters=[...evidence.querySelectorAll('b[data-to]')];
  const update=()=>{
    frame=0;
    const simple=innerHeight<680;
    shell.classList.toggle('prologue-static',simple);
    if(simple){[hero,evidence,guide].forEach(node=>{node.style.opacity='1';node.style.visibility='visible';node.style.transform='none';node.inert=false;});counters.forEach(node=>node.textContent=Number(node.dataset.to).toFixed(Number(node.dataset.dec||0)));return;}
    const distance=Math.max(1,shell.offsetHeight-stage.offsetHeight);
    const p=clamp(-shell.getBoundingClientRect().top/distance);
    const heroOut=smooth(.08,.22,p);
    const evidenceIn=smooth(.24,.32,p),evidenceOut=smooth(.56,.64,p);
    const guideIn=smooth(.66,.75,p);
    const evidenceAlpha=evidenceIn*(1-evidenceOut);
    counters.forEach(node=>{const value=(Number(node.dataset.to)*evidenceIn).toFixed(Number(node.dataset.dec||0));if(node.textContent!==value)node.textContent=value;});
    const stopped=document.body.classList.contains('sky-paused');
    mouseX+=(aimX-mouseX)*.12;mouseY+=(aimY-mouseY)*.12;
    const mx=stopped?0:mouseX,my=stopped?0:mouseY;
    active(hero,1-heroOut);hero.style.transform=`translate3d(0,${-heroOut*70}px,0)`;
    active(evidence,evidenceAlpha);evidence.style.transform=`translate3d(0,${(1-evidenceIn)*45-evidenceOut*45}px,0)`;
    active(guide,guideIn);guide.style.transform=`translate3d(0,${(1-guideIn)*45}px,0)`;
    const worldEnter=smooth(.12,.4,p);
    sky.style.opacity=1-worldEnter;
    sky.style.transform=`translate3d(${mx*-8}px,${my*-4-p*22}px,0) scale(${1+p*.12})`;
    planet.style.opacity=worldEnter;
    planet.style.transform=`translate3d(${mx*-12}px,${my*-6-p*30}px,0) scale(${1.04+p*.12})`;
    planet.style.filter=`blur(${evidenceAlpha*3}px)`;
    tide.style.opacity=.2+worldEnter*.25;
    tide.style.transform=`translate3d(${mx*10}px,${40-p*55+my*4}px,0) scale(${1.08+p*.08})`;
    shade.style.opacity=.25+evidenceAlpha*.24+guideIn*.12;
    rail.style.transform=`translate3d(${(1-smooth(.69,.83,p))*65}vw,0,0)`;
    hint.style.opacity=p>.93||p<.1?0:1;
    if(!stopped&&(Math.abs(aimX-mouseX)>.001||Math.abs(aimY-mouseY)>.001))request();
  };
  function request(){if(!frame)frame=requestAnimationFrame(update);}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request,{passive:true});
  addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;aimX=event.clientX/innerWidth-.5;aimY=event.clientY/innerHeight-.5;request();},{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{aimX=0;aimY=0;request();});
  new MutationObserver(request).observe(document.body,{attributes:true,attributeFilter:['class']});
  document.fonts?.ready.then(()=>{request();window.ScrollTrigger?.refresh();});
  addEventListener('load',()=>{request();window.ScrollTrigger?.refresh();},{once:true});
  // Native anchors still work when the optional animation libraries are unavailable.
  document.addEventListener('click',event=>{
    if(window.gsap&&window.ScrollTrigger&&window.Lenis)return;
    const link=event.target.closest('a[href="#home"],a[href="#coordinates"]');
    if(!link||event.defaultPrevented||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(shell.classList.contains('prologue-static'))return;
    event.preventDefault();
    const id=link.getAttribute('href');
    const top=id==='#home'?0:shell.getBoundingClientRect().top+scrollY+(shell.offsetHeight-innerHeight)*.43;
    window.scrollTo({top,behavior:'smooth'});history.replaceState(null,'',id);
  });
  request();
})();
