import { getArticle } from '../api/content.js'

// ── Store badge SVGs ──────────────────────────────────────────────────────────

const APPLE_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
</svg>`

const PLAY_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.18 23.7c.38.21.82.22 1.22.03l13.4-7.73-2.84-2.85L3.18 23.7zM20.44 10.42l-2.95-1.7-3.19 3.19 3.19 3.19 2.96-1.71c.84-.48.84-1.49-.01-1.97zM2.01 1.05C1.99 1.17 2 1.3 2 1.43v21.14c0 .13.01.26.03.38l12-11.92L2.01 1.05zM4.4.27C4.01.06 3.56.07 3.18.3l12.78 11.71L18.8 9.17 4.4.27z"/>
</svg>`

// ── QR code placeholder (simple grid pattern) ─────────────────────────────────
function buildQRPlaceholder() {
  // Simple 7×7 finder-pattern approximation as SVG squares
  const size = 84
  const cell = 12
  // Use a simple appearance — real QR would link to app
  return `
    <svg viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg" style="width:84px;height:84px;">
      <!-- Top-left finder -->
      <rect x="0" y="0" width="24" height="24" rx="2" fill="#111"/>
      <rect x="3" y="3" width="18" height="18" rx="1" fill="#fff"/>
      <rect x="6" y="6" width="12" height="12" rx="1" fill="#111"/>
      <!-- Top-right finder -->
      <rect x="60" y="0" width="24" height="24" rx="2" fill="#111"/>
      <rect x="63" y="3" width="18" height="18" rx="1" fill="#fff"/>
      <rect x="66" y="6" width="12" height="12" rx="1" fill="#111"/>
      <!-- Bottom-left finder -->
      <rect x="0" y="60" width="24" height="24" rx="2" fill="#111"/>
      <rect x="3" y="63" width="18" height="18" rx="1" fill="#fff"/>
      <rect x="6" y="66" width="12" height="12" rx="1" fill="#111"/>
      <!-- Data cells (decorative) -->
      <rect x="30" y="0" width="6" height="6" fill="#111"/>
      <rect x="39" y="0" width="6" height="6" fill="#111"/>
      <rect x="48" y="0" width="6" height="6" fill="#111"/>
      <rect x="30" y="9" width="6" height="6" fill="#111"/>
      <rect x="48" y="9" width="6" height="6" fill="#111"/>
      <rect x="30" y="18" width="6" height="6" fill="#111"/>
      <rect x="39" y="18" width="6" height="6" fill="#111"/>
      <rect x="0" y="30" width="6" height="6" fill="#111"/>
      <rect x="9" y="30" width="6" height="6" fill="#111"/>
      <rect x="18" y="30" width="6" height="6" fill="#111"/>
      <rect x="30" y="30" width="6" height="6" fill="#111"/>
      <rect x="48" y="30" width="6" height="6" fill="#111"/>
      <rect x="60" y="30" width="6" height="6" fill="#111"/>
      <rect x="78" y="30" width="6" height="6" fill="#111"/>
      <rect x="0" y="39" width="6" height="6" fill="#111"/>
      <rect x="18" y="39" width="6" height="6" fill="#111"/>
      <rect x="39" y="39" width="6" height="6" fill="#111"/>
      <rect x="69" y="39" width="6" height="6" fill="#111"/>
      <rect x="78" y="39" width="6" height="6" fill="#111"/>
      <rect x="9" y="48" width="6" height="6" fill="#111"/>
      <rect x="30" y="48" width="6" height="6" fill="#111"/>
      <rect x="48" y="48" width="6" height="6" fill="#111"/>
      <rect x="60" y="48" width="6" height="6" fill="#111"/>
      <rect x="30" y="60" width="6" height="6" fill="#111"/>
      <rect x="48" y="60" width="6" height="6" fill="#111"/>
      <rect x="60" y="60" width="6" height="6" fill="#111"/>
      <rect x="78" y="60" width="6" height="6" fill="#111"/>
      <rect x="30" y="69" width="6" height="6" fill="#111"/>
      <rect x="39" y="69" width="6" height="6" fill="#111"/>
      <rect x="69" y="69" width="6" height="6" fill="#111"/>
      <rect x="30" y="78" width="6" height="6" fill="#111"/>
      <rect x="48" y="78" width="6" height="6" fill="#111"/>
      <rect x="60" y="78" width="6" height="6" fill="#111"/>
      <rect x="78" y="78" width="6" height="6" fill="#111"/>
    </svg>`
}

// ── Main render ───────────────────────────────────────────────────────────────

