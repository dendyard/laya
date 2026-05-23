let audio = null
let buttons = []

export function initMusicPlayer(audioEl) {
  audio = audioEl
  audio.addEventListener('play', () => setPlaying(true))
  audio.addEventListener('pause', () => setPlaying(false))
}

export function registerMusicButtons(btns) {
  buttons = Array.from(btns)
}

function setPlaying(playing) {
  buttons.forEach(btn => {
    btn.classList.toggle('is-playing', playing)
    btn.setAttribute('aria-label', playing ? 'Pause musik' : 'Play musik')
  })
}

export function playMusic() {
  if (!audio) return
  audio.currentTime = 0
  audio.play().catch(() => {})
}

export function pauseMusic() {
  audio?.pause()
}

export function toggleMusic() {
  if (!audio) return
  audio.paused ? audio.play().catch(() => {}) : audio.pause()
}
