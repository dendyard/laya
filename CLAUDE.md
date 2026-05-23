# Laya SPA — Claude Code Guide

## Project overview
Laya SPA is a Single Page Application for KG Media's "Orisinal" long-form storytelling format. It features a vertical video reader (similar to Instagram Reels) with background music, dynamic content loading, and premium content gating.

## Tech stack
- **Build tool**: Vite 5
- **Runtime**: Vanilla JS ES Modules (no framework)
- **Video**: JX Player (KG Media CDN)
- **Styles**: Plain CSS (modular, split by concern)
- **API**: Fetch-based client, currently using mock data

## Dev commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Production build → dist/ |
| `npm run preview` | Preview production build |

## Project structure
```
src/
├── api/          # API client + endpoints (content, auth)
├── components/   # Reusable UI components
├── views/        # Page-level view renderers
├── store/        # Simple reactive state
├── styles/       # CSS split by concern
├── router.js     # SPA routing
└── main.js       # Entry point
```

## Key architecture decisions
1. **No framework** — Vanilla JS for simplicity and performance. Views are rendered via `innerHTML` with manual DOM manipulation.
2. **Mock → Real API** — All data comes from `src/api/content.js`. Switch from mock to real by uncommenting the `get()` calls and removing mock functions.
3. **JX Player** — KG Media's proprietary video player. Loaded via CDN in `index.html`. Wrapped in `src/components/JXPlayer.js`.
4. **Lazy loading** — IntersectionObserver loads/unloads JX players as slides enter/leave viewport.

## Adding backend API
1. Set `VITE_API_URL` in `.env.local`
2. In `src/api/content.js`, uncomment the real `get()` calls
3. Remove mock functions

## Environment variables
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | Backend API base URL |

## CSS conventions
- All CSS variables in `src/styles/base.css` under `:root`
- Component styles in `src/styles/components.css`
- View-specific styles in their own file (home.css, detail.css, reader.css)
