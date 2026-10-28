/* One scroll-driven stage for the whole portfolio, with no wheel interception. */
(() => {
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const work=document.getElementById('work');
  const projects=[...work.querySelectorAll('.project')];
  const tails=[...document.querySelectorAll('#playground,#about,#method,#contact')];
  const root=document.querySelector('.prologue-scroll');
  if(!root){document.documentElement.classList.add('journey-mode','flow-mode');return;}
  const stage=root.querySelector('.prologue-stage'),world=stage.querySelector('.prologue-world');
  const hero=document.getElementById('home'),evidence=document.getElementById('coordinates'),guide=stage.querySelector('.prologue-guide');
  guide.id='selected-work';
  const images=['blue-universe.webp','portal-ocean.webp','luminous-shore.webp','night-tide.webp'];
  const layers=images.map(image=>{const node=document.createElement('div');node.className='universe-layer';node.style.backgroundImage=`url("assets/${image}")`;return node;});
  const shade=document.createElement('div');shade.className='universe-shade';
  const meteors=world.querySelector('.meteor-field');world.replaceChildren(...layers,shade);if(meteors)world.append(meteors);
  stage.append(work,...tails);
  const cue=stage.querySelector('.prologue-scroll-hint');
  const toolbar=work.querySelector('.work-toolbar');toolbar.classList.remove('reveal');
  const all=[hero,evidence,guide,work,...tails];
  all.forEach(scene=>{scene.classList.add('narrative-pane');scene.classList.remove('reveal');scene.querySelectorAll('.reveal').forEach(node=>node.classList.remove('reveal'));});
  projects.forEach(scene=>[...scene.querySelector('.project-copy').children].forEach((node,index)=>node.style.setProperty('--content-order',Math.min(index,5))));
  tails.forEach(scene=>scene.querySelectorAll('.section-heading,.play-grid,.about-grid,.method-heading,.method-track,.contact-content').forEach((node,index)=>{node.classList.add('narrative-layer');node.style.setProperty('--content-order',index);}));
  document.documentElement.classList.add('flow-mode','journey-mode','unified-mode');
  const TRANSITION=850;
  const clamp=value=>Math.min(1,Math.max(0,value));
  const smooth=value=>{const p=clamp(value);return p*p*(3-2*p);};
  const imageFor=new Map([[hero,0],[evidence,1],[guide,1],[work,1],[tails[0],3],[tails[1],0],[tails[2],1],[tails[3],2]]);
  let scenes=[],stops=[],holds=[],runway=0,frame=0,isStatic=false,lastScene='';
  function layout(){
    const editing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||'');
    if(!editing)isStatic=innerWidth<=760||innerHeight<700||reduce.matches;
    root.classList.toggle('narrative-static',isStatic);
    scenes=all;
    holds=scenes.map(scene=>scene===hero?600:scene===guide?650:scene===evidence?800:tails.includes(scene)?1000:900);
    stops=[0];for(let i=1;i<scenes.length;i++)stops.push(stops[i-1]+holds[i-1]+TRANSITION);
    runway=stops.at(-1)+750;
    root.style.setProperty('--narrative-runway',(isStatic?0:runway)+'px');
    scenes.forEach((scene,index)=>scene.dataset.narrativeStop=stops[index]);
    work.dataset.narrativeStop=stops[3];
    projects.forEach(project=>project.dataset.narrativeStop=stops[3]);
    all.forEach(scene=>{
      const overflows=!isStatic&&scene.scrollHeight>scene.clientHeight+12;
      scene.toggleAttribute('data-lenis-prevent',overflows);
      scene.classList.toggle('pane-overflows',overflows);
    });
    request();
  }
  function update(){
    frame=0;
    if(isStatic){
      all.forEach(scene=>{scene.style.opacity='1';scene.style.visibility='visible';scene.style.transform='none';scene.style.pointerEvents='';scene.inert=false;scene.classList.remove('type-in-view');scene.style.setProperty('--scene-presence','1');});
      toolbar.style.opacity='1';toolbar.style.pointerEvents='auto';toolbar.inert=false;
      const h=innerHeight,rect=evidence.getBoundingClientRect(),g=guide.getBoundingClientRect(),w=work.getBoundingClientRect();
      const count=reduce.matches?1:smooth((h*.88-rect.top)/(h*.62));
      evidence.querySelectorAll('.evidence-card').forEach((card,i)=>{const reveal=reduce.matches?1:smooth((count-i*.055)/.82);card.style.opacity=String(.35+reveal*.65);card.style.transform=`translate3d(0,${((1-reveal)*22).toFixed(2)}px,0)`;const node=card.querySelector('b[data-to]');node.textContent=(Number(node.dataset.to)*count).toFixed(Number(node.dataset.dec||0));});
      const slide=reduce.matches?1:smooth((h*.9-g.top)/(h*.68));guide.querySelector('.prologue-index').style.transform=`translate3d(${((1-slide)*35).toFixed(2)}vw,0,0)`;
      work.style.setProperty('--work-zoom',String(reduce.matches?1:.965+smooth((h-w.top)/(h*.75))*.035));
      layers.forEach((layer,i)=>{layer.style.opacity=i===0?'1':'0';layer.style.transform='none';});
      if(lastScene!=='native'){lastScene='native';document.dispatchEvent(new CustomEvent('portfolio:scene-change',{detail:{id:'native'}}));}return;
    }
    const box=root.getBoundingClientRect();
    const local=Math.max(0,-box.top);
    let index=stops.findIndex((stop,i)=>i===stops.length-1||local<stops[i+1]);if(index<0)index=stops.length-1;
    const next=Math.min(index+1,scenes.length-1);
    const phase=index===next?0:clamp((local-stops[index]-holds[index])/TRANSITION);
    const blend=smooth(phase);
    const outgoing=index===next?1:1-smooth(phase/.52),incoming=smooth((phase-.48)/.52);
    let projectAlpha=0;
    all.forEach(scene=>{
      const alpha=scene===scenes[index]?outgoing:scene===scenes[next]?incoming:0;
      const value=alpha.toFixed(4);if(scene.style.opacity!==value)scene.style.opacity=value;
      scene.style.setProperty('--scene-presence',value);
      scene.style.visibility='visible';scene.inert=alpha<.5;scene.style.pointerEvents=alpha>.5?'auto':'none';
      const transform=`translate3d(0,${((1-alpha)*26).toFixed(2)}px,0) scale(${(.958+alpha*.042).toFixed(4)})`;
      if(scene.style.transform!==transform)scene.style.transform=transform;
      if(scene===work)projectAlpha=alpha;
      scene.classList.toggle('type-in-view',alpha>.14);
    });
    toolbar.style.opacity=String(projectAlpha);toolbar.style.pointerEvents=projectAlpha>.5?'auto':'none';toolbar.inert=projectAlpha<.5;
    const imageIndex=scene=>scene===work?Number(work.dataset.sceneImage||1):imageFor.get(scene);
    const a=imageIndex(scenes[index]),b=imageIndex(scenes[next]);
    world.classList.toggle('carousel-atmosphere',scenes[index]===work&&phase===0);
    const progress=clamp(local/runway);
    // Put the incoming image above the opaque outgoing one, avoiding a dark flash.
    layers.forEach((layer,i)=>{
      const isA=i===a,isB=i===b;
      layer.style.opacity=isA?'1':isB?String(blend):'0';
      layer.style.zIndex=isB&&!isA?'1':'0';
      if(isA||isB)layer.style.transform=`translate3d(0,${(-progress*32).toFixed(2)}px,0) scale(${(1.035+progress*.24).toFixed(4)})`;
    });
    shade.style.zIndex='2';if(meteors)meteors.style.zIndex='3';
    const display=blend>.5?next:index;
    const shown=scenes[display];
    const activeId=shown.classList.contains('type-in-view')?shown.id:'';
    if(lastScene!==activeId){lastScene=activeId;document.dispatchEvent(new CustomEvent('portfolio:scene-change',{detail:{id:activeId}}));}
    cue.textContent=shown===work?'左右探索作品 · 向下继续阅读 ↓':scenes[display].classList.contains('pane-overflows')?'本页可上下阅读，读完继续下滑 ↓':display===scenes.length-1?'回到顶部可再次探索 ↑':'向下滚动，继续探索 ↓';cue.style.opacity=display===0?'0':'1';
    // Preserve the original opening choreography inside the shared timeline.
    const countProgress=smooth((local-(stops[scenes.indexOf(evidence)]-500))/500);
    evidence.querySelectorAll('.evidence-card').forEach((card,i)=>{
      const reveal=smooth((countProgress-i*.055)/.82);
      card.style.transform=`translate3d(0,${((1-reveal)*28).toFixed(2)}px,0)`;
      card.style.opacity=String(.3+reveal*.7);
      const node=card.querySelector('b[data-to]');
      const value=(Number(node.dataset.to)*countProgress).toFixed(Number(node.dataset.dec||0));
      if(node.textContent!==value)node.textContent=value;
    });
    const guideProgress=smooth((local-(stops[scenes.indexOf(guide)]-500))/500);
    const rail=guide.querySelector('.prologue-index');
    rail.style.transform=`translate3d(${((1-guideProgress)*65).toFixed(2)}vw,0,0)`;

  }
  function request(){if(!frame)frame=requestAnimationFrame(update);}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',layout,{passive:true});
  document.addEventListener('portfolio:project-change',request);
  document.addEventListener('portfolio:type-layout',layout);
  const contentObserver=new ResizeObserver(layout);
  document.querySelectorAll('.play-grid,.about-grid,.contact-content').forEach(node=>contentObserver.observe(node));
  document.addEventListener('click',event=>{
    if(window.Lenis&&window.gsap&&window.ScrollTrigger||isStatic||event.defaultPrevented||event.ctrlKey||event.metaKey)return;
    const link=event.target.closest('a[href^="#"]');if(!link||link.closest('dialog'))return;
    const id=link.getAttribute('href'),target=document.getElementById(id.slice(1));if(!target||target.dataset.narrativeStop===undefined)return;
    event.preventDefault();if(target.matches('.project'))document.dispatchEvent(new CustomEvent('portfolio:project-select',{detail:{id:target.id}}));
    window.scrollTo({top:root.getBoundingClientRect().top+scrollY+Number(target.dataset.narrativeStop),behavior:'smooth'});history.replaceState(null,'',id);
  });
  document.fonts?.ready.then(layout);addEventListener('load',layout,{once:true});
  layout();
})();
