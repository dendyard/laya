export function createAppHeader({ onBack } = {}) {
  const header = document.createElement('header')
  header.className = 'app-header'
  header.innerHTML = `
    <a href="#" class="app-header__back" aria-label="Kembali">
      <img src="/assets/backarrow.svg" alt="" aria-hidden="true" />
    </a>
    <img src="/assets/kompaslogo_ori.png" alt="Kompas" class="app-header__logo" />
  `
  header.querySelector('.app-header__back')?.addEventListener('click', e => {
    e.preventDefault()
    onBack?.()
  })
  return header
}
