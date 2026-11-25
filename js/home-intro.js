/* Hand off from the first-paint cover to the intro only if the photo is ready. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'vsI';
  const root = document.documentElement;
  const pending = () => root.classList.contains('home-intro-pending');
  const intro = document.getElementById('home-intro');
  if (!pending()) return;
  const clearCover = window.__clearHomeIntroCover;
  if (!intro?.showModal || motion.matches || location.hash || scrollY > 0 || navigator.connection?.saveData || document.hidden) {
    clearCover();
    return;
  }

  const waiting = new AbortController();
  const cancelWait = () => { waiting.abort(); clearCover(); };
  for (const event of ['pointerdown', 'keydown', 'scroll', 'pagehide', 'hashchange']) {
    addEventListener(event, cancelWait, { once: true, signal: waiting.signal, passive: true });
  }
  motion.addEventListener('change', cancelWait, { once: true, signal: waiting.signal });

  const photo = new Image();
  if (!photo.decode) { cancelWait(); return; }
  photo.src = '/images/portfolio/p31.webp';
  photo.decode().then(() => {
    waiting.abort();
    if (!pending() || motion.matches || document.hidden || photo.naturalWidth < 2) {
      clearCover();
      return;
    }

    const playing = new AbortController();
    const options = { signal: playing.signal };
    let fallback;
    const close = () => {
      clearTimeout(fallback);
      playing.abort();
      root.classList.remove('home-intro-on');
      if (intro.open) intro.close();
    };
    intro.addEventListener('cancel', e => { e.preventDefault(); close(); }, options);
    intro.querySelector('button').addEventListener('click', close, options);
    intro.addEventListener('animationend', e => { if (e.target === intro) close(); }, options);
    addEventListener('pagehide', close, options);
    motion.addEventListener('change', e => { if (e.matches) close(); }, options);

    intro.showModal();
    root.classList.add('home-intro-on');
    clearCover();
    fallback = setTimeout(close, 1250);
    try { sessionStorage.setItem(key, '1'); } catch { /* The intro still closes normally. */ }
  }).catch(cancelWait);
})();
