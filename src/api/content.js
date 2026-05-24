import { get } from './client.js'

export async function getHeroBanners() {
  const res = await get('/hero-banners')
  return res.data
    .filter(b => b.is_active === 1)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(b => ({
      id:           b.id,
      title:        b.title,
      description:  b.description || '',
      imageUrl:     b.image_url,
      seriesId:     b.series_id,
      episodeId:    b.episode_id,
      seriesTitle:  b.series_title,
      episodeTitle: b.episode_title,
    }))
}

export async function getArticle(seriesId) {
  const res = await get(`/series/${seriesId}`)
  const d = res.data
  return {
    id:          d.id,
    slug:        d.slug,
    title:       d.title,
    subtitle:    d.subtitle,
    description: d.description,
    heroImage:   d.hero_image,
    cardImage:   d.card_image,
    category:    d.category_name,
  }
}

export async function getEpisodes(seriesId) {
  const res = await get(`/series/${seriesId}/episodes`)
  return res.data.map((ep, i) => ({
    id:          ep.id,
    number:      ep.number,
    title:       ep.title,
    date:        ep.publish_date,
    isCurrent:   i === 0 && ep.is_published === 1,
    isLocked:    ep.is_locked === 1,
    isPublished: ep.is_published === 1,
    cardImage:   ep.card_image || null,
  }))
}

export async function getEpisode(episodeId) {
  const res = await get(`/episodes/${episodeId}`)
  const d = res.data
  return {
    id:       d.id,
    title:    d.title,
    musikBg:  d.musik_bg || null,
  }
}

export async function getLatestEpisodes(limit = 5) {
  const res = await get(`/episodes/latest?limit=${limit}`)
  return res.data.map(ep => ({
    id:          ep.id,
    title:       ep.title,
    seriesId:    ep.series?.id || ep.series_id,
    seriesTitle: ep.series?.title || '',
    thumbnail:   ep.card_image,
    publishDate: ep.publish_date || '',
    category:    ep.series?.category_name || '',
  }))
}

export async function getSlides(episodeId) {
  const res = await get(`/episodes/${episodeId}/slides`)
  return res.data.map(s => ({
    id:      s.id,
    number:  s.number,
    videoId: s.videoId,
    content: s.content,
  }))
}

