import { getHeroBanners, getLatestEpisodes } from '../api/content.js'
import { createAppHeader } from '../components/AppHeader.js'

export async function renderHomeView(container, { onNavigate }) {
  const [banners, latestEpisodes] = await Promise.all([
    getHeroBanners(),
    getLatestEpisodes(5),
  ])
  const hero = banners[0] || null

  container.innerHTML = ''
  container.appendChild(createAppHeader({ onBack: () => {} }))

  const main = document.createElement('main')
  main.className = 'original-index-page'

  const heroImage       = hero?.imageUrl    || '/assets/tato-dayak1.png'
  const heroTitle       = hero?.title       || ''
  const heroDescription = hero?.description || ''
  const seriesId        = hero?.seriesId    || 1

  // Card per latest episode (section "Terbaru")
  const cardItems = latestEpisodes.map(ep => `
    <article class="original-card"
             data-goto="view-reader"
             data-series="${ep.seriesId}"
             data-ep="${ep.id}">
      <div class="original-card__media">
        <img src="${ep.thumbnail}" alt="${ep.title}" />
      </div>
      <h3>${ep.title}</h3>
      <p>${ep.seriesTitle || ''}</p>
      <time>${ep.publishDate || ''}</time>
    </article>
  `).join('')

  main.innerHTML = `
    <section class="original-index-hero">
      <img class="original-index-hero__image" src="${heroImage}" alt="${heroTitle}" />
      <img class="original-index-hero__logo" src="/assets/logo-laya.png" alt="Laya" />
      <div class="original-index-hero__content">
        <h2>${heroTitle}</h2>
        ${heroDescription ? `<p>${heroDescription}</p>` : ''}
        <a href="#" data-goto="view-detail" data-series="${seriesId}">Baca sekarang</a>
      </div>
    </section>
    <section class="original-index-latest">
      <h2>Terbaru</h2>
      <div class="original-grid">
        ${cardItems}
      </div>
    </section>
  `

  // Navigation data-goto ditangani oleh global handler di main.js

  container.appendChild(main)
  return { banners }
}