export async function renderLandingView(el, { seriesId } = {}) {
  // Fetch series info (fallback to defaults if unavailable)
  let article = null
  if (seriesId) {
    try { article = await getArticle(seriesId) } catch (_) { /* ignore */ }
  }

  const heroImage   = article?.heroImage  || '/assets/tato-dayak1.png'
  const seriesTitle = article?.title      || 'Laya Langkah Budaya'
  const description = article?.description || 'Konten budaya Indonesia yang mendalam — hanya tersedia di aplikasi KOMPAS.com.'

  el.className = 'landing-root'
  el.innerHTML = `
    <!-- ================================================
         MOBILE LAYOUT
    ================================================ -->

    <!-- Topbar (mobile only) -->
    <header class="landing-topbar" aria-label="Kompas.com">
      <div class="landing-topbar__inner">
        <a class="landing-topbar__logo" href="https://www.kompas.com" aria-label="Kompas.com" target="_blank" rel="noopener">
          <img src="/assets/logogram-kompascom.svg" alt="Kompas.com" />
        </a>
        <div class="landing-topbar__actions">
          <button class="landing-topbar__icon" aria-label="Akun">
            <svg viewBox="0 0 256 256" aria-hidden="true">
              <circle cx="128" cy="128" r="96" stroke-width="18"/>
              <circle cx="128" cy="104" r="32" stroke-width="18"/>
              <path d="M72 198c14-33 43-46 56-46s42 13 56 46" stroke-width="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Page content (mobile) -->
    <main class="landing-page">

      <!-- Hero -->
      <section class="landing-hero">
        <img class="landing-hero__image" src="${heroImage}" alt="${seriesTitle}" />
        <div class="landing-hero__shade" aria-hidden="true"></div>
        <img class="landing-hero__logo" src="/assets/logo-laya.png" alt="Laya Langkah Budaya Merawat Indonesia" />
        <div class="landing-hero__content">
          <h1>${seriesTitle}</h1>
          <p>${description}</p>
        </div>
      </section>

      <!-- App card -->
      <section class="landing-app-card" aria-label="Konten khusus di aplikasi">
        <div class="landing-app-card__icon">
          <img src="/assets/kompas-triangle.png" alt="" aria-hidden="true" />
        </div>
        <h2>Konten khusus di aplikasi</h2>
        <p>Artikel ini ada di aplikasi KOMPAS.com. Unduh aplikasinya dan baca selengkapnya.</p>
        <a class="landing-app-card__cta" href="https://kompas.app.link/laya" target="_blank" rel="noopener">
          Baca di Aplikasi
        </a>
        <div class="landing-store-badges" aria-label="Unduh aplikasi">
          <a class="landing-store-badge" href="https://apps.apple.com/id/app/kompas-com/id407845785" target="_blank" rel="noopener" aria-label="Download di App Store">
            ${APPLE_ICON}
            <span class="landing-store-badge__text">
              <span class="landing-store-badge__sub">Download on the</span>
              <span class="landing-store-badge__name">App Store</span>
            </span>
          </a>
          <a class="landing-store-badge" href="https://play.google.com/store/apps/details?id=com.kompas.android" target="_blank" rel="noopener" aria-label="Dapatkan di Google Play">
            ${PLAY_ICON}
            <span class="landing-store-badge__text">
              <span class="landing-store-badge__sub">Get it on</span>
              <span class="landing-store-badge__name">Google Play</span>
            </span>
          </a>
        </div>
      </section>

    </main>

    <!-- ================================================
         DESKTOP LAYOUT (shown via CSS ≥768px)
    ================================================ -->

    <!-- Site header (desktop only) -->
    <header class="landing-site-header" aria-label="Kompas.com header">
      <div class="landing-site-header__top">
        <a class="landing-site-header__logo" href="https://www.kompas.com" aria-label="Kompas.com" target="_blank" rel="noopener">
          <img src="/assets/logogram-kompascom.svg" alt="Kompas.com" />
        </a>
        <div class="landing-site-header__actions">
          <a class="landing-site-header__subscribe" href="https://www.kompas.id" target="_blank" rel="noopener">Langganan Kompas.id</a>
        </div>
      </div>
      <nav class="landing-site-nav" aria-label="Navigasi utama">
        <a href="#">News</a>
        <a href="#">Tekno</a>
        <a href="#">Otomotif</a>
        <a href="#">Bola</a>
        <a href="#">Lifestyle</a>
        <a href="#">Tren</a>
        <a href="#">Health</a>
        <a href="#">Food</a>
        <a href="#">Edukasi</a>
        <a href="#">Money</a>
        <a href="#">Travel</a>
        <a href="#">Lainnya</a>
      </nav>
    </header>

    <!-- Desktop hero -->
    <main class="landing-desktop-hero" aria-label="${seriesTitle}">
      <div class="landing-desktop-hero__bg" style="background-image: url('${heroImage}')" aria-hidden="true"></div>
      <div class="landing-desktop-content">
        <img class="landing-desktop-brand" src="/assets/logo-laya.png" alt="Laya Langkah Budaya Merawat Indonesia" />
        <h1>${seriesTitle}</h1>
        <p>${description}</p>

        <!-- App gate -->
        <div class="landing-desktop-gate" aria-label="Konten khusus di aplikasi">
          <div class="landing-desktop-gate__copy">
            <img class="landing-desktop-gate__icon" src="/assets/kompas-triangle.png" alt="" aria-hidden="true" />
            <div class="landing-desktop-gate__text">
              <h2>Konten khusus di aplikasi.</h2>
              <p>Artikel ini ada di Aplikasi KOMPAS.com.<br />Unduh aplikasinya dan baca selengkapnya.</p>
            </div>
          </div>
          <div class="landing-desktop-qr">
            <div class="landing-desktop-qr__code" aria-hidden="true">
              ${buildQRPlaceholder()}
            </div>
            <p class="landing-desktop-qr__label">Arahkan kamera ke kode QR ini untuk download aplikasi KOMPAS.com</p>
          </div>
        </div>
      </div>
    </main>
  `
}
