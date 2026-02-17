/**
 * Marquee: seamless loop (2 copies)
 * LTR: left -> right
 * RTL: right -> left
 *
 * @param {Object} params
 * @param {boolean} params.start
 */
export function initMarquee(params = { start: true }) {
  const marqueeText = document.getElementById('marquee-text');
  if (!marqueeText) return;

  const marqueeStart = document.getElementById('marqueeStart');
  const marqueeStop = document.getElementById('marqueeStop');
  const controlActiveClass = 'marquee__controls-action--active';

  const dir = document.documentElement.getAttribute('dir') || 'ltr';
  const isLTR = dir.toLowerCase() === 'ltr';

  const speed = 0.6; // px per frame
  let req = null;

  let oneSetWidth = 0; // width of 1 copy
  let x = 0; // translateX, always kept in [-oneSetWidth, 0)

  // Build exactly 2 copies (original + clones) once
  if (!marqueeText.dataset.marqueeInited) {
    const items = Array.from(marqueeText.children);
    items.forEach((item) => marqueeText.appendChild(item.cloneNode(true)));
    marqueeText.dataset.marqueeInited = '1';
  }

  function apply() {
    marqueeText.style.transform = `translateY(-50%) translateX(${x}px)`;
  }

  function recalc({ keepProgress = true } = {}) {
    const newW = marqueeText.scrollWidth / 2;
    if (!newW || !Number.isFinite(newW)) return;

    if (!keepProgress || oneSetWidth === 0) {
      // Start position: show content immediately, not empty space
      // Keep it inside [-w, 0)
      x = -newW * 0.25; // можешь поменять 0.25 на 0.0 или 0.5 как нравится
    } else {
      // Preserve progress fraction when width changes (fonts/resize)
      const t = ((x % oneSetWidth) + oneSetWidth) % oneSetWidth; // [0..oldW)
      const ratio = t / oneSetWidth;
      x = -ratio * newW; // stays in [-newW, 0)
    }

    oneSetWidth = newW;
    normalize();
    apply();
  }

  function normalize() {
    if (!oneSetWidth) return;

    // Keep x in [-oneSetWidth, 0)
    if (x >= 0) x -= oneSetWidth;
    if (x < -oneSetWidth) x += oneSetWidth;
  }

  function tick() {
    if (!oneSetWidth) recalc({ keepProgress: false });

    // Only direction changes by sign
    x += isLTR ? speed : -speed;

    normalize();
    apply();

    req = requestAnimationFrame(tick);
  }

  function start() {
    if (req) return;
    req = requestAnimationFrame(tick);

    if (marqueeStop) marqueeStop.classList.add(controlActiveClass);
    if (marqueeStart) marqueeStart.classList.remove(controlActiveClass);
  }

  function stop() {
    if (!req) return;
    cancelAnimationFrame(req);
    req = null;

    if (marqueeStart) marqueeStart.classList.add(controlActiveClass);
    if (marqueeStop) marqueeStop.classList.remove(controlActiveClass);
  }

  if (marqueeStart) marqueeStart.addEventListener('click', start);
  if (marqueeStop) marqueeStop.addEventListener('click', stop);

  const onResize = () => recalc({ keepProgress: true });
  window.addEventListener('resize', onResize);

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => recalc({ keepProgress: false }));
  } else {
    setTimeout(() => recalc({ keepProgress: false }), 0);
  }

  recalc({ keepProgress: false });

  if (params.start) {
    start();
  } else {
    if (marqueeStart) marqueeStart.classList.add(controlActiveClass);
  }

  return () => {
    stop();
    window.removeEventListener('resize', onResize);
  };
}
