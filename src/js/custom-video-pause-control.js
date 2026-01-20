export function initCustomVideoPauseControl(videoSelectorWrapperSelector, videoSelector, stopButtonSelector) {
  const videoWrappers = document.querySelectorAll(videoSelectorWrapperSelector);

  if (!videoWrappers?.length) {
    return;
  }

  videoWrappers.forEach(videoWrapper => {
    addVideoPauseControl(videoWrapper, videoSelector, stopButtonSelector);
  });
}

function addVideoPauseControl(videoWrapper, videoSelector, stopButtonSelector) {
  const toggleBtn = videoWrapper.querySelector(stopButtonSelector);
  const video = videoWrapper.querySelector(videoSelector);

  if (!video || !toggleBtn) return;

  function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }

  function updateButtonState() {
    if (video.paused || video.ended) {
      toggleBtn.setAttribute('aria-label', 'Play');
    } else {
      toggleBtn.setAttribute('aria-label', 'Pause');
      // toggleBtn.textContent = 'Pause';
    }
  }

  function stopVideo() {
    video.pause();
    video.currentTime = 0;
    updateButtonState();
  }

  // one button for both play/pause
  toggleBtn.addEventListener('click', togglePlay);
  // Removed video click listener to prevent conflict with video wrapper animation
  // video.addEventListener('click', togglePlay);

  video.addEventListener('play', updateButtonState);
  video.addEventListener('pause', updateButtonState);
  video.addEventListener('ended', updateButtonState);

  updateButtonState();
}