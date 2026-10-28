(() => {
  'use strict';
  const section=document.getElementById('about'),video=document.getElementById('about-video');
  const dialog=document.getElementById('about-dialog'),open=document.getElementById('about-notes-open');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let onScreen=false;
  function sync(){
    const mobile=innerWidth<=760||!!document.querySelector('.narrative-static');
    const visible=mobile?onScreen:section.classList.contains('type-in-view');
    if(document.body.classList.contains('about-film-active')!==visible)document.body.classList.toggle('about-film-active',visible);
    const play=visible&&!document.querySelector('dialog[open]')&&!document.hidden&&!reduce.matches&&!document.body.classList.contains('sky-paused')&&!navigator.connection?.saveData;
    if(play){if(video.paused)video.play().catch(()=>{});}else video.pause();
  }
  new IntersectionObserver(([entry])=>{onScreen=entry.isIntersecting;sync();},{threshold:.1}).observe(section);
  document.addEventListener('portfolio:scene-change',sync);document.addEventListener('visibilitychange',sync);addEventListener('resize',sync,{passive:true});
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  open.addEventListener('click',()=>{dialog.showModal();document.body.classList.add('modal-open');document.getElementById('about-notes-close').focus({preventScroll:true});});
  document.getElementById('about-notes-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');open.focus({preventScroll:true});});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  sync();
})();
