import { get, post } from './client.js'

// Stub auth endpoints — implement when backend is ready
export async function login(credentials) {
  // return post('/auth/login', credentials)
  return Promise.resolve({ success: false, message: 'Not implemented' })
}

export async function logout() {
  // return post('/auth/logout')
  return Promise.resolve({ success: true })
}

export async function checkSession() {
  // return get('/auth/session')
  return Promise.resolve({ authenticated: false, user: null })
}
