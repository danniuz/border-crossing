export function initMarquee() {
    const marqueeText = document.getElementById("marquee-text");
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
    const speed = 0.5;

    function animate() {
        posX -= speed;

        const scrollWidth = marqueeText.scrollWidth / 2;

        if (-posX >= scrollWidth) {
            posX = 0;
        }

        marqueeText.style.transform = `translateY(-50%) translateX(${posX}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}