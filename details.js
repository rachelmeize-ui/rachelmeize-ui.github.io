/* Curated, build-free enhancements inspired by the supplied interaction references. */
(() => {
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const paused=()=>reduce.matches||document.body.classList.contains('sky-paused');
  const ns='http://www.w3.org/2000/svg';
  document.querySelectorAll('.hero-actions .button-light,.nav-contact,#copy-email').forEach(button=>{
    button.classList.add('star-button');
    const svg=document.createElementNS(ns,'svg');svg.classList.add('star-edge');svg.setAttribute('aria-hidden','true');
    ['star-track','star-trail'].forEach(name=>{const rect=document.createElementNS(ns,'rect');rect.setAttribute('class',name);rect.setAttribute('pathLength','100');svg.append(rect);});
    button.append(svg);
    new ResizeObserver(()=>{
      const w=button.offsetWidth+2,h=button.offsetHeight+2;
      svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      svg.querySelectorAll('rect').forEach(rect=>{rect.setAttribute('x','1');rect.setAttribute('y','1');rect.setAttribute('width',w-2);rect.setAttribute('height',h-2);rect.setAttribute('rx',Math.max(3,parseFloat(getComputedStyle(button).borderRadius)||4));});
    }).observe(button);
  });
  document.querySelectorAll('[data-filter],.mode-switch button').forEach(button=>{
    if(button.hasAttribute('data-filter'))button.classList.add('jelly-chip');
    button.addEventListener('click',()=>{
      if(paused())return;
      button.getAnimations().forEach(animation=>animation.cancel());
      button.animate([{transform:'scale(1)'},{transform:'scale(1.08,.94)',offset:.35},{transform:'scale(.98,1.04)',offset:.7},{transform:'scale(1)'}],{duration:440,easing:'cubic-bezier(.2,.7,.2,1)'});
    });
  });

  const deck=document.querySelector('.hero-visual');
  const cards=[...deck.querySelectorAll('.deck-card')];
  if(cards.length){
    deck.classList.add('has-deck');
    let front=0;
    const position=document.getElementById('deck-position');
    const show=()=>{
      cards.forEach((card,i)=>{
        const layer=(i-front+cards.length)%cards.length;
        card.dataset.layer=layer;
        card.inert=layer!==0;
        card.setAttribute('aria-hidden',String(layer!==0));
        card.tabIndex=layer===0?0:-1;
      });
      position.textContent=`0${front+1} / 0${cards.length}`;
      position.setAttribute('aria-label',`第 ${front+1} 个项目，共 ${cards.length} 个：${cards[front].dataset.projectName}`);
    };
    document.getElementById('deck-next').addEventListener('click',()=>{front=(front+1)%cards.length;show();});
    document.getElementById('deck-prev').addEventListener('click',()=>{front=(front-1+cards.length)%cards.length;show();});
    deck.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
      event.preventDefault();front=(front+(event.key==='ArrowRight'?1:-1)+cards.length)%cards.length;show();
      cards[front].focus({preventScroll:true});
    });
    show();
  }

  document.querySelectorAll('.star-field').forEach(field=>{
    const canvas=document.createElement('canvas');canvas.className='galaxy-canvas';canvas.setAttribute('aria-hidden','true');
    const ctx=canvas.getContext('2d');if(!ctx)return;
    field.append(canvas);field.classList.add('has-canvas');
    let w=1,h=1,dpr=1,visible=false,raf=0,last=0,clock=0;
    let pointer={x:0,y:0,seen:false};
    // A small deterministic field rather than a full-screen GPU shader.
    let seed=37;
    const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
    const particles=Array.from({length:innerWidth<761?38:90},(_,i)=>({x:rand(),y:rand(),depth:.25+rand()*.75,r:.35+rand()*1.15,phase:rand()*6.28,cross:i%18===0}));
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{
        let x=p.x*w+Math.sin(clock*.05+p.phase)*6*p.depth;
        let y=p.y*h+Math.cos(clock*.04+p.phase)*5*p.depth;
        if(pointer.seen&&!paused()){
          x+=pointer.x*9*p.depth;y+=pointer.y*6*p.depth;
        }
        const twinkle=.42+.25*Math.sin(clock*.5+p.phase);
        ctx.fillStyle=`rgba(218,233,255,${twinkle})`;
        ctx.beginPath();ctx.arc(x,y,p.r*p.depth,0,Math.PI*2);ctx.fill();
        if(p.cross){
          const glow=ctx.createRadialGradient(x,y,0,x,y,8);
          glow.addColorStop(0,'rgba(223,239,255,.4)');glow.addColorStop(1,'rgba(223,239,255,0)');
          ctx.fillStyle=glow;ctx.fillRect(x-8,y-8,16,16);
          ctx.strokeStyle=`rgba(229,239,255,${twinkle*.65})`;ctx.lineWidth=.5;
          ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();
        }
      });
    };
    const tick=time=>{
      raf=0;if(!visible||document.hidden)return;
      if(time-last>=33){clock+=Math.min((time-last)/1000,.06);last=time;draw();}
      if(!paused())raf=requestAnimationFrame(tick);
    };
    const wake=()=>{draw();if(visible&&!document.hidden&&!paused()&&!raf){last=performance.now();raf=requestAnimationFrame(tick);}};
    const resize=()=>{
      w=field.clientWidth;h=field.clientHeight;dpr=Math.min(devicePixelRatio||1,1.5);
      canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);wake();
    };
    new ResizeObserver(resize).observe(field);
    new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'80px'}).observe(field);
    const section=field.closest('section');
    section.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;const box=section.getBoundingClientRect();pointer={x:(event.clientX-box.left)/box.width-.5,y:(event.clientY-box.top)/box.height-.5,seen:true};},{passive:true});
    section.addEventListener('pointerleave',()=>{pointer.seen=false;});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();});
    new MutationObserver(wake).observe(document.body,{attributes:true,attributeFilter:['class']});
    reduce.addEventListener('change',wake);resize();
  });
})();
