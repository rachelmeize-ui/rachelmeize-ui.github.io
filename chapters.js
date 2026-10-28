/* Scroll-scrubbed windows reveal the actual next section. No pager or scroll hijack. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const work = document.querySelector('#work > .shell');
  const intro = document.createElement('div');
  intro.className = 'work-intro-scene'; intro.id = 'work-intro';
  const heading = work.querySelector(':scope > .section-heading');
  const toolbar = work.querySelector(':scope > .work-toolbar');
  const guide = document.createElement('p'); guide.className = 'chapter-guide';
  guide.textContent = '向下滚动，继续探索。点击项目卡片或「查看完整案例」阅读具体过程。';
  intro.append(heading, guide, toolbar); work.prepend(intro);
  const projects = [...document.querySelectorAll('.project')];
  projects.forEach(project => project.classList.remove('reveal'));
  if (!window.gsap || !window.ScrollTrigger || reduce.matches) return;
  const {gsap, ScrollTrigger} = window;
  // Remove only the former entrance tween on project roots, so pins have clean geometry.
  projects.forEach(project => {
    gsap.getTweensOf(project).forEach(tween => {tween.scrollTrigger?.kill(); tween.kill();});
    gsap.set(project, {clearProps:'opacity,transform'});
  });
  const ids = ['home','coordinates','work-intro','project-evaluation','project-campus','project-finfair','project-skill','project-marketing','playground','about','method','contact'];
  let context;
  const syncWidth = () => {
    const w=document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scene-width',w+'px');
    document.documentElement.style.setProperty('--scene-half-width',(w/2)+'px');
  };
  addEventListener('resize',syncWidth,{passive:true});
  const build = () => {
    context?.revert();
    const scenes = ids.map(id=>document.getElementById(id)).filter(node=>node && !node.hidden && getComputedStyle(node).display !== 'none');
    document.documentElement.classList.add('scroll-cinema');
    document.getElementById('work').style.zIndex='3';
    syncWidth();
    scenes.forEach((scene,i)=>{scene.classList.add('cinema-scene');scene.style.zIndex=String(i+1);});
    context = gsap.context(() => {
      scenes.forEach((scene,index) => {
        const next = scenes[index+1];
        if (!next) return;
        // A tall chapter is pinned only after its lower edge has been read.
        ScrollTrigger.create({
          id:'cinema-hold-'+scene.id,trigger:scene,start:'bottom bottom',
          end:()=>'+='+Math.min(innerHeight*.9,next.offsetHeight*.85),
          pin:true,pinSpacing:false,anticipatePin:1,invalidateOnRefresh:true
        });
        gsap.fromTo(next,
          {clipPath:'inset(14% 18% 14% 18% round 75px)'},
          {clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',
            scrollTrigger:{id:'cinema-window-'+next.id,trigger:next,start:'top 98%',end:'top 10%',scrub:.55,invalidateOnRefresh:true}}
        );
        gsap.to(scene,{filter:'brightness(.74)',ease:'none',
          scrollTrigger:{trigger:next,start:'top 98%',end:'top 10%',scrub:.55,invalidateOnRefresh:true}});
        if (next.matches('.project')) {
          gsap.fromTo(next.querySelector('.project-visual'),{scale:.955},{scale:1,ease:'none',
            scrollTrigger:{trigger:next,start:'top 95%',end:'top 18%',scrub:.6}});
        }
      });
    });
    ScrollTrigger.refresh();
  };
  // The opening zoom must finish before any fixed scene is measured.
  if (document.body.classList.contains('motion-intro')) {
    const observer = new MutationObserver(()=>{
      if (!document.body.classList.contains('motion-intro')) {observer.disconnect();build();}
    }); observer.observe(document.body,{attributes:true,attributeFilter:['class']});
  } else build();
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    context?.revert(); context=null; requestAnimationFrame(build);
  },{capture:true}));
  const refreshDemo=()=>requestAnimationFrame(()=>ScrollTrigger.refresh());
  document.addEventListener('click',event=>{
    if(event.target.closest('#parse-button,[data-example],[data-mode],#confirm-demo')) refreshDemo();
  });
  document.getElementById('entry-input')?.addEventListener('keydown',event=>{if(event.key==='Enter') refreshDemo();});
  document.fonts?.ready.then(()=>ScrollTrigger.refresh());
  addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
})();
