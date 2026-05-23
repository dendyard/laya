import { getArticle } from '../api/content.js'
import { createAppHeader } from '../components/AppHeader.js'

export async function renderHomeView(container, { onNavigate }) {
  const article = await getArticle('tato-dayak')

  container.innerHTML = ''
  container.appendChild(createAppHeader({ onBack: () => {} }))

  const main = document.createElement('main')
  main.className = 'original-index-page'
  main.innerHTML = `
    <section class="original-index-hero">
      <img class="original-index-hero__image" src="${article.heroImage}" alt="${article.title}" />
      <img class="original-index-hero__logo" src="/assets/logo-laya.png" alt="Laya" />
      <div class="original-index-hero__content">
        <h2>Tato Dayak:<br />Suara Penjaga Tradisi</h2>
        <p>Dalam budaya Dayak, setiap tato menyimpan cerita tentang keberanian, status sosial, hingga hubungan manusia dengan alam dan roh</p>
        <a href="#" data-goto="view-detail">Baca sekarang</a>
      </div>
    </section>
    <section class="original-index-latest">
      <h2>Terbaru</h2>
      <div class="original-grid">
        <article class="original-card" data-goto="view-detail">
          <div class="original-card__media original-card__media--red">
            <span>Laya</span>
          </div>
          <h3>Bagian 1: Mengenal Pak Ding</h3>
          <p>${article.category}</p>
        </article>
      </div>
    </section>
  `

  main.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      onNavigate(el.dataset.goto)
    })
  })

  container.appendChild(main)
  return { article }
}
