let overlay = null
let viewReader = null
let minReady = false
let videoPending = false
let minTimer = null
let fallbackTimer = null

export function initReaderIntro(overlayEl, viewReaderEl) {
  overlay = overlayEl
  viewReader = viewReaderEl
}

export function showIntro() {
  minReady = false
  videoPending = false
  if (minTimer) clearTimeout(minTimer)
  if (fallbackTimer) clearTimeout(fallbackTimer)
  overlay?.classList.remove('is-hidden')
  viewReader?.classList.remove('reader-revealed')

  minTimer = setTimeout(() => {
    minReady = true
    if (videoPending) dismissIntro()
  }, 1500)

  fallbackTimer = setTimeout(() => {
    minReady = true
    dismissIntro()
  }, 8000)
}

export function dismissIntro() {
  if (!minReady) { videoPending = true; return }
  if (!overlay || overlay.classList.contains('is-hidden')) return
  overlay.classList.add('is-hidden')
  viewReader?.classList.add('reader-revealed')
  if (minTimer) clearTimeout(minTimer)
  if (fallbackTimer) clearTimeout(fallbackTimer)
}
