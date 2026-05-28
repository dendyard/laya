/**
 * browserDetect.js
 * Deteksi apakah app diakses via WebView / in-app browser atau browser biasa.
 */

const ua = navigator.userAgent || ''
const vendor = navigator.vendor || ''

// ── In-App Browser (social media & messaging) ─────────────────────────────
const IN_APP_PATTERNS = [
  { name: 'Instagram',  pattern: /Instagram/i },
  { name: 'Facebook',   pattern: /FBAN|FBAV|FB_IAB|FBIOS|FBSV/i },
  { name: 'TikTok',     pattern: /musical_ly|TikTok/i },
  { name: 'Twitter',    pattern: /TwitterAndroid|TwitteriPhone/i },
  { name: 'Line',       pattern: /\bLine\b/i },
  { name: 'WeChat',     pattern: /MicroMessenger/i },
  { name: 'Snapchat',   pattern: /Snapchat/i },
  { name: 'LinkedIn',   pattern: /LinkedInApp/i },
  { name: 'WhatsApp',   pattern: /WhatsApp/i },
  { name: 'Telegram',   pattern: /Telegram/i },
  { name: 'Pinterest',  pattern: /Pinterest/i },
  { name: 'Gmail',      pattern: /GSA\//i },
]

// ── WebView detection ─────────────────────────────────────────────────────
function isAndroidWebView() {
  // Android WebView: mengandung "wv" atau Version/x.x tanpa Chrome standard
  return /Android/.test(ua) && (
    /wv\)/.test(ua) ||
    (/Version\/\d/.test(ua) && /Chrome\/\d/.test(ua))
  )
}

function isIOSWebView() {
  // iOS WKWebView / UIWebView: iOS device tapi bukan Safari / Chrome iOS / Firefox iOS
  const isIOS = /iP(hone|ad|od)/.test(ua)
  if (!isIOS) return false
  const isSafari    = /Safari/.test(ua) && /AppleWebKit/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury/.test(ua)
  const isChromeiOS = /CriOS/.test(ua)
  const isFirefoxiOS = /FxiOS/.test(ua)
  return !isSafari && !isChromeiOS && !isFirefoxiOS
}

// ── Standar browser ───────────────────────────────────────────────────────
function detectStandardBrowser() {
  if (/CriOS/.test(ua))  return 'Chrome iOS'
  if (/FxiOS/.test(ua))  return 'Firefox iOS'
  if (/EdgA|EdgiOS/.test(ua)) return 'Edge'
  if (/OPR|OPiOS/.test(ua))  return 'Opera'
  if (/SamsungBrowser/.test(ua)) return 'Samsung Browser'
  if (/Chrome\//.test(ua) && /Google Inc/.test(vendor)) return 'Chrome'
  if (/Safari\//.test(ua) && /Apple/.test(vendor)) return 'Safari'
  if (/Firefox\//.test(ua)) return 'Firefox'
  return 'Unknown Browser'
}

// ── Main export ───────────────────────────────────────────────────────────
export function detectBrowser() {
  // Cek in-app browser dulu
  for (const { name, pattern } of IN_APP_PATTERNS) {
    if (pattern.test(ua)) {
      return { type: 'inapp', name, isInApp: true, isWebView: false, isStandard: false }
    }
  }

  // Cek WebView
  if (isAndroidWebView()) {
    return { type: 'webview', name: 'Android WebView', isInApp: false, isWebView: true, isStandard: false }
  }
  if (isIOSWebView()) {
    return { type: 'webview', name: 'iOS WebView', isInApp: false, isWebView: true, isStandard: false }
  }

  // Browser biasa
  return { type: 'standard', name: detectStandardBrowser(), isInApp: false, isWebView: false, isStandard: true }
}

/**
 * Tampilkan banner "Buka di browser" jika akses via in-app / WebView.
 * Banner muncul fixed di bawah layar, bisa di-dismiss.
 */
export function initBrowserBanner() {
  const result = detectBrowser()
  if (result.isStandard) return  // tidak perlu banner

  const existing = document.getElementById('browser-banner')
  if (existing) return

  const banner = document.createElement('div')
  banner.id = 'browser-banner'
  banner.innerHTML = `
    <div class="browser-banner__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    </div>
    <div class="browser-banner__body">
      <strong>Buka di browser</strong>
      <span>Untuk pengalaman terbaik, buka di Chrome atau Safari</span>
    </div>
    <button class="browser-banner__close" aria-label="Tutup">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  `

  banner.querySelector('.browser-banner__close').addEventListener('click', () => {
    banner.classList.add('is-hiding')
    setTimeout(() => banner.remove(), 300)
  })

  document.body.appendChild(banner)

  // Auto-show dengan animasi
  requestAnimationFrame(() => banner.classList.add('is-visible'))
}
