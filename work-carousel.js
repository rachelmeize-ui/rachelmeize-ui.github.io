/* Native horizontal project browsing; categories follow the visible project. */
(() => {
  'use strict';
  const work=document.getElementById('work'),shell=work.querySelector(':scope>.shell');
  const projects=[...work.querySelectorAll('.project')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches){projects.forEach(project=>{project.hidden=false;project.classList.add('is-project-active');});document.addEventListener('portfolio:category',event=>{const target=event.detail.category==='all'?projects[0]:projects.find(project=>project.dataset.category===event.detail.category);target?.scrollIntoView({behavior:'instant',block:'start'});});return;}
  const track=document.createElement('div');track.className='work-track';track.tabIndex=0;
  track.setAttribute('role','region');track.setAttribute('aria-label','左右浏览五个项目');track.setAttribute('aria-roledescription','作品轮播');
  track.setAttribute('data-lenis-prevent','');
  const frames=projects.map((project,index)=>{
    project.hidden=false;project.classList.remove('narrative-pane');
    const frame=document.createElement('div');frame.className='project-frame';
    frame.setAttribute('role','group');frame.setAttribute('aria-label',`${index+1} / ${projects.length}`);
    frame.append(project);track.append(frame);return frame;
  });
  shell.append(track);
  const gesture=document.createElement('p');gesture.className='work-gesture';gesture.textContent='左右滑动，浏览 5 个项目 →';work.querySelector('.work-toolbar').append(gesture);
  const controls=document.createElement('div');controls.className='work-carousel-controls';
  const prev=document.createElement('button');prev.className='work-arrow';prev.textContent='←';prev.setAttribute('aria-label','上一个项目');
  const next=document.createElement('button');next.className='work-arrow';next.textContent='→';next.setAttribute('aria-label','下一个项目');
  const dots=document.createElement('div');dots.className='work-dots';dots.setAttribute('role','group');dots.setAttribute('aria-label','选择项目');
  const dotButtons=projects.map((project,index)=>{const button=document.createElement('button');button.className='work-dot';button.setAttribute('aria-label','查看'+project.querySelector('h3').childNodes[0].textContent.trim());button.addEventListener('click',()=>go(index));dots.append(button);return button;});
  const position=document.createElement('span');position.className='work-position';position.setAttribute('aria-live','polite');
  controls.append(prev,dots,next,position);shell.append(controls);
  let selected=-1,frame=0;
  const names=projects.map(project=>project.querySelector('h3').childNodes[0].textContent.trim());
  function go(index){track.scrollTo({left:Math.max(0,Math.min(projects.length-1,index))*track.clientWidth,behavior:reduce.matches?'instant':'smooth'});}
  function update(){
    frame=0;const page=track.scrollLeft/Math.max(1,track.clientWidth);const index=Math.max(0,Math.min(projects.length-1,Math.round(page)));
    frames.forEach((node,i)=>{const presence=Math.max(0,1-Math.abs(page-i));node.style.setProperty('--project-presence',presence.toFixed(4));node.inert=i!==index;});
    if(index===selected)return;selected=index;
    projects.forEach((project,i)=>project.classList.toggle('is-project-active',i===index));
    dotButtons.forEach((button,i)=>{button.classList.toggle('is-current',i===index);button.setAttribute('aria-current',i===index?'true':'false');});
    document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===projects[index].dataset.category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    const activeCategory=document.querySelector('[data-filter].active');if(activeCategory){const list=activeCategory.parentElement;list.scrollTo({left:Math.max(0,activeCategory.offsetLeft-(list.clientWidth-activeCategory.offsetWidth)/2),behavior:reduce.matches?'instant':'smooth'});}
    work.dataset.sceneImage=String([1,2,3,1,0][index]);
    position.textContent=`${String(index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
    document.getElementById('filter-note').textContent=names[index]+' · 左右浏览';
    prev.disabled=index===0;next.disabled=index===projects.length-1;
    document.dispatchEvent(new CustomEvent('portfolio:project-change',{detail:{id:projects[index].id,index}}));
  }
  const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
  track.addEventListener('scroll',request,{passive:true});prev.addEventListener('click',()=>go(selected-1));next.addEventListener('click',()=>go(selected+1));
  track.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||event.target.closest('button,a,input'))return;event.preventDefault();go(event.key==='Home'?0:event.key==='End'?projects.length-1:selected+(event.key==='ArrowRight'?1:-1));});
  document.addEventListener('portfolio:category',event=>{const category=event.detail.category;const index=category==='all'?0:projects.findIndex(project=>project.dataset.category===category);if(index>=0)go(index);});
  document.addEventListener('portfolio:project-select',event=>{const index=projects.findIndex(project=>project.id===event.detail.id);if(index>=0)go(index);});
  new ResizeObserver(()=>{track.scrollTo({left:Math.max(0,selected)*track.clientWidth,behavior:'instant'});request();}).observe(track);
  update();
})();
