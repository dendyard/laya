import { setState } from './store/app.js'

const routes = {
  home: 'view-index',
  detail: 'view-detail',
  read: 'view-reader',
}

const viewToPage = Object.fromEntries(Object.entries(routes).map(([k,v]) => [v,k]))

export function getPageFromURL() {
  const params = new URLSearchParams(window.location.search)
  return params.get('page') || 'home'
}

export function navigate(viewId, pushState = true) {
  const page = viewToPage[viewId] || 'home'
  if (pushState) {
    history.pushState({ page }, '', `?page=${page}`)
  }
  setState({ currentView: viewId })
}

export function initRouter(onNavigate) {
  window.addEventListener('popstate', (e) => {
    const page = (e.state && e.state.page) || 'home'
    const viewId = routes[page] || 'view-index'
    onNavigate(viewId, false)
  })
}
