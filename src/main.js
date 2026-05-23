import './styles/base.css'
import './styles/header.css'
import './styles/home.css'
import './styles/detail.css'
import './styles/reader.css'
import './styles/components.css'

import { initRouter, navigate, getPageFromURL } from './router.js'
import { renderHomeView } from './views/HomeView.js'
import { renderDetailView } from './views/DetailView.js'
import { renderReaderView, activateReaderView, deactivateReaderView } from './views/ReaderView.js'

const app = document.getElementById('app')

// View containers (cached after first render)
const views = {
  'view-index': null,
  'view-detail': null,
  'view-reader': null,
}

let currentView = null
let readerRendered = false

async function showView(viewId, pushState = true) {
  // Deactivate current
  if (currentView === 'view-reader') deactivateReaderView()

  // Hide all
  app.querySelectorAll('.view').forEach(el => el.classList.remove('is-active'))

  // Scroll reset
  if (viewId !== 'view-reader') window.scrollTo(0, 0)

  navigate(viewId, pushState)
  currentView = viewId

  let viewEl = views[viewId]

  if (!viewEl) {
    viewEl = document.createElement('div')
    viewEl.id = viewId
    viewEl.className = 'view'
    app.appendChild(viewEl)
    views[viewId] = viewEl

    if (viewId === 'view-index') {
      await renderHomeView(viewEl, { onNavigate: showView })
    } else if (viewId === 'view-detail') {
      await renderDetailView(viewEl, {
        onNavigate: showView,
        onBack: () => showView('view-index'),
      })
    } else if (viewId === 'view-reader') {
      await renderReaderView(viewEl, { onClose: () => showView('view-detail') })
      readerRendered = true
    }
  } else if (viewId === 'view-reader' && readerRendered) {
    activateReaderView(viewEl)
  }

  viewEl.classList.add('is-active')
}

// Init router
initRouter((viewId, pushState) => showView(viewId, pushState))

// Handle [data-goto] clicks at app level
app.addEventListener('click', e => {
  const el = e.target.closest('[data-goto]')
  if (el) { e.preventDefault(); showView(el.dataset.goto) }
})

// Start on correct page
const initialPage = getPageFromURL()
const pageMap = { home: 'view-index', detail: 'view-detail', read: 'view-reader' }
showView(pageMap[initialPage] || 'view-index', false)
