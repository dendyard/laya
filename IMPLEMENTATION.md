# Implementation Notes

## Current status
- Vite build setup
- Modular JS architecture (views, components, api, store)
- Mock API data layer ready for backend swap
- JX Player integration (9 slides)
- Background music (Moss Canopy.mp3)
- Intro overlay with logo + spinner
- Premium content gating
- SPA routing (pushState)
- Real backend API connection (pending)
- Auth/session management (pending)
- User analytics (pending)

## Connecting real backend

### Step 1: Set env
```bash
cp .env.example .env.local
# Edit VITE_API_URL=https://your-api.domain/api
```

### Step 2: Implement endpoints
Expected API responses:

**GET /api/articles/:slug**
```json
{
  "id": 1,
  "slug": "tato-dayak",
  "title": "Tato Dayak Terakhir",
  "subtitle": "Bagian 1, Mengenal Pak Ding",
  "description": "...",
  "heroImage": "https://cdn.../image.jpg",
  "category": "Laya Series"
}
```

**GET /api/articles/:id/episodes**
```json
[
  { "id": 1, "number": 1, "title": "Mengenal Pak Ding", "date": "1 Juni 2026", "isCurrent": true, "isLocked": false }
]
```

**GET /api/episodes/:id/slides**
```json
[
  {
    "id": 1,
    "number": 1,
    "videoId": "1931697",
    "content": [
      { "type": "h1", "text": "Profil Pak Ding" },
      { "type": "p", "text": "..." }
    ]
  }
]
```

### Step 3: Uncomment API calls
In `src/api/content.js`, uncomment the `get()` calls and remove mock functions.

## JX Player config
- **Account ID**: `9262bf2590d558736cac4fff7978fcb1`
- **CDN**: `https://asset.kgnow.com/2026/02/24/js/jxvideo.3.1.2.min.js`
- Each slide container must have a **unique ID** and `data-jx-video-id` attribute
- Player is loaded via `JX.player(config)` then `player.loadVideoById(id)`
- Loop is handled manually via the `ended` event (not native loop)

## Reader UX flow
1. User clicks "Mulai membaca" → `showView('view-reader')`
2. `renderReaderView` builds all slides from API data
3. `activateReaderView` resets scroll, shows intro overlay, plays music
4. `IntersectionObserver` triggers `loadSlideMedia` as slides enter viewport
5. First `video_start` event → `dismissIntro()` → fade in all content
6. Slide scroll → observer loads next, unloads (pauses) previous

## Known limitations
- JX Player `video_start` event sometimes fires before minimum intro duration — handled by 1.5s minimum timer
- `ended` event name confirmed correct (not `video_end`)
- Music requires user interaction on first load (browser policy) — handled with `.catch()`
