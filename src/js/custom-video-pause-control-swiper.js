// // custom-video-pause-control-swiper.js
//
// export function initCustomVideoPauseControlSwiper(wrapperSelector, videoSelector, buttonSelector) {
//   const wrapper = document.querySelector(wrapperSelector);
//   if (!wrapper) return;
//
//   let swiperInstance = null;
//
//   // Пытаемся найти swiper-инстанс
//   const swiperEl = wrapper.querySelector('.swiper');
//   if (swiperEl?.swiper) {
//     swiperInstance = swiperEl.swiper;
//   }
//
//   function attachControlsToActiveSlide() {
//     const activeSlide = wrapper.querySelector('.swiper-slide-active');
//     if (!activeSlide) return;
//
//     const video = activeSlide.querySelector(videoSelector);
//     const btn   = activeSlide.querySelector(buttonSelector);
//
//     if (!video || !btn) return;
//
//     // снимаем старые слушатели (защита от дублирования)
//     btn.removeEventListener('click', togglePlay);
//     video.removeEventListener('play',  updateState);
//     video.removeEventListener('pause', updateState);
//     video.removeEventListener('ended', updateState);
//
//     function togglePlay() {
//       if (video.paused || video.ended) {
//         video.play().catch(() => {});
//       } else {
//         video.pause();
//       }
//     }
//
//     function updateState() {
//       btn.setAttribute('aria-label', video.paused || video.ended ? 'Play' : 'Pause');
//     }
//
//     btn.addEventListener('click', togglePlay);
//     video.addEventListener('play',  updateState);
//     video.addEventListener('pause', updateState);
//     video.addEventListener('ended', updateState);
//
//     // сразу синхронизируем
//     updateState();
//   }
//
//   // Первый запуск
//   setTimeout(attachControlsToActiveSlide, 100);
//
//   // Подписываемся на смену слайда
//   if (swiperInstance) {
//     swiperInstance.on('slideChangeTransitionEnd', attachControlsToActiveSlide);
//     swiperInstance.on('slideChange', attachControlsToActiveSlide); // на всякий случай
//   }
// }

export function initCustomVideoPauseControlSwiper(wrapperSelector, videoSelector, buttonSelector) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const swiperEl = wrapper.querySelector('.swiper');
  const swiper = swiperEl?.swiper;

  function attachToButton(btn, video) {
    if (btn.dataset.pauseControlAttached === 'true') return;

    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const updateAria = () => {
      const isPaused = video.paused || video.ended;
      btn.setAttribute('aria-label', isPaused ? 'Play' : 'Pause');

      const playIcon  = btn.querySelector('.play-icon');
      const stopIcon  = btn.querySelector('.stop-icon');
      if (playIcon && stopIcon) {
        playIcon.style.display  = isPaused ? '' : 'none';
        stopIcon.style.display  = isPaused ? 'none' : '';
      }
    };

    btn.removeEventListener('click', togglePlay);
    video.removeEventListener('play',  updateAria);
    video.removeEventListener('pause', updateAria);
    video.removeEventListener('ended', updateAria);

    btn.addEventListener('click', togglePlay);
    video.addEventListener('play',  updateAria);
    video.addEventListener('pause', updateAria);
    video.addEventListener('ended', updateAria);

    btn.dataset.pauseControlAttached = 'true';

    updateAria();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          const btn = node.matches(buttonSelector) ? node : node.querySelector(buttonSelector);
          const video = node.matches(videoSelector) ? node : node.querySelector(videoSelector);
          if (btn && video) {
            attachToButton(btn, video);
          }
        });
      }
    });
  });

  observer.observe(wrapper, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    const btn   = wrapper.querySelector(buttonSelector);
    const video = wrapper.querySelector(videoSelector);
    if (btn && video) {
      attachToButton(btn, video);
    }
  }, 100);

  if (swiper) {
    const debouncedAttach = debounce(() => {
      const activeSlide = wrapper.querySelector('.swiper-slide-active, .swiper-slide-duplicate-active');
      if (!activeSlide) return;
      const btn   = activeSlide.querySelector(buttonSelector);
      const video = activeSlide.querySelector(videoSelector);
      if (btn && video) {
        attachToButton(btn, video);
      }
    }, 80);

    swiper.on('slideChangeTransitionEnd', debouncedAttach);
    swiper.on('init', debouncedAttach);
  }

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
}