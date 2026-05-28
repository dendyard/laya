import { getHeroBanners, getLatestEpisodes } from '../api/content.js'
import { createAppHeader } from '../components/AppHeader.js'

export async function renderHomeView(container, { onNavigate }) {
  const [banners, latestEpisodes] = await Promise.all([
    getHeroBanners(),
    getLatestEpisodes(5),
  ])

  container.innerHTML = ''
  container.appendChild(createAppHeader({ onBack: () => {} }))

  const main = document.createElement('main')
  main.className = 'original-index-page'

  // Card per latest episode (section "Terbaru")
  const cardItems = latestEpisodes.map(ep => {
    const title = ep.title && ep.title.length > 40
      ? ep.title.slice(0, 40) + '…'
      : (ep.title || '')
    return `
    <article class="original-card"
             data-goto="view-reader"
             data-series="${ep.seriesId}"
             data-ep="${ep.id}">
      <div class="original-card__media">
        <img src="${ep.thumbnail}" alt="${ep.title}" />
      </div>
      ${ep.number ? `<div class="original-card__ep-badge">Episode ${ep.number}</div>` : ''}
      <h3>${title}</h3>
      <p>${ep.seriesTitle || ''}</p>
      <time>${ep.publishDate || ''}</time>
    </article>
  `
  }).join('')

  // ── Hero: single vs slider ────────────────────────────────
  const heroHTML = banners.length <= 1
    ? buildSingleHero(banners[0])
    : buildSliderHero(banners)

  main.innerHTML = `
    ${heroHTML}
    <section class="original-index-latest">
      <h2>Terbaru</h2>
      <div class="original-grid">
        ${cardItems}
      </div>
    </section>
  `

  container.appendChild(main)

  // Init slider jika lebih dari 1 banner
  if (banners.length > 1) initHeroSlider(main, banners)

  return { banners }
}

// ── Single hero (banner tunggal) ──────────────────────────────
function buildSingleHero(banner) {
  const img   = banner?.imageUrl    || '/assets/tato-dayak1.png'
  const title = banner?.title       || ''
  const desc  = banner?.description || ''
  const sid   = banner?.seriesId    || 1
  return `
    <section class="original-index-hero">
      <img class="original-index-hero__image" src="${img}" alt="${title}" />
      <img class="original-index-hero__logo" src="/assets/logo-laya.png" alt="Laya" />
      <div class="original-index-hero__content">
        <h2>${title}</h2>
        ${desc ? `<p>${desc}</p>` : ''}
        <a href="#" data-goto="view-detail" data-series="${sid}">Baca sekarang</a>
      </div>
    </section>
  `
}

// ── Slider hero (lebih dari 1 banner) ────────────────────────
function buildSliderHero(banners) {
  const slides = banners.map((b, i) => `
    <div class="hero-slider__item" data-index="${i}">
      <img class="original-index-hero__image" src="${b.imageUrl || '/assets/tato-dayak1.png'}" alt="${b.title || ''}" />
      <div class="original-index-hero__content">
        <h2>${b.title || ''}</h2>
        ${b.description ? `<p>${b.description}</p>` : ''}
        <a href="#" data-goto="view-detail" data-series="${b.seriesId || 1}">Baca sekarang</a>
      </div>
    </div>
  `).join('')

  const dots = banners.map((_, i) => `
    <button class="hero-slider__dot ${i === 0 ? 'is-active' : ''}"
            data-dot="${i}" aria-label="Slide ${i + 1}"></button>
  `).join('')

  return `
    <section class="original-index-hero original-index-hero--slider">
      <img class="original-index-hero__logo" src="/assets/logo-laya.png" alt="Laya" />
      <div class="hero-slider__track">
        ${slides}
      </div>
      <div class="hero-slider__dots">${dots}</div>
    </section>
  `
}

// ── Slider logic ──────────────────────────────────────────────
function initHeroSlider(root, banners) {
  const section = root.querySelector('.original-index-hero--slider')
  if (!section) return

  const track   = section.querySelector('.hero-slider__track')
  const dots    = section.querySelectorAll('.hero-slider__dot')
  const total   = banners.length
  let current   = 0
  let timer     = null
  let userSwiped = false   // sekali user swipe → auto slide berhenti permanen

  // ── Go to slide ────────────────────────────────────────────
  function goTo(idx, animated = true) {
    current = (idx + total) % total
    track.style.transition = animated
      ? 'transform 480ms cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none'
    track.style.transform = `translateX(-${current * 100}%)`
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current))
  }

  // ── Auto slide ─────────────────────────────────────────────
  function startTimer() {
    stopTimer()
    timer = setInterval(() => goTo(current + 1), 4500)
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null }
  }

  // ── Dot clicks ─────────────────────────────────────────────
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.dot, 10))
      if (!userSwiped) startTimer()
    })
  })

  // ── Swipe / drag ───────────────────────────────────────────
  let touchStartX = 0
  let dragOffset  = 0
  const slideW    = () => track.offsetWidth

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX
    dragOffset  = 0
    // Hentikan auto slide saat user mulai swipe — permanen
    stopTimer()
    userSwiped = true
    // Matikan transisi saat drag
    track.style.transition = 'none'
  }, { passive: true })

  track.addEventListener('touchmove', e => {
    dragOffset = e.touches[0].clientX - touchStartX
    const base = -(current * slideW())
    track.style.transform = `translateX(${base + dragOffset}px)`
  }, { passive: true })

  track.addEventListener('touchend', () => {
    const threshold = slideW() * 0.25   // 25% lebar untuk trigger pindah slide
    if (dragOffset < -threshold) {
      goTo(current + 1)
    } else if (dragOffset > threshold) {
      goTo(current - 1)
    } else {
      goTo(current)   // snap kembali ke posisi semula
    }
    dragOffset = 0
  }, { passive: true })

  // ── Start ──────────────────────────────────────────────────
  startTimer()
}
