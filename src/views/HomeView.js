import { getHeroBanners } from '../api/content.js'
import { createAppHeader } from '../components/AppHeader.js'

export async function renderHomeView(container, { onNavigate }) {
  const banners = await getHeroBanners()
  const hero    = banners[0] || null

  container.innerHTML = ''
  container.appendChild(createAppHeader({ onBack: () => {} }))

  const main = document.createElement('main')
  main.className = 'original-index-page'

  const heroImage       = hero?.imageUrl    || '/assets/tato-dayak1.png'
  const heroTitle       = hero?.title       || ''
  const heroDescription = hero?.description || ''
  const seriesId        = hero?.seriesId    || 1

  // Card per banner (section "Terbaru")
  const cardItems = banners.map(b => `
    <article class="original-card"
             data-goto="view-detail"
             data-series="${b.seriesId}">
      <div class="original-card__media">
        <img src="${b.imageUrl}" alt="${b.title}" />
      </div>
      <h3>${b.title}</h3>
      <p>${b.seriesTitle || ''}</p>
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
