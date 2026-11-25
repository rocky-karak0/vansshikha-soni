/* Reservation desk and progressive photo motion. The opening intro is independent. */
(() => {
  const desk = $('[data-appointment]');
  if (!desk) return;

  const params = new URLSearchParams(location.search);
  const select = $('#ssel', desk);
  const panels = $$('.stp', desk);
  const steps = $$('#steps li', desk);
  const calendar = $('#cal', desk);
  const times = $('#times', desk);
  const rates = $('#menu-options', desk);
  const name = $('#nm', desk);
  const notes = $('#nt', desk);
  const errors = [0, 1, 2].map(i => $(`#e${i}`, desk));
  const formatDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formatMonth = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const periods = ['Flexible', 'Morning', 'Afternoon', 'Evening'];
  let service = SERV.find(item => item.slug === params.get('service'));
  let look = PORTFOLIO.find(item => item.id === params.get('look'));
  let date, rate, time = 'Flexible', month = firstMonth, step = 0;

  for (const cat of CATS) {
    const group = document.createElement('optgroup');
    group.label = cat.name;
    group.append(...cat.items.map(item => new Option(item.name, item.slug)));
    select.append(group);
  }
  select.value = service?.slug || '';
  times.innerHTML = periods.map(period => `<button type="button" class="opt" data-v="${period}" aria-pressed="${period === time}">${period}</button>`).join('');

  function updateTicket() {
    $('#ticket-service', desk).textContent = service?.name || 'Not selected';
    $('#ticket-date', desk).textContent = date ? formatDate.format(date) : 'Not selected';
    $('#ticket-time', desk).textContent = time;
    $('#ticket-rates-row', desk).hidden = !service;
    $('#ticket-rates', desk).textContent = service ? (rate ? `${rate} ${inr(service[rate.toLowerCase()])} preferred` : `M ${inr(service.m)} · R ${inr(service.r)}`) : '';
  }

  function updateRates() {
    rates.hidden = !service;
    if (!service) return;
    $$('[data-rate]', rates).forEach(button => {
      const key = button.dataset.rate;
      button.textContent = `${key} ${inr(service[key.toLowerCase()])}`;
      button.setAttribute('aria-pressed', key === rate);
    });
  }

  function updateLook() {
    const chip = $('#lookchip', desk);
    chip.hidden = !look;
    if (look) {
      $('img', chip).src = IMG[look.id];
      $('#lookname', chip).textContent = look.t;
    }
  }

  function renderCalendar() {
    const y = month.getFullYear(), m = month.getMonth();
    const days = new Date(y, m + 1, 0).getDate();
    const controls = `<div class="h"><button type="button" data-month="-1" aria-label="Previous month" ${month <= firstMonth ? 'disabled' : ''}>‹</button><span aria-live="polite">${formatMonth.format(month)}</span><button type="button" data-month="1" aria-label="Next month">›</button></div>`;
    const weekday = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => `<span class="w" aria-hidden="true">${day}</span>`).join('');
    const buttons = Array.from({ length: days }, (_, i) => {
      const day = new Date(y, m, i + 1), value = day.getTime();
      return `<button type="button" class="day" data-d="${value}" aria-label="${formatDate.format(day)}" ${day < today ? 'disabled' : ''} ${value === +today ? 'aria-current="date"' : ''} aria-pressed="${value === +date}">${i + 1}</button>`;
    }).join('');
    calendar.innerHTML = `${controls}<div class="grid7">${weekday}${'<span aria-hidden="true"></span>'.repeat(month.getDay())}${buttons}</div>`;
  }

  function review() {
    const rows = [['Service', service.name], ['Preferred date', formatDate.format(date)], ['Time of day', time], ['Name', name.value.trim()]];
    if (rate) rows.splice(1, 0, ['Menu rate preference', `${rate} ${inr(service[rate.toLowerCase()])}`]);
    if (look) rows.push(['Inspiration', look.t]);
    if (notes.value.trim()) rows.push(['Design notes', notes.value.trim()]);
    $('#sum', desk).replaceChildren(...rows.map(([label, value]) => {
      const li = document.createElement('li');
      const key = document.createElement('span');
      const text = document.createElement('span');
      key.textContent = label;
      text.textContent = value;
      li.append(key, text);
      return li;
    }));
    const message = `Hello Vansshikha Soni Nail Atelier! I’d like to request an appointment.\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nPlease confirm availability and final pricing.`;
    $('#wa', desk).href = waLink(message);
  }

  function go(next) {
    desk.dataset.stepDirection = next < step ? 'back' : 'forward';
    step = next;
    panels.forEach((panel, i) => panel.classList.toggle('on', i === step));
    steps.forEach((item, i) => {
      item.classList.toggle('is-complete', i < step);
      if (i === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    if (step === 3) review();
    const heading = $('h3', panels[step]);
    heading.focus({ preventScroll: true });
    const top = heading.getBoundingClientRect().top;
    if (top < $('#nav').offsetHeight + 10 || top > innerHeight * .7) heading.scrollIntoView({ block: 'start' });
  }

  function clearError(index, field) {
    errors[index].textContent = '';
    field.removeAttribute('aria-invalid');
  }

  function advance() {
    const checks = [[!service, 'Please choose a service.', select], [!date, 'Please choose a preferred date.', $('.day:not(:disabled)', calendar)], [!name.value.trim(), 'Please enter your name.', name]];
    const [invalid, message, field] = checks[step];
    if (invalid) {
      errors[step].textContent = message;
      if (step !== 1) field.setAttribute('aria-invalid', 'true');
      field.focus();
      return;
    }
    go(step + 1);
  }

  select.addEventListener('change', () => {
    service = SERV.find(item => item.slug === select.value);
    rate = undefined;
    clearError(0, select);
    updateRates();
    updateTicket();
  });
  rates.addEventListener('click', e => {
    const button = e.target.closest('[data-rate]');
    if (!button) return;
    rate = rate === button.dataset.rate ? undefined : button.dataset.rate;
    updateRates();
    updateTicket();
  });
  calendar.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (!button || button.disabled) return;
    if ('month' in button.dataset) {
      calendar.dataset.monthDirection = Number(button.dataset.month) < 0 ? 'back' : 'forward';
      month = new Date(month.getFullYear(), month.getMonth() + Number(button.dataset.month), 1);
      renderCalendar();
      const replacement = $(`[data-month="${button.dataset.month}"]`, calendar);
      (replacement.disabled ? $('.day:not(:disabled)', calendar) : replacement)?.focus();
    } else {
      date = new Date(Number(button.dataset.d));
      $$('.day', calendar).forEach(day => day.setAttribute('aria-pressed', day === button));
      errors[1].textContent = '';
      updateTicket();
    }
  });
  times.addEventListener('click', e => {
    const button = e.target.closest('[data-v]');
    if (!button) return;
    time = button.dataset.v;
    $$('.opt', times).forEach(item => item.setAttribute('aria-pressed', item === button));
    updateTicket();
  });
  name.addEventListener('input', () => clearError(2, name));
  name.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) advance(); });
  $('#lookx', desk).addEventListener('click', () => {
    look = undefined;
    updateLook();
    if (step === 3) review();
    $('h3', panels[step]).focus({ preventScroll: true });
  });
  $$('[data-next]', desk).forEach(button => button.addEventListener('click', advance));
  $$('[data-prev]', desk).forEach(button => button.addEventListener('click', () => go(step - 1)));
  renderCalendar();
  updateRates();
  updateTicket();
  updateLook();
  desk.hidden = false;
})();

