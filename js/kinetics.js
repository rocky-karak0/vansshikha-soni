/* Pointer depth, gallery layout moves, and shared-image transitions. */
window.AtelierMotion = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const ease = 'cubic-bezier(.22,.75,.22,1)';
  const canAnimate = () => !reduced.matches && !!Element.prototype.animate;
  const running = new Set();
  function animate(element, frames, options, cleanup) {
    const animation = element.animate(frames, { easing: ease, ...options });
    running.add(animation);
    const finish = () => { running.delete(animation); cleanup?.(); };
    animation.finished.then(finish, finish);
    return animation;
  }

  const cardSelector = '.sc,.signature__card,.sit,.tile,.why-card,.guide-card';
  const surfaceSelector = `${cardSelector},.hero-edit__stage`;
  const foilMounted = new WeakSet();
  const clamp = value => Math.max(0, Math.min(1, value));
  let surface, bounds, point, frame;
  function rest() {
    cancelAnimationFrame(frame);
    frame = undefined;
    if (!surface) return;
    for (const key of ['rx','ry','x','y','at-x','at-y']) surface.style.removeProperty(`--kin-${key}`);
    surface.removeAttribute('data-kinetic');
    surface = bounds = undefined;
  }
  function paint() {
    frame = undefined;
    const x = clamp((point.clientX - bounds.left) / bounds.width);
    const y = clamp((point.clientY - bounds.top) / bounds.height);
    const hero = surface.matches('.hero-edit__stage');
    const set = (key, value, unit) => surface.style.setProperty(`--kin-${key}`, `${value.toFixed(2)}${unit}`);
    set('rx', (0.5 - y) * (hero ? 13 : 11), 'deg');
    set('ry', (x - 0.5) * (hero ? 15 : 12), 'deg');
    set('x', (x - 0.5) * (hero ? 26 : 8), 'px');
    set('y', (y - 0.5) * (hero ? 20 : 8), 'px');
    set('at-x', x * 100, '%');
    set('at-y', y * 100, '%');
  }
  document.addEventListener('pointermove', event => {
    if (reduced.matches || !fine.matches || event.pointerType !== 'mouse') return;
    const next = event.target.closest(surfaceSelector);
    if (next !== surface) {
      rest();
      if (!next) return;
      bounds = next.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      surface = next;
      if (surface.matches(cardSelector) && !foilMounted.has(surface)) {
        const foil = document.createElement('span');
        foil.className = 'kinetic-foil';
        foil.setAttribute('aria-hidden', 'true');
        surface.append(foil);
        foilMounted.add(surface);
      }
      surface.dataset.kinetic = 'tracking';
    }
    if (!surface) return;
    point = event;
    if (frame === undefined) frame = requestAnimationFrame(paint);
  }, { passive: true });
  document.addEventListener('pointerout', event => {
    if (surface && event.target instanceof Node && surface.contains(event.target) && !surface.contains(event.relatedTarget instanceof Node ? event.relatedTarget : null)) rest();
  }, { passive: true });
  addEventListener('scroll', rest, { capture: true, passive: true });
  addEventListener('blur', rest);
  fine.addEventListener('change', rest);

  const onScreen = rect => rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight;
  const layoutMoves = new Map();
  let galleryFade;
  function filter(grid, tiles, update) {
    if (!canAnimate()) { update(); return; }
    const first = new Map();
    for (const tile of tiles) {
      const box = tile.getBoundingClientRect();
      if (onScreen(box)) first.set(tile, box);
    }
    layoutMoves.forEach(animation => animation.cancel());
    layoutMoves.clear();
    galleryFade?.cancel();
    rest();
    const scrollTop = scrollY;
    update();
    const moves = [];
    for (const [tile, before] of first) {
      const after = tile.getBoundingClientRect();
      if (!onScreen(after)) continue;
      const dx = before.left - after.left, dy = before.top - after.top + scrollTop - scrollY;
      if (Math.abs(dx) + Math.abs(dy) > 2) moves.push([tile, dx, dy]);
    }
    for (const [tile, dx, dy] of moves) {
      const animation = animate(tile, [{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'translate(0,0)' }],
        { id: 'atelier-layout', duration: 490 }, () => { if (layoutMoves.get(tile) === animation) layoutMoves.delete(tile); });
      layoutMoves.set(tile, animation);
    }
    if (moves.length) return;
    // Even when no visible tile has a matching destination, the new selection has a visual cue.
    galleryFade = animate(grid, [{ opacity: .58 }, { opacity: 1 }], { id: 'atelier-gallery', duration: 280 });
  }

  let flight;
  function cancelFlight() {
    if (!flight) return;
    const previous = flight;
    flight = undefined;
    previous.animation.cancel();
    previous.image.remove();
    previous.viewer.removeAttribute('data-morphing');
  }
  function thumbBox(image) {
    if (!canAnimate() || !image?.naturalWidth) return null;
    const box = image.getBoundingClientRect();
    if (!onScreen(box) || box.top < 0 || box.bottom > innerHeight) return null;
    return box;
  }
  function fly(viewer, thumb, box, opening) {
    const current = !opening && flight?.viewer === viewer ? flight.image.getBoundingClientRect() : null;
    cancelFlight();
    rest();
    if (!canAnimate() || !box || !thumb) return;
    viewer.dataset.morphing = '';
    const photo = viewer.querySelector('figure > img');
    const viewport = photo.getBoundingClientRect();
    if (!onScreen(viewport)) { viewer.removeAttribute('data-morphing'); return; }

    const fit = Math.min(viewport.width / thumb.naturalWidth, viewport.height / thumb.naturalHeight);
    const width = thumb.naturalWidth * fit, height = thumb.naturalHeight * fit;
    const contained = { width, height, left: viewport.left + (viewport.width - width) / 2, top: viewport.top + (viewport.height - height) / 2 };
    const image = document.createElement('img');
    image.className = 'atelier-photo-flight';
    image.src = thumb.currentSrc || thumb.src;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    document.body.append(image);
    const pose = ({ left, top, width, height }, radius) => ({
      left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`, borderRadius: radius
    });
    const thumbnail = pose(box, '4px'), expanded = pose(current || contained, '0px');
    const animation = animate(image, opening ? [thumbnail, expanded] : [expanded, thumbnail], {
      id: 'atelier-photo-flight', duration: opening ? 510 : 370, fill: 'both'
    }, () => {
      image.remove();
      if (flight?.animation !== animation) return;
      viewer.removeAttribute('data-morphing');
      flight = undefined;
    });
    flight = { viewer, image, animation };
  }

  const flashes = new WeakMap();
  function highlight(element) {
    if (!canAnimate()) return;
    flashes.get(element)?.cancel();
    flashes.set(element, animate(element, [
      { color: '#ffe4ae', textShadow: '0 0 14px #f3c980bb', translate: '0 3px' },
      { color: 'inherit', textShadow: 'none', translate: '0 0' }
    ], { id: 'atelier-ticket', duration: 540 }));
  }

  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    rest();
    cancelFlight();
    running.forEach(animation => animation.cancel());
  });
  addEventListener('resize', () => { rest(); cancelFlight(); }, { passive: true });
  return { filter, thumbBox, fly, cancelFlight, highlight };
})();
