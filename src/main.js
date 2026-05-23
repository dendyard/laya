import './styles/base.css'
import './styles/header.css'
import './styles/home.css'
import './styles/detail.css'
import './styles/reader.css'
import './styles/components.css'

import { initRouter, navigate, getRouteFromURL } from './router.js'
import { renderHomeView } from './views/HomeView.js'
import { renderDetailView } from './views/DetailView.js'
import { renderReaderView, deactivateReaderView } from './views/ReaderView.js'

const app = document.getElementById('app')

const views = {
  'view-index':  null,
  'view-detail': null,
  'view-reader': null,
}

let currentView = null
let readerRendered = false

/**
 * showView(viewId, params, pushState)
 *   params: { series?: number, ep?: number }
 */
async function showView(viewId, params = {}, pushState = true) {
  // Destroy reader DOM saat keluar — fresh render setiap masuk
  if (currentView === 'view-reader') {
    deactivateReaderView()
    const oldReader = views['view-reader']
    if (oldReader) {
      oldReader.remove()
      views['view-reader'] = null
      readerRendered = false
    }
  }

  // Destroy detail saat navigasi ke view lain agar data reload
  if (currentView === 'view-detail' && viewId !== 'view-detail') {
    const oldDetail = views['view-detail']
    if (oldDetail) {
      oldDetail.remove()
      views['view-detail'] = null
    }
  }

  app.querySelectorAll('.view').forEach(el => el.classList.remove('is-active'))
  if (viewId !== 'view-reader') window.scrollTo(0, 0)

  navigate(viewId, params, pushState)
  currentView = viewId

  let viewEl = views[viewId]

  if (!viewEl) {
    viewEl = document.createElement('div')
    viewEl.id = viewId
    viewEl.className = 'view'
    app.appendChild(viewEl)
    views[viewId] = viewEl

    const seriesId = params.series || 1
    const epId     = params.ep     || 1

    if (viewId === 'view-index') {
      await renderHomeView(viewEl, { onNavigate: showView })

    } else if (viewId === 'view-detail') {
      await renderDetailView(viewEl, {
        seriesId,
        onNavigate: showView,
        onBack: () => showView('view-index'),
      })

    } else if (viewId === 'view-reader') {
      await renderReaderView(viewEl, {
        seriesId,
        epId,
        onClose: () => showView('view-detail', { series: seriesId }),
      })
      readerRendered = true
    }
  }

  viewEl.classList.add('is-active')
}

// Router — popstate
initRouter((viewId, params, pushState) => showView(viewId, params, pushState))

// data-goto clicks — baca data-series & data-ep dari elemen
app.addEventListener('click', e => {
  const el = e.target.closest('[data-goto]')
  if (!el) return
  e.preventDefault()
  const params = {}
  if (el.dataset.series) params.series = parseInt(el.dataset.series, 10)
  if (el.dataset.ep)     params.ep     = parseInt(el.dataset.ep,     10)
  showView(el.dataset.goto, params)
})

// Mulai dari URL saat ini
const { page, series, ep } = getRouteFromURL()
const pageToView = { home: 'view-index', detail: 'view-detail', read: 'view-reader' }
showView(pageToView[page] || 'view-index', { series, ep }, false)
