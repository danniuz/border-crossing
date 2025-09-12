/**
 * @param {Object} params
 * @param {boolean} params.start
 */
export function initMarquee(params) {
    const marqueeText = document.getElementById("marquee-text");
    const controlActiveClass = 'marquee__controls-action--active';

    if (!marqueeText) return;

    // tripple elements
    const items = Array.from(marqueeText.children);

    items.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeText.appendChild(clone);
    });

    items.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeText.appendChild(clone);
    });

    let posX = 0;
    // speed in px per frame
    const speed = 0.6;

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
        posX -= speed;

        const scrollWidth = marqueeText.scrollWidth / 2;

        if (-posX >= scrollWidth) {
            posX = 0;
        }

        marqueeText.style.transform = `translateY(-50%) translateX(${posX}px)`;

        req = requestAnimationFrame(animate);
    }
}