/* Scroll-linked chapter transitions without pinning or consuming wheel input. */
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const projects = [...document.querySelectorAll('.project')];
  const sections = [...document.querySelectorAll('#playground, #about, #method, #contact')];
  const scenes = [...projects, ...sections];
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
  let frame = 0;

  scenes.forEach(scene => {
    scene.classList.add('flow-scene');
    scene.classList.remove('reveal');
    scene.querySelectorAll('.reveal').forEach(node => node.classList.remove('reveal'));
    const seam = document.createElement('div');
    seam.className = 'flow-seam';
    seam.setAttribute('aria-hidden', 'true');
    scene.prepend(seam);
    if (scene.classList.contains('project')) {
      [...scene.querySelector('.project-copy').children].forEach((node, index) => node.style.setProperty('--flow-order', Math.min(index, 5)));
    } else {
      scene.classList.add('flow-section');
      const nodes = scene.id === 'method' ? scene.querySelectorAll('.method-heading, .method-track') : scene.id === 'contact' ? scene.querySelectorAll('.contact-content') : scene.querySelectorAll(':scope > .shell > *');
      nodes.forEach((node, index) => {
        node.classList.add('flow-block');
        node.style.setProperty('--flow-order', index);
      });
    }
  });
  document.documentElement.classList.add('flow-mode');

  function update() {
    frame = 0;
    const height = innerHeight;
    const mobile = innerWidth <= 760;
    const paused = document.body.classList.contains('sky-paused');
    // Read layout before writing transforms; scene roots themselves never move.
    const geometry = scenes.filter(scene => !scene.hidden).map(scene => [scene, scene.getBoundingClientRect()]);
    geometry.forEach(([scene, rect]) => {
      const focused = scene.contains(document.activeElement);
      const enter = focused ? 1 : smooth((height * .98 - rect.top) / (height * (mobile ? .53 : .62)));
      const exit = focused ? 0 : smooth((height * .1 - rect.bottom) / (height * .3));
      const travel = clamp((height - rect.top) / (height + rect.height));
      scene.style.setProperty('--flow-enter', enter.toFixed(4));
      scene.style.setProperty('--flow-exit', exit.toFixed(4));
      scene.style.setProperty('--flow-rise', `${((1 - enter) * (mobile ? 36 : 76) - exit * 12).toFixed(2)}px`);
      scene.style.setProperty('--flow-copy-rise', `${((1 - enter) * (mobile ? 23 : 48) - exit * 8).toFixed(2)}px`);
      scene.style.setProperty('--flow-clip', `${((1 - enter) * (mobile ? 5 : 11)).toFixed(2)}%`);
      scene.style.setProperty('--flow-sea', `${(paused ? 0 : (travel - .5) * (mobile ? 18 : 52)).toFixed(2)}px`);
      scene.classList.toggle('flow-in-view', rect.top < height * 1.15 && rect.bottom > -height * .15);
    });
  }
  function request() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', request, {passive: true});
  addEventListener('resize', request, {passive: true});
  document.addEventListener('focusin', request);
  document.addEventListener('focusout', request);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', request));
  new ResizeObserver(request).observe(document.getElementById('work'));
  new MutationObserver(request).observe(document.body, {attributes: true, attributeFilter: ['class']});
  document.fonts?.ready.then(request);
  addEventListener('load', request, {once: true});
  request();
})();
