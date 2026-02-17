export function initHomeStrictTopVideoAnimation() {
  const { gsap } = window;

  const homeStrictTopVideo = document.getElementById(
    'home-strict-top-video-to-animate'
  );
  const homeStrictTopVideoWrapper = document.getElementById(
    'home-strict-top-video-wrapper'
  );
  const homeStrictTopTextWrapper = document.getElementById(
    'home-strict-top-text-wrapper'
  );
  const homeStrictTopMenuActions = document.getElementById(
    'home-strict-top-menu-actions'
  );
  const videoStopButton = document.querySelector(
    '#home-strict-top-video-stop-button'
  );

  // if (videoStopButton) {
  //     videoStopButton.classList.add('');
  // }

  if (!homeStrictTopVideoWrapper) {
    return;
  }

  let isAnimating = false;

  //race click or 2.5sec delay
  Promise.race([
    new Promise((resolve) => {
      homeStrictTopVideoWrapper.addEventListener('click', () => {
        resolve();
      });
    }),
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ]).then(() => {
    if (isAnimating) {
      return;
    }

    isAnimating = true;

    gsap.to(homeStrictTopVideo, {
      width: '100vw',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        homeStrictTopVideoWrapper.classList.add(
          'home__strict-top-video-wrapper--animated'
        );

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
            gsap.to(videoStopButton, {
              opacity: 1,
              duration: 1,
              display: 'flex',
              ease: 'power2.inOut',
            });
          },
        });
      },
    });
  });
}
