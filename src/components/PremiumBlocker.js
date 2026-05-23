let blocker = null

export function initPremiumBlocker(el) {
  blocker = el
  el.querySelector('.premium-blocker__close')?.addEventListener('click', close)
  el.querySelector('.premium-blocker__backdrop')?.addEventListener('click', close)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && blocker?.classList.contains('is-open')) close()
  })
}

export function openBlocker() {
  blocker?.classList.add('is-open')
  blocker?.setAttribute('aria-hidden', 'false')
}

function close() {
  blocker?.classList.remove('is-open')
  blocker?.setAttribute('aria-hidden', 'true')
}
