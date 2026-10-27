/* Optional enhancement: the portfolio remains usable without any CDN libraries. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const random = (a, b) => a + Math.random() * (b - a);
  const panels = [...document.querySelectorAll('.method-panel')];
  const desktopPanels = matchMedia('(min-width: 761px)');
  const activate = panel => panels.forEach(item => {
    const active = item === panel;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-expanded', String(active));
  });
  const syncPanels = () => panels.forEach(panel => {
    if (desktopPanels.matches) panel.setAttribute('aria-expanded', String(panel.classList.contains('is-active')));
    else panel.setAttribute('aria-expanded', 'true');
  });
  panels.forEach((panel, index) => {
    ['mouseenter', 'focus', 'click'].forEach(type => panel.addEventListener(type, () => {
      if (desktopPanels.matches) activate(panel);
    }));
    panel.addEventListener('keydown', event => {
      if (!desktopPanels.matches || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? panels.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + panels.length) % panels.length;
      panels[next].focus();
    });
  });
  desktopPanels.addEventListener('change', syncPanels);
  syncPanels();

  document.querySelectorAll('.star-field').forEach(field => {
    const count = innerWidth <= 760 ? 25 : 50;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('i');
      star.className = 'sky-star' + (i % 9 === 0 ? ' star-cross' : '');
      star.style.cssText = `left:${random(4, 96)}%;top:${random(4, 85)}%;--star-opacity:${random(.3, .9)};--star-time:${random(2, 5)}s;--star-delay:-${random(0, 5)}s`;
      fragment.append(star);
    }
    field.append(fragment);
  });
  [[6,63],[10,69],[6,75],[47,16],[51,20],[86,58],[90,64],[86,70]].forEach(([x,y]) => {
    const glass = document.createElement('i');
    glass.className = 'sky-glass';
    glass.style.cssText = `left:${x}%;top:${y}%`;
    document.querySelector('.hero-glass').append(glass);
  });

  const motionToggle = document.getElementById('motion-toggle');
  motionToggle.hidden = reduce.matches;
  motionToggle.addEventListener('click', () => {
    const paused = document.body.classList.toggle('sky-paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.innerHTML = paused ? '播放星空动效 <span aria-hidden="true">▷</span>' : '暂停星空动效 <span aria-hidden="true">Ⅱ</span>';
  });
  const counters = [...document.querySelectorAll('.evidence-card b')];
  counters.forEach(counter => counter.closest('.evidence-card').setAttribute('aria-label', counter.closest('.evidence-card').textContent.trim().replace(/\s+/g,' ')));
  const setCounters = p => counters.forEach(counter => {
    counter.textContent = (Number(counter.dataset.to) * p).toFixed(Number(counter.dataset.dec));
    counter.setAttribute('aria-hidden','true');
  });
  const finishStatic = () => {
    setCounters(1);
    document.body.classList.remove('motion-intro');
    document.querySelector('.intro-backdrop')?.remove();
    document.querySelectorAll('.footer-ring,.footer-mark').forEach(el => el.style.strokeDashoffset = '0');
    document.querySelectorAll('.footer-dot').forEach(el => el.style.opacity = '0');
  };
  if (reduce.matches || !window.gsap || !window.ScrollTrigger) { finishStatic(); return; }
  const {gsap, ScrollTrigger} = window;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.remove('js-reveal');
  document.documentElement.classList.add('motion-ready');
  const split = element => {
    element.setAttribute('aria-label', element.textContent.trim());
    const visit = node => [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        const tokens = child.textContent.match(/[\u3400-\u9fff]|[^\s\u3400-\u9fff]+|\s+/gu) || [];
        tokens.forEach(word => {
          if (/^\s+$/u.test(word)) fragment.append(document.createTextNode(word));
          else {
            const span = document.createElement('span');
            span.className = 'w'; span.textContent = word; span.setAttribute('aria-hidden','true'); fragment.append(span);
          }
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') visit(child);
    });
    visit(element);
  };
  document.querySelectorAll('.split-title').forEach(split);

  let lenis;
  let introTimeline;
  if (window.Lenis) {
    lenis = new Lenis({duration:1.25,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true,prevent:node=>!!node.closest('dialog, [data-lenis-prevent]')});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
    const dialog = document.getElementById('case-dialog');
    new MutationObserver(() => { if (dialog.open) lenis.stop(); else if (!document.body.classList.contains('motion-intro')) lenis.start(); }).observe(dialog,{attributes:true,attributeFilter:['open']});
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || link.closest('dialog')) return;
      const id = link.getAttribute('href');
      const target = id.length > 1 && document.getElementById(id.slice(1));
      if (!target) return;
      event.preventDefault();
      if (document.body.classList.contains('motion-intro')) introTimeline?.progress(1);
      lenis.resize();
      const destination = id === '#home' ? 0 : target.getBoundingClientRect().top + window.scrollY - 76;
      lenis.scrollTo(destination,{duration:1.6,onComplete:()=>history.replaceState(null,'',id)});
    });
  }
  // Filtering changes document height; refresh pin geometry after the DOM has settled.
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',()=>requestAnimationFrame(()=>ScrollTrigger.refresh())));

  const setupScroll = () => {
    gsap.to('.hero-art',{yPercent:12,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.hero-copy',{yPercent:-13,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('.hero-glass',{yPercent:-28,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}});
    document.querySelectorAll('.reveal').forEach(element=>gsap.from(element,{opacity:0,y:28,duration:.9,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 91%',once:true}}));
    document.querySelectorAll('.split-title:not(#hero-title)').forEach(element=>gsap.from(element.querySelectorAll('.w'),{opacity:0,y:22,filter:'blur(8px)',duration:.8,stagger:.035,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 86%',once:true}}));
    const media = gsap.matchMedia();
    media.add('(min-width:901px)',()=>{
      setCounters(0);
      const proxy = {p:0};
      gsap.from('.evidence-card',{y:40,opacity:0,duration:.75,stagger:.08,scrollTrigger:{trigger:'.evidence-cards',start:'top 87%'}});
      gsap.timeline({scrollTrigger:{trigger:'#coordinates',start:'top top',end:'+=85%',pin:true,scrub:1,invalidateOnRefresh:true}})
        .to(proxy,{p:1,ease:'none',onUpdate:()=>setCounters(proxy.p)},0)
        .fromTo('.coordinate-orbit',{yPercent:45,opacity:.15},{yPercent:0,opacity:.65,ease:'none'},0);
      return ()=>setCounters(1);
    });
    media.add('(max-width:900px)',()=>{
      setCounters(0);
      const proxy = {p:0};
      gsap.from('.evidence-card',{y:25,opacity:0,duration:.7,stagger:.08,scrollTrigger:{trigger:'.evidence-cards',start:'top 88%'}});
      gsap.to(proxy,{p:1,duration:1.8,ease:'power2.out',onUpdate:()=>setCounters(proxy.p),scrollTrigger:{trigger:'.evidence-cards',start:'top 88%',once:true}});
      gsap.fromTo('.coordinate-orbit',{yPercent:20},{yPercent:0,ease:'none',scrollTrigger:{trigger:'#coordinates',start:'top bottom',end:'bottom bottom',scrub:true}});
      return ()=>setCounters(1);
    });
    media.add('(min-width:761px)',()=>{
      gsap.from('.method-panel-in',{y:100,opacity:0,duration:1.1,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'#method',start:'top 65%',once:true}});
      gsap.to('.method-constellation',{x:65,ease:'none',scrollTrigger:{trigger:'#method',start:'top bottom',end:'bottom top',scrub:true}});
    });
    media.add('(max-width:760px)',()=>{
      panels.forEach(panel=>gsap.from(panel.querySelector('.method-panel-in'),{y:25,opacity:0,duration:.8,scrollTrigger:{trigger:panel,start:'top 91%',once:true}}));
    });
    gsap.fromTo('.contact-sea',{yPercent:-9},{yPercent:0,ease:'none',scrollTrigger:{trigger:'#contact',start:'top bottom',end:'bottom bottom',scrub:true}});
    gsap.from('.contact-content',{y:65,scale:.96,opacity:0,filter:'blur(8px)',duration:1.15,ease:'power3.out',scrollTrigger:{trigger:'#contact',start:'top 65%',once:true}});
    gsap.timeline({scrollTrigger:{trigger:'.site-footer',start:'top 95%',once:true}})
      .to('.footer-dot',{y:-7,duration:.2,stagger:.08,yoyo:true,repeat:3,ease:'sine.inOut'})
      .to('.footer-dot',{attr:{cx:40,cy:40},duration:.4,ease:'power3.inOut'})
      .to('.footer-dot',{opacity:0,duration:.15})
      .to('.footer-mark',{strokeDashoffset:0,duration:.7,ease:'power3.out'},'-=.05')
      .to('.footer-ring',{strokeDashoffset:0,duration:.9,ease:'power2.inOut'},'-=.3');
    ScrollTrigger.refresh();
  };

  // Deep links should arrive directly at their destination, without a scroll-locked intro.
  if (scrollY > 50 || (location.hash && location.hash !== '#home')) {
    document.querySelector('.intro-backdrop')?.remove();
    setupScroll();
  } else {
    document.body.classList.add('motion-intro');
    lenis?.stop();
    gsap.set('#hero-title .w',{opacity:0,y:24,filter:'blur(10px)'});
    gsap.set('.header',{opacity:0,y:-16});
    introTimeline = gsap.timeline({delay:.15,onComplete:()=>{
      document.body.classList.remove('motion-intro');
      gsap.set('#app',{clearProps:'all'});
      document.querySelector('.intro-backdrop')?.remove();
      if (!document.getElementById('case-dialog').open) lenis?.start();
      setupScroll();
    }})
      .fromTo('#app',{scale:.9,borderRadius:28},{scale:1,borderRadius:0,duration:1.4,ease:'expo.inOut'})
      .to('.header',{opacity:1,y:0,duration:.8,ease:'power3.out'},'-=.5')
      .to('#hero-title .w',{opacity:1,y:0,filter:'blur(0px)',duration:.95,stagger:.05,ease:'power3.out'},'-=.65')
      .from('.hero-visual',{x:50,opacity:0,duration:1.3,ease:'power3.out'},.5)
      .from('.hero-intro,.hero-actions,.hero-handwriting',{y:14,opacity:0,duration:.8,stagger:.1,ease:'power3.out'},1.15)
      .from('.sky-glass',{opacity:0,scale:.65,duration:1,stagger:{each:.07,from:'random'},ease:'back.out(1.5)'},1);
  }
  document.querySelectorAll('.sky-glass').forEach(glass=>gsap.to(glass,{opacity:.2,duration:random(1,2),yoyo:true,repeat:-1,ease:'sine.inOut',delay:random(1,4),repeatDelay:random(1,3)}));
  addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
  document.fonts?.ready.then(()=>ScrollTrigger.refresh());
  ScrollTrigger.addEventListener('refresh',()=>lenis?.resize());
  // A preference change is applied immediately and also releases any pinned sections.
  reduce.addEventListener('change',()=>location.reload());
})();
