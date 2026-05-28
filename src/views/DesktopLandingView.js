import { getArticle } from '../api/content.js'

/**
 * renderDesktopLandingView(el, { seriesId })
 * Implementasi langsung dari tato-dayak.html reference.
 * Gunakan asset dari referensi + data dinamis dari API jika tersedia.
 */
export async function renderDesktopLandingView(el, { seriesId } = {}) {
  // Fetch series info jika ada seriesId
  let article = null
  if (seriesId) {
    try { article = await getArticle(seriesId) } catch (_) { /* fallback ke default */ }
  }

  const heroImage   = article?.heroImage  || '/assets/tato-dayak-hero-bg.png'
  const seriesTitle = article?.title      || 'Tato Dayak:<br />Suara Penjaga Tradisi'
  const description = article?.description
    || 'Tato Suku Dayak menghadapi kenyataan pahit. Para penjaga tradisi kian menyusut justru di saat banyak orang yang merelakan tubuhnya dirajah. Kegelisahan pun menghantui mereka, para penato Dayak terakhir.'

  el.className = 'desktop-landing-view'

  // Set CSS variable untuk hero background image
  el.style.setProperty('--hero-bg-image', `url('${heroImage}')`)

  el.innerHTML = `
    <!-- ====================================================
         HEADER
    ==================================================== -->
    <header class="site-header" aria-label="Kompas.com header">
      <div class="site-header__top">
        <div class="site-header__frame">

          <a class="brand" href="https://www.kompas.com" aria-label="Kompas.com" target="_blank" rel="noopener">
            <img class="brand__logo" src="/assets/logogram-kompascom.svg" alt="Kompas.com" />
          </a>

          <button class="account-button" aria-label="Akun">
            <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
              <circle cx="128" cy="128" r="96"/>
              <circle cx="128" cy="104" r="32"/>
              <path d="M72 184c14.5-25.1 34.3-40 56-40s41.5 14.9 56 40"/>
            </svg>
          </button>

        </div>
      </div>
    </header>

    <!-- ====================================================
         MAIN — Hero
    ==================================================== -->
    <main class="tato-dayak-cover" aria-label="${article?.title || 'Laya — Langkah Budaya Merawat Indonesia'}">
      <section class="tato-hero">

        <div class="tato-hero__background" aria-hidden="true"></div>

        <div class="tato-hero__content">
          <img
            class="tato-hero__brand"
            src="/assets/tato-logo-laya.png"
            alt="Laya Langkah Budaya Merawat Indonesia"
          />

          <h1>${seriesTitle}</h1>

          <p>${description}</p>

          <section class="tato-app-gate" aria-label="Konten khusus di aplikasi">
            <div class="tato-app-gate__copy">
              <img
                class="tato-app-icon"
                src="/assets/tato-logo-segitiga.png"
                alt=""
                aria-hidden="true"
              />
              <div>
                <h2>Konten khusus di aplikasi.</h2>
                <p>Artikel ini ada di Aplikasi KOMPAS.com.<br />Unduh aplikasinya dan baca selengkapnya.</p>
              </div>
            </div>
            <div class="tato-qr-box">
              <img
                class="tato-qr"
                src="/assets/tato-qr-code.png"
                alt="QR code download aplikasi KOMPAS.com"
              />
              <p>Arahkan kamera ke kode QR ini untuk download aplikasi KOMPAS.com</p>
            </div>
          </section>
        </div>

      </section>
    </main>
  `
}
