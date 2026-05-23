import { setState } from './store/app.js'

/**
 * URL format:
 *   home   → /?page=home
 *   detail → /?page=detail&series=1
 *   read   → /?page=detail&series=1&ep=1
 *
 * page=detail + ep present → view-reader
 * page=detail tanpa ep     → view-detail
 */

export function getRouteFromURL() {
  const p = new URLSearchParams(window.location.search)
  const page   = p.get('page') || 'home'
  const series = p.get('series') ? parseInt(p.get('series'), 10) : null
  const ep     = p.get('ep')     ? parseInt(p.get('ep'),     10) : null
  return { page, series, ep }
}

/** Konversi viewId + params → viewId yang benar (read pakai page=detail+ep) */
const viewToPage = {
  'view-index':  'home',
  'view-detail': 'detail',
  'view-reader': 'read',
}

const pageToView = {
  'home':   'view-index',
  'detail': 'view-detail',
  'read':   'view-reader',
}

export function navigate(viewId, params = {}, pushState = true) {
  const page = viewToPage[viewId] || 'home'
  const qs   = new URLSearchParams({ page })
  if (params.series != null) qs.set('series', params.series)
  if (params.ep     != null) qs.set('ep',     params.ep)

  if (pushState) {
    history.pushState({ page, ...params }, '', `?${qs}`)
  }
  setState({ currentView: viewId })
}

export function initRouter(onNavigate) {
  window.addEventListener('popstate', e => {
    const state  = e.state || {}
    const page   = state.page   || 'home'
    const series = state.series ?? null
    const ep     = state.ep     ?? null
    const viewId = pageToView[page] || 'view-index'
    onNavigate(viewId, { series, ep }, false)
  })
}
