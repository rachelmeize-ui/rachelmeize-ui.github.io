/* Build-free adaptations of TextPressure, MaskedHeading, StrokeText and FoldText. */
(() => {
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const paused=()=>reduce.matches||document.body.classList.contains('sky-paused');
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const records=[];
  const titleEffects=[
    ['#hero-title','fold'],['.hero-handwriting','pressure'],['#coordinates-title','stroke'],['#work-title','mask'],
    ['#project-evaluation .project-copy h3','stroke'],['#project-campus .project-copy h3','mask'],
    ['#project-finfair .project-copy h3','fold'],['#project-skill .project-copy h3','stroke'],
    ['#project-marketing .project-copy h3','mask'],['#play-title','fold'],['#about-title','fold'],
    ['#method-title','stroke'],['#contact-title','fold'],['.play-story h3','stroke'],['.about-intro .lead','fold'],
    ['.experience-item h3','stroke'],['.about-principle h3','fold'],['.method-step strong','fold'],['.eval-poster-title','fold'],
    ['.paper-question','fold'],['.marketing-chart-title','stroke']
  ];
  const bodySelector='.about-subtitle,.about-principle p,.hero-intro,.project-description,.project-kicker,.project-facts,.role-note,.section-aside,.play-story>p,.play-story>.issue-number,.about-intro>p:not(.lead),.experience-item p,.method-heading>p:not(.eyebrow),.method-step>span:not(.step-coordinate),.contact-content>p:not(.eyebrow)';
  function splitText(element,effect){
    if(element.dataset.dynamicText)return;
    element.dataset.dynamicText=effect;
    element.classList.add('dynamic-title','effect-'+effect);
    element.setAttribute('aria-label',element.textContent.trim());
    if(element.matches('.hero-handwriting'))element.classList.add('pressure-text');
    let order=0;
    const visit=node=>[...node.childNodes].forEach(child=>{
      if(child.nodeType===Node.TEXT_NODE){
        const fragment=document.createDocumentFragment();
        const chunks=child.textContent.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*|\s+|./gu)||[];
        chunks.forEach(chunk=>{
          if(/^\s+$/u.test(chunk)){fragment.append(document.createTextNode(chunk));return;}
          const word=/^[A-Za-z0-9]/.test(chunk)&&chunk.length>1?document.createElement('span'):null;
          if(word)word.className='typo-word';
          for(const char of chunk){
            const unit=document.createElement('span');unit.className='typo-unit';unit.setAttribute('aria-hidden','true');
            unit.style.setProperty('--glyph-delay',`${Math.min(order*.023,.46).toFixed(3)}s`);
            const glyph=document.createElement('span');glyph.className='typo-glyph';glyph.dataset.char=char;
            const ink=document.createElement('span');ink.className='typo-ink';ink.textContent=char;
            glyph.append(ink);unit.append(glyph);(word||fragment).append(unit);order++;
          }
          if(word)fragment.append(word);
        });
        child.replaceWith(fragment);
      } else if(child.nodeType===Node.ELEMENT_NODE&&!['BR','SVG'].includes(child.tagName))visit(child);
    });
    visit(element);
    const record={element,units:[...element.querySelectorAll('.typo-unit')],geometry:[],strength:[],x:0,y:0,inside:false,ripple:0,raf:0};
    record.strength=record.units.map(()=>0);records.push(record);
    bindPressure(record);
    observer.observe(element);
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const node=entry.target;
    // The immersive stage controls its own visibility; geometric intersection alone is insufficient.
    if(node.closest('.narrative-pane')&&!document.querySelector('.narrative-static'))return;
    node.classList.toggle('type-scope-visible',entry.isIntersecting);
  }),{threshold:.15});
  function bodies(scope){
    scope.querySelectorAll(bodySelector).forEach((node,index)=>{
      node.classList.add('dynamic-body');node.style.setProperty('--body-delay',Math.min(index%5*.045,.18)+'s');observer.observe(node);
    });
  }
  function measure(){
    for(let i=records.length-1;i>=0;i--)if(!records[i].element.isConnected){records[i].stop();observer.unobserve(records[i].element);records.splice(i,1);}
    const widths=[];
    records.forEach(record=>record.units.forEach(unit=>{unit.style.width='';}));
    records.forEach(record=>widths.push(record.units.map(unit=>parseFloat(getComputedStyle(unit).width)||unit.offsetWidth)));
    records.forEach((record,index)=>record.units.forEach((unit,i)=>{if(widths[index][i]>0)unit.style.width=widths[index][i]+'px';}));
    document.dispatchEvent(new CustomEvent('portfolio:type-layout'));
  }
  function bindPressure(record){
    const {element,units}=record;
    const stop=()=>{cancelAnimationFrame(record.raf);record.raf=0;record.inside=false;record.ripple=0;record.strength.fill(0);units.forEach(unit=>unit.style.setProperty('--pressure','0'));};
    const geometry=()=>{
      const boxes=units.map(unit=>unit.getBoundingClientRect());
      record.geometry=boxes.map(box=>({x:box.left+box.width/2,y:box.top+box.height/2}));
      const box=element.getBoundingClientRect();record.radius=Math.max(65,Math.min(160,box.width*.28));record.box=box;
    };
    const tick=now=>{
      record.raf=0;
      if(paused()||!element.closest('.type-in-view,.type-scope-visible')&&element.closest('.narrative-pane')){stop();return;}
      const age=record.ripple?(now-record.ripple)/1000:1;
      let moving=false;
      units.forEach((unit,i)=>{
        const point=record.geometry[i];if(!point)return;
        const distance=Math.hypot(point.x-record.x,(point.y-record.y)*1.2);
        const hover=record.inside?Math.max(0,1-distance/record.radius):0;
        const wave=age<.8?Math.exp(-Math.pow((distance-age*420)/65,2))*(1-age/.8)*.85:0;
        const aim=Math.max(hover,wave);
        record.strength[i]+=(aim-record.strength[i])*.2;
        const p=record.strength[i];unit.style.setProperty('--pressure',p.toFixed(3));
        if(Math.abs(aim-p)>.002)moving=true;
      });
      if(record.box){
        element.style.setProperty('--mask-x',`${((record.x-record.box.left)/record.box.width*30-15).toFixed(2)}px`);
        element.style.setProperty('--mask-y',`${((record.y-record.box.top)/record.box.height*16-8).toFixed(2)}px`);
      }
      if(age<.8)moving=true;
      if(moving)record.raf=requestAnimationFrame(tick);
    };
    const wake=()=>{if(!record.raf)record.raf=requestAnimationFrame(tick);};
    element.addEventListener('pointerenter',event=>{if(paused()||!fine.matches||event.pointerType!=='mouse')return;geometry();record.inside=true;record.x=event.clientX;record.y=event.clientY;wake();});
    element.addEventListener('pointermove',event=>{if(paused()||!fine.matches||event.pointerType!=='mouse')return;record.x=event.clientX;record.y=event.clientY;wake();},{passive:true});
    element.addEventListener('pointerleave',()=>{record.inside=false;wake();});
    element.addEventListener('pointerdown',event=>{if(paused())return;geometry();record.x=event.clientX;record.y=event.clientY;record.ripple=performance.now();wake();},{passive:true});
    record.stop=stop;
  }
  titleEffects.forEach(([selector,effect])=>document.querySelectorAll(selector).forEach(node=>splitText(node,effect)));
  bodies(document);
  document.querySelectorAll('.method-number').forEach(number=>{
    const label=number.textContent.trim();const ns='http://www.w3.org/2000/svg';
    number.classList.add('has-stroke');const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 100 150');svg.setAttribute('class','number-stroke');svg.setAttribute('aria-hidden','true');
    ['stroke-draw','stroke-fill'].forEach(name=>{const glyph=document.createElementNS(ns,'text');glyph.setAttribute('x','3');glyph.setAttribute('y','127');glyph.setAttribute('font-size','142');glyph.setAttribute('class',name);glyph.textContent=label;svg.append(glyph);});number.replaceChildren(svg);
  });
  const caseContent=document.getElementById('case-content');
  new MutationObserver(()=>{
    caseContent.querySelectorAll('h2').forEach(node=>splitText(node,'stroke'));
    caseContent.querySelectorAll('h3').forEach(node=>splitText(node,'fold'));
    caseContent.querySelectorAll('.case-lead,.case-section>p').forEach(node=>{node.classList.add('dynamic-body');observer.observe(node);});
    measure();
  }).observe(caseContent,{childList:true});
  let resizeFrame=0;
  addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(measure);},{passive:true});
  document.fonts?.ready.then(measure);
  new MutationObserver(()=>{if(paused())records.forEach(record=>record.stop());}).observe(document.body,{attributes:true,attributeFilter:['class']});
})();
