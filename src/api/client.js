const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json()
}

export const get = (path, opts) => request(path, { method: 'GET', ...opts })
export const post = (path, body, opts) => request(path, { method: 'POST', body: JSON.stringify(body), ...opts })
