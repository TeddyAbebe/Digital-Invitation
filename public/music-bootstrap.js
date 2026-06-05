(function () {
  var audio = document.getElementById("graduation-music");
  if (!audio) return;

  var started = false;
  var lastScrollY = window.scrollY;

  audio.volume = 0.35;
  audio.loop = true;
  audio.muted = false;

  function markPlaying() {
    started = true;
    audio.muted = false;
    audio.dataset.playing = "1";
    removeGestureListeners();
    window.dispatchEvent(new CustomEvent("graduation-music:state"));
  }

  function tryPlay() {
    if (started) return;

    audio.muted = false;
    audio
      .play()
      .then(markPlaying)
      .catch(function () {});
  }

  function onScroll() {
    if (window.scrollY !== lastScrollY) {
      lastScrollY = window.scrollY;
      tryPlay();
    }
  }

  var bound = [];

  function addGestureListeners() {
    var pairs = [
      [window, "scroll", onScroll],
      [window, "wheel", tryPlay],
      [document, "touchstart", tryPlay],
      [document, "touchmove", tryPlay],
      [document, "pointerdown", tryPlay],
    ];

    pairs.forEach(function (pair) {
      var target = pair[0];
      var event = pair[1];
      var handler = pair[2];
      var opts = { passive: true, capture: true };
      target.addEventListener(event, handler, opts);
      bound.push([target, event, handler, opts]);
    });
  }

  function removeGestureListeners() {
    bound.forEach(function (entry) {
      entry[0].removeEventListener(entry[1], entry[2], entry[3]);
    });
    bound.length = 0;
  }

  audio.addEventListener("canplay", tryPlay);
  audio.addEventListener("canplaythrough", tryPlay);
  audio.addEventListener("playing", markPlaying);

  addGestureListeners();
  tryPlay();

  if (audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
    audio.load();
  }

  window.__graduationMusic = {
    audio: audio,
    tryPlay: tryPlay,
    isStarted: function () {
      return started;
    },
  };
})();
