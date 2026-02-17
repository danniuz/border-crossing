export function initCustomVideoPauseControlSwiper(
  wrapperSelector,
  videoSelector,
  playPauseButtonSelector,
  muteButtonSelector //optional
) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const swiperEl = wrapper.querySelector('.swiper');
  const swiper = swiperEl?.swiper;

  function attachControls(playBtn, muteBtn, video) {
    if (playBtn.dataset.pauseControlAttached === 'true') return;
    if (muteBtn && muteBtn.dataset.muteControlAttached === 'true') return;

    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const updatePlayState = () => {
      const isPaused = video.paused || video.ended;
      playBtn.setAttribute('aria-label', isPaused ? 'Play' : 'Pause');

      const playIcon = playBtn.querySelector('.play-icon');
      const stopIcon = playBtn.querySelector('.stop-icon');
      if (playIcon && stopIcon) {
        playIcon.style.display = isPaused ? '' : 'none';
        stopIcon.style.display = isPaused ? 'none' : '';
      }
    };

    let toggleMute = null;
    let updateMuteState = null;

    if (muteBtn) {
      toggleMute = () => {
        video.muted = !video.muted;
        updateMuteState();
      };

      updateMuteState = () => {
        if (!muteBtn) return;

        const isMuted = video.muted;
        muteBtn.setAttribute('aria-label', isMuted ? 'Mute' : 'Unmute');
      };
    }

    playBtn.removeEventListener('click', togglePlay);
    video.removeEventListener('play', updatePlayState);
    video.removeEventListener('pause', updatePlayState);
    video.removeEventListener('ended', updatePlayState);

    if (muteBtn) {
      muteBtn.removeEventListener('click', toggleMute);
      video.removeEventListener('volumechange', updateMuteState);
    }

    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('ended', updatePlayState);

    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
      video.addEventListener('volumechange', updateMuteState);
      updateMuteState();
    }

    playBtn.dataset.pauseControlAttached = 'true';
    if (muteBtn) muteBtn.dataset.muteControlAttached = 'true';

    updatePlayState();
  }

  const tryAttachInActiveSlide = () => {
    const activeSlide = wrapper.querySelector(
      '.swiper-slide-active, .swiper-slide-duplicate-active'
    );
    if (!activeSlide) return;

    const video = activeSlide.querySelector(videoSelector);
    if (!video) return;

    const playBtn = activeSlide.querySelector(playPauseButtonSelector);
    const muteBtn = muteButtonSelector
      ? activeSlide.querySelector(muteButtonSelector)
      : null;

    if (playBtn) {
      attachControls(playBtn, muteBtn, video);
    }
  };

  const observer = new MutationObserver(tryAttachInActiveSlide);
  observer.observe(wrapper, { childList: true, subtree: true });

  setTimeout(tryAttachInActiveSlide, 80);

  if (swiper) {
    const debounced = debounce(tryAttachInActiveSlide, 60);
    swiper.on('slideChangeTransitionEnd', debounced);
    swiper.on('init', () => setTimeout(debounced, 120));
  }

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
}
