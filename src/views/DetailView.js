import { getArticle, getEpisodes } from '../api/content.js'
import { createAppHeader } from '../components/AppHeader.js'
import { initPremiumBlocker, openBlocker } from '../components/PremiumBlocker.js'

export async function renderDetailView(container, { seriesId = 1, onNavigate, onBack }) {
  const [article, episodes] = await Promise.all([
    getArticle(seriesId),
    getEpisodes(seriesId),
  ])

  // Episode pertama yang tidak terkunci = yang dibuka saat "Mulai membaca"
  const currentEp = episodes.find(ep => !ep.isLocked) || episodes[0]

  container.innerHTML = ''
  container.appendChild(createAppHeader({ onBack }))

  const main = document.createElement('main')
  main.className = 'page-shell original-detail-page'

  const episodeItems = episodes.map(ep => `
    <article
      class="${ep.isCurrent ? 'is-current' : ''} ${ep.isLocked ? 'is-locked' : ''}"
      data-episode-id="${ep.id}"
      ${!ep.isLocked ? `data-goto="view-reader" data-series="${article.id}" data-ep="${ep.id}"` : ''}>
      <span>${ep.number}</span>
      <div>
        <h2>${ep.title}</h2>
        <time>${ep.date || ''}</time>
      </div>
      ${ep.isLocked ? '<i aria-hidden="true"></i>' : ''}
    </article>
  `).join('')

  main.innerHTML = `
    <section class="original-hero-index">
      <div class="original-hero-index__media">
        <img id="originalHeroImage" src="${article.heroImage}" alt="${article.title}" />
        <div class="original-hero-index__content">
          <h1>${article.title}</h1>
          <p id="originalHeroPart">${article.subtitle}</p>
          <a href="#" data-goto="view-reader" data-series="${article.id}" data-ep="${currentEp.id}">Mulai membaca</a>
        </div>
      </div>
    </section>
    <nav class="original-tabs" aria-label="Navigasi Orisinal">
      <a class="is-active" href="#" data-original-tab="parts">Bagian</a>
      <a href="#" data-original-tab="description">Deskripsi</a>
    </nav>
    <section class="original-description-panel" aria-label="Deskripsi">
      <h2>${article.title}</h2>
      <p>${article.description}</p>
    </section>
    <section class="original-episode-list" aria-label="Daftar bagian">
      ${episodeItems}
    </section>
    <div class="premium-blocker" aria-hidden="true">
      <button class="premium-blocker__backdrop" type="button" aria-label="Tutup"></button>
      <section class="premium-blocker__sheet" role="dialog" aria-modal="true" aria-labelledby="premiumBlockerTitle">
        <button class="premium-blocker__close" type="button" aria-label="Tutup">
          <svg viewBox="0 0 256 256" aria-hidden="true"><path d="M72 72l112 112M184 72 72 184"/></svg>
        </button>
        <span>Khusus Member</span>
        <h2 id="premiumBlockerTitle">Konten Premium</h2>
        <p>Gabung Membership KOMPAS.com+ MAX untuk mengakses konten premium ini.</p>
        <a href="#">Gabung KOMPAS.com+ MAX</a>
      </section>
    </div>
  `

  // Tabs
  main.querySelectorAll('[data-original-tab]').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault()
      main.querySelectorAll('[data-original-tab]').forEach(t => t.classList.remove('is-active'))
      tab.classList.add('is-active')
      main.classList.toggle('is-description-mode', tab.dataset.originalTab === 'description')
    })
  })

  // Navigation data-goto ditangani oleh global handler di main.js

  // Premium blocker
  initPremiumBlocker(main.querySelector('.premium-blocker'))
  main.querySelectorAll('.original-episode-list .is-locked').forEach(ep => {
    ep.addEventListener('click', openBlocker)
  })

  container.appendChild(main)
  return { article, episodes }
}
