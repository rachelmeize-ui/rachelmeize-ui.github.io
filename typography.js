/* Native, build-free interpretations of the supplied typography examples.
 * Body text, links and project facts are intentionally left untouched.
 */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => reduce.matches || document.body.classList.contains('sky-paused');
  const heading = document.getElementById('work-title');
  heading.classList.add('masked-sea-text');
  if (!reduce.matches && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let frame;
    heading.addEventListener('pointermove', event => {
      if (paused()) return;
      cancelAnimationFrame(frame);
      const {left,top,width,height} = heading.getBoundingClientRect();
      const x = ((event.clientX-left)/width-.5)*24;
      const y = ((event.clientY-top)/height-.5)*12;
      frame = requestAnimationFrame(()=>{heading.style.setProperty('--type-x',x+'px');heading.style.setProperty('--type-y',y+'px');});
    });
    heading.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);heading.style.setProperty('--type-x','0px');heading.style.setProperty('--type-y','0px');});
  }

  document.querySelectorAll('.method-number').forEach(number => {
    const text = number.textContent.trim();
    number.classList.add('has-stroke');
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 100 150');svg.setAttribute('class','number-stroke');svg.setAttribute('aria-hidden','true');
    ['stroke-draw','stroke-fill'].forEach(name=>{
      const glyph=document.createElementNS(ns,'text');glyph.setAttribute('x','3');glyph.setAttribute('y','127');glyph.setAttribute('font-size','142');glyph.setAttribute('class',name);glyph.textContent=text;svg.append(glyph);
    });
    number.replaceChildren(svg);
  });
  const fold = document.getElementById('play-title');
  const label = fold.textContent;
  fold.setAttribute('aria-label',label);
  fold.replaceChildren(...Array.from(label).map((char,i)=>{
    const slot=document.createElement('span');slot.className='fold-char';slot.setAttribute('aria-hidden','true');slot.style.setProperty('--fold-i',i);
    const piece=document.createElement('span');piece.className='fold-piece';piece.textContent=char;slot.append(piece);return slot;
  }));
  if ('IntersectionObserver' in window && !reduce.matches) {
    fold.classList.add('fold-enhanced');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      entry.target.classList.add(entry.target===fold?'fold-visible':'number-ready');observer.unobserve(entry.target);
    }),{threshold:.15});
    observer.observe(fold);document.querySelectorAll('.method-panel').forEach(panel=>observer.observe(panel));
  }

  const title = document.querySelector('.hero-handwriting');
  const copy = title.textContent;
  title.classList.add('pressure-text');title.setAttribute('lang','en');title.setAttribute('aria-label',copy);
  const glyphs = Array.from(copy).map(char=>{
    const slot=document.createElement('span');slot.className='pressure-char'+(char===' '?' pressure-space':'');slot.setAttribute('aria-hidden','true');
    const glyph=document.createElement('span');glyph.className='pressure-glyph';glyph.textContent=char;slot.append(glyph);return slot;
  });
  title.replaceChildren(...glyphs);
  // Freeze the character advances, so pressure changes never move surrounding content.
  let centers=[];
  const measure=()=>{
    glyphs.forEach(slot=>{slot.style.width='';slot.firstChild.style.fontVariationSettings="'opsz' 60,'wdth' 100,'wght' 400";});
    const widths=glyphs.map(slot=>slot.getBoundingClientRect().width);
    let left=0;centers=widths.map(width=>{const center=left+width/2;left+=width;return center;});
    glyphs.forEach((slot,i)=>slot.style.width=widths[i]+'px');
  };
  document.fonts?.ready.then(measure);
  new ResizeObserver(measure).observe(title);
  if (reduce.matches || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let targetX=-1000, currentX=-1000, frame=0, visible=true;
  const strengths=glyphs.map(()=>0);
  const tick=()=>{
    frame=0;
    const disabled=paused() || !visible;
    currentX+=(targetX-currentX)*.17;
    const width=title.getBoundingClientRect().width;
    const radius=Math.max(70,width*.24);
    let moving=false;
    glyphs.forEach((slot,i)=>{
      const aim=disabled?0:Math.max(0,1-Math.abs(centers[i]-currentX)/radius);
      strengths[i]+=(aim-strengths[i])*.18;
      if(Math.abs(aim-strengths[i])>.003)moving=true;
      const p=strengths[i];
      const glyph=slot.firstChild;
      glyph.style.fontVariationSettings=`'opsz' 60,'wdth' ${100+p*17},'wght' ${400+p*240}`;
      glyph.style.transform=`translateY(${-p*1.5}px)`;
      glyph.style.color=`color-mix(in srgb,#f7e5d5 ${Math.round(p*75)}%,#e0e6f4)`;
    });
    moving ||= Math.abs(targetX-currentX)>.1;
    title.classList.toggle('pressure-moving',moving);
    if(moving && visible)frame=requestAnimationFrame(tick);
  };
  const wake=()=>{if(!frame && visible)frame=requestAnimationFrame(tick);};
  title.addEventListener('pointermove',event=>{targetX=event.clientX-title.getBoundingClientRect().left;wake();});
  title.addEventListener('pointerleave',()=>{targetX=-1000;wake();});
  new MutationObserver(wake).observe(document.body,{attributes:true,attributeFilter:['class']});
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(title);
})();
