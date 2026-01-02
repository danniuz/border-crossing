export function initHomeStrictTopVideoAnimation() {
    const { gsap } = window;
    
    const homeStrictTopVideo = document.getElementById('home-strict-top-video-to-animate');
    const homeStrictTopVideoWrapper = document.getElementById('home-strict-top-video-wrapper');
    const homeStrictTopTextWrapper = document.getElementById('home-strict-top-text-wrapper');
    const homeStrictTopMenuActions = document.getElementById('home-strict-top-menu-actions');

    if (!homeStrictTopVideoWrapper) {
        return;
    }

    let isAnimating = false;

    homeStrictTopVideoWrapper.addEventListener('click', () => {
        if (isAnimating) {
            return;
        }

        isAnimating = true;


        gsap.to(homeStrictTopVideo, {
            width: '100vw',
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                homeStrictTopVideoWrapper.classList.add('home__strict-top-video-wrapper--animated');

                homeStrictTopVideo.classList.add('home__strict-top-video--animated');
                    gsap.to(homeStrictTopVideo, {
                        height: '100%',
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            isAnimating = false;

                            gsap.to(homeStrictTopMenuActions, {
                                opacity: 1,
                                transform: 'translateY(0)',
                                duration: 1,
                                ease: 'power2.inOut',
                            });

                            gsap.to(homeStrictTopTextWrapper, {
                                opacity: 1,
                                duration: 1,
                                translateY: '-50px',
                                ease: 'power2.inOut',
                            });

                        }
                    });
            }
        });
    });
}

