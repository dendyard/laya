const players = new Map()

export function initJXPlayer(slide, container, { onStart, onEnded } = {}) {
  if (typeof JX === 'undefined') return null

  const p = JX.player({
    accountid: '9262bf2590d558736cac4fff7978fcb1',
    container: container.id,
    customid: `vertikal-video-${container.id}`,
    autoplay: 'always',
    sound: 'off',
    headless: true,
    jsonld: false,
    cust_params: 'cf981644373527756b1379',
  })

  const videoId = parseInt(container.dataset.jxVideoId, 10)
  p.loadVideoById(videoId)

  p.addEventListener('video_start', () => {
    slide.classList.remove('is-video-loading')
    onStart?.()
  })

  p.addEventListener('ended', () => {
    try { p.loadVideoById(videoId) } catch { p.play() }
    onEnded?.()
  })

  setTimeout(() => slide.classList.remove('is-video-loading'), 5000)
  players.set(slide, p)
  return p
}

export function getPlayer(slide) { return players.get(slide) }
export function pausePlayer(slide) { try { players.get(slide)?.pause() } catch {} }
export function pauseAll() { players.forEach(p => { try { p.pause() } catch {} }) }
export function resumePlayer(slide) { try { players.get(slide)?.play() } catch {} }