/* Cards and editorial content animate only when seen. There is no hidden pre-reveal state. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!window.IntersectionObserver || !Element.prototype.animate) return;
  const cards = '.sc,.card,.signature__card,.sit,.tile,.why-card,.guide-card,.pcard,.appointment__panel,.appointment__ticket';
  const content = [
    '.rvx,.head > *,.sec .sh > *,.signature__heading > div > *,.signature__heading > p,.fd-body > *',
    '.appointment__intro > *,.appointment__support,.atelier-index a,.home-menu__list li',
    '.signature__link,.studio .editorial-link,.footer-grid > *,.footer-bottom'
  ].join(',');
  const targets = $$(`${cards},${content}`).filter(target => !target.closest('.sph,.sdh'));
  const active = new Map();
  const hidden = '[hidden],.hide';
  const observer = new IntersectionObserver(entries => {
    let count = 0;
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting || target.closest(hidden) || motion.matches) continue;
      observer.unobserve(target);
      if (target.contains(document.activeElement)) continue;
      const card = target.matches(cards);
      const animation = target.animate([
        { opacity: card ? .42 : .60, translate: `0 ${card ? 24 : 12}px` },
        { opacity: 1, translate: '0 0' }
      ], {
        id: card ? 'atelier-card' : 'atelier-content',
        duration: card ? 620 : 490,
        delay: Math.min(count++, 4) * 46,
        easing: 'cubic-bezier(.2,.72,.22,1)',
        fill: 'backwards'
      });
      active.set(target, animation);
      const done = () => { if (active.get(target) === animation) active.delete(target); };
      animation.finished.then(done, done);
    }
  }, { threshold: .08 });

  // Filtering can bring previously seen cards back into view. Do not animate the cards that stay put.
  const filtered = new MutationObserver(changes => {
    for (const { target, attributeName, oldValue } of changes) {
      if (!target.matches('.sc,.tile')) continue;
      const wasHidden = attributeName === 'hidden' ? oldValue !== null : oldValue?.split(/\s+/).includes('hide');
      const isHidden = target.closest(hidden);
      if (isHidden) active.get(target)?.cancel();
      else if (wasHidden) observer.observe(target);
    }
  });
  const sync = () => {
    observer.disconnect();
    filtered.disconnect();
    if (motion.matches) active.forEach(animation => animation.cancel());
    else {
      targets.forEach(target => observer.observe(target));
      for (const grid of $$('#mason,#sl')) {
        filtered.observe(grid, { subtree: true, attributes: true, attributeFilter: ['hidden','class'], attributeOldValue: true });
      }
    }
  };
  // Tab or click focus should never land on a card that is still entering.
  document.addEventListener('focusin', ({ target }) => {
    active.forEach((animation, element) => { if (element.contains(target)) animation.cancel(); });
  });
  motion.addEventListener('change', sync);
  sync();
})();

/* One-shot reveals by photo role. Images remain visible without JS or motion. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !window.IntersectionObserver || !Element.prototype.animate) return;
  const treatments = [
    ['.signature__image img', 'signature', 760, [{ clipPath: 'inset(0 0 83% 0)', transform: 'scale(1.06)' }, { clipPath: 'inset(0)', transform: 'scale(1)' }]],
    ['.tile img', 'portfolio', 610, [{ opacity: .25, transform: 'scale(.965)' }, { opacity: 1, transform: 'scale(1)' }]],
    ['.portrait, .arch img', 'portrait', 840, [{ opacity: .5, clipPath: 'inset(10% 6% 8% 6% round 42% 42% 3px 3px)', transform: 'scale(1.035)' }, { opacity: 1, clipPath: 'inset(0 round 0)', transform: 'scale(1)' }]],
    ['.sit img', 'studio', 650, [{ opacity: .22, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }]],
    ['.sdi .fr img', 'service', 790, [{ clipPath: 'inset(0 62% 0 0)', filter: 'brightness(1.28)' }, { clipPath: 'inset(0)', filter: 'brightness(1)' }]],
    ['.sci img', 'catalogue', 560, [{ opacity: .42, transform: 'scale(1.085)' }, { opacity: 1, transform: 'scale(1)' }]]
  ];
  const images = new WeakMap();
  const active = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const image = entry.target;
      if (!entry.isIntersecting) continue;
      observer.unobserve(image);
      const { kind, duration, frames, delay } = images.get(image);
      const play = () => {
        if (motion.matches || !image.naturalWidth || image.closest('[hidden], .hide')) return;
        const rect = image.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= innerHeight) return;
        const animation = image.animate(frames, { duration, delay, easing: 'cubic-bezier(.22,.65,.22,1)', fill: 'backwards' });
        image.dataset.photoMotion = kind;
        active.add(animation);
        animation.finished.then(() => active.delete(animation), () => active.delete(animation));
      };
      if (image.decode) image.decode().then(play, () => {});
      else if (image.complete) play();
      else image.addEventListener('load', play, { once: true });
    }
  }, { threshold: .12 });
  motion.addEventListener('change', () => { if (motion.matches) active.forEach(animation => animation.cancel()); });
  for (const [selector, kind, duration, frames] of treatments) {
    $$(selector).forEach((image, index) => {
      images.set(image, { kind, duration, frames, delay: index % 3 * 58 });
      observer.observe(image);
    });
  }

  // Stop the continuous hero motion after the artwork leaves the viewport.
  const artwork = $('.hero-edit');
  if (artwork) {
    const floatObserver = new IntersectionObserver(([entry]) => artwork.toggleAttribute('data-offscreen', !entry.isIntersecting));
    floatObserver.observe(artwork);
  }
})();
