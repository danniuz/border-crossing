/**
 * @param {Object} params
 * @param {boolean} params.start
 */
export function initMarquee(params) {
  const marqueeText = document.getElementById('marquee-text');
  const controlActiveClass = 'marquee__controls-action--active';

  if (!marqueeText) return;

  // tripple elements
  const items = Array.from(marqueeText.children);

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    marqueeText.appendChild(clone);
  });

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    marqueeText.appendChild(clone);
  });

  // speed in px per frame
  const speed = 0.6;
  const scrollWidth = marqueeText.scrollWidth / 2;

  const isLTR = document.documentElement.dir === 'ltr';

  // Initialize position based on direction
  // For LTR: start from negative position so content comes from left
  // For RTL: start from 0, content moves left
  let posX = isLTR ? -scrollWidth : 0;

  let req = null;

  const marqueeStart = document.getElementById('marqueeStart');
  const marqueeStop = document.getElementById('marqueeStop');

  marqueeStart.addEventListener('click', () => {
    if (!req) {
      animate();
      marqueeStop.classList.add(controlActiveClass);
      marqueeStart.classList.remove(controlActiveClass);
    }
  });

  marqueeStop.addEventListener('click', () => {
    if (req) {
      cancelAnimationFrame(req);
      marqueeStart.classList.add(controlActiveClass);
      marqueeStop.classList.remove(controlActiveClass);
      req = null;
    }
  });

  if (params.start) {
    animate();
    marqueeStop.classList.add(controlActiveClass);
  } else {
    marqueeStart.classList.add(controlActiveClass);
  }

  function animate() {
    if (isLTR) {
      // Move from left to right
      posX += speed;
      // When we've moved one full width (from -scrollWidth to scrollWidth), reset for seamless loop
      if (posX >= scrollWidth) {
        posX = -scrollWidth;
      }
    } else {
      // Move from right to left (default RTL behavior)
      posX -= speed;
      // When we've moved one full width, reset to 0 for seamless loop
      if (-posX >= scrollWidth) {
        posX = 0;
      }
    }

    marqueeText.style.transform = `translateY(-50%) translateX(${posX}px)`;

    req = requestAnimationFrame(animate);
  }
}
