# AGENT.md — AI Agent Instructions

## What this project is
A vertical video storytelling SPA (laya-spa) for KG Media. Think Instagram Reels meets long-form journalism.

## Architecture summary
- **Entry**: `src/main.js` → calls `showView()` which renders view modules
- **Views**: `src/views/{Home,Detail,Reader}View.js` — each exports a `render*View(container, opts)` async function
- **API**: `src/api/content.js` — currently uses mock data, ready for real backend
- **State**: `src/store/app.js` — simple pub/sub store
- **Components**: Stateful singletons (JXPlayer, MusicPlayer, ReaderIntro, PremiumBlocker)

## Critical files to know
| File | Purpose |
|------|---------|
| `src/main.js` | App bootstrap, view switching |
| `src/views/ReaderView.js` | Most complex: lazy JX players, music, intro overlay |
| `src/api/content.js` | **Change here first** when connecting real backend |
| `src/components/JXPlayer.js` | JX Player wrapper |
| `.env.local` | API URL config (not committed) |

## When making changes
- **Add a new slide field**: Update mock in `src/api/content.js` → update render in `ReaderView.js`
- **Change video player**: Swap `src/components/JXPlayer.js`
- **Add auth**: Implement `src/api/auth.js`, update `src/store/app.js`
- **Style changes**: Edit CSS files in `src/styles/`, never inline styles
- **New view**: Create `src/views/NewView.js`, register in `src/main.js`

## Do not
- Import from `node_modules` without adding to package.json
- Use `document.getElementById` directly in views — always scope to the view container
- Modify `public/assets/` filenames (JX Player config references them)
- Add `console.log` in production code
