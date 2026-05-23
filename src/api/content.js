import { get } from './client.js'

// Future: replace mock data with real API calls
export async function getArticle(slug) {
  // return get(`/articles/${slug}`)
  return mockArticle(slug)
}

export async function getEpisodes(articleId) {
  // return get(`/articles/${articleId}/episodes`)
  return mockEpisodes(articleId)
}

export async function getSlides(episodeId) {
  // return get(`/episodes/${episodeId}/slides`)
  return mockSlides(episodeId)
}

// Mock data matching current hardcoded content
function mockArticle(slug) {
  return Promise.resolve({
    id: 1,
    slug: 'tato-dayak',
    title: 'Tato Dayak Terakhir',
    subtitle: 'Bagian 1, Mengenal Pak Ding',
    description: 'Serial ini menelusuri jejak tato Dayak sebagai bahasa visual, identitas, dan ingatan kebudayaan.',
    heroImage: '/assets/tato-dayak1.png',
    cardImage: '/assets/tato-dayak1.png',
    category: 'Laya Series',
  })
}

function mockEpisodes(articleId) {
  return Promise.resolve([
    { id: 1, number: 1, title: 'Mengenal Pak Ding', date: '1 Juni 2026', isCurrent: true, isLocked: false },
    { id: 2, number: 2, title: 'Membaca Bahasa Visual dalam Tato Dayak', date: 'Akan Datang', isCurrent: false, isLocked: true },
  ])
}

function mockSlides(episodeId) {
  return Promise.resolve([
    { id: 1, number: 1, videoId: '1931697', content: [
      { type: 'h1', text: 'Profil Pak Ding' },
      { type: 'p', text: 'PERKENALKAN, ia adalah Laurensius Ding Lie. Orang-orang biasa menyapa, Pak Ding.' },
      { type: 'p', text: 'Pria 60 tahun itu hidup di sebuah rumah kayu sederhana. Letaknya persis di puncak bukit Ujoh Bilang, Ibu Kota Kabupaten Mahakam Hulu, Kalimantan Timur.' },
      { type: 'p', text: 'Berdinding kombinasi kayu ulin dan meranti, beratap seng dilapis plafon, serta berlantai tegel, rumah itu tak dihuni Pak Ding seorang diri. Istri beserta tiga orang anak ikut menemani.' },
      { type: 'p', text: 'Dari rumah seluas 10x25 meter persegi yang dikelilingi kebun lalu hutan belantara itu, Pak Ding bergelut dan berjuang, menjaga warisan leluhur: Tato Dayak.' },
    ]},
    { id: 2, number: 2, videoId: '1931694', content: [
      { type: 'p', text: '"Selamat datang di Mahakam Ulu," sambut Pak Ding kepada tim Kompas.com, Adhyasta Dirgantara dan Pandawa Borniat.' },
      { type: 'p', text: 'Kedua tangannya direntangkan seperti hendak memeluk kami, para tamu jauhnya itu.' },
      { type: 'p', text: 'Kami membalas, "Selamat siang Pak."' },
      { type: 'p', text: 'Di mata kami, Pak Ding tampak sangat bersahaja. Ia mengenakan celana pendek, kaos hitam, dan topi terbuat dari rotan. Namanya Tapu Wi.' },
      { type: 'p', text: '"Ayo nyantai dulu, kita ngopi sambil ngobrol-ngobrol," kata Pak Ding lagi.' },
    ]},
    { id: 3, number: 3, videoId: '1931696', content: [
      { type: 'p', text: 'Pak Ding merupakan anak keturunan asli dari Dayak Aoheng.' },
      { type: 'p', text: 'Suku Dayak Aoheng sama dengan Suku Dayak Penihing. Mereka termasuk dalam sub-kelompok Dayak Punan.' },
      { type: 'p', text: 'Suku Dayak Punan sendiri adalah satu dari enam rumpun utama Suku Dayak yang tinggal di Pulau Borneo.' },
      { type: 'p', text: 'Orang-orang Suku Dayak Aoheng awalnya tinggal nomaden di sekitar Pegunungan Muller-Pegunungan Schwaner, Kalimantan Timur, sebelum akhirnya menetap di wilayah Kabupaten Mahakam Hulu. Pak Ding salah satunya.' },
    ]},
    { id: 4, number: 4, videoId: '1931695', content: [
      { type: 'p', text: 'Kepada kami, Pak Ding mengaku sudah menekuni tradisi tato Dayak sejak berusia 15 tahun.' },
      { type: 'p', text: 'Kala itu, Ding remaja ingin mendalami lebih jauh makna tato Dayak warisan leluhurnya.' },
      { type: 'p', text: 'Keinginan itu menuntunnya berguru ke kakeknya sendiri bernama Paron.' },
      { type: 'p', text: '"Beliaulah yang selalu mengajari saya teknik menato dan desain tato sesuai dengan etnis dan kasta," ujar Pak Ding.' },
    ]},
    { id: 5, number: 5, videoId: '1931698', content: [
      { type: 'p', text: 'Pak Ding melanjutkan, hal pertama yang diajarkan Paron kepadanya adalah makna tato bagi Suku Dayak.' },
      { type: 'p', text: 'Para leluhur dan keturunannya kini percaya ketika mereka tiada, akan memasuki sebuah lorong gelap gulita.' },
      { type: 'p', text: 'Tato yang dirajah di sekujur tubuh akan mengeluarkan cahaya dan menuntun mereka berjalan ke ujung lorong, surga.' },
      { type: 'p', text: '"Itulah yang terus kakek saya katakan dan saya teruskan kepada siapapun," ujar Pak Ding.' },
    ]},
    { id: 6, number: 6, videoId: '1931700', content: [
      { type: 'p', text: 'Meski bermuara pada satu filosofi, setiap tato Suku Dayak Penihing memiliki motif yang berbeda-beda beserta artinya masing-masing.' },
      { type: 'p', text: 'Motif binatang biasanya direpresentasikan dengan bentuk naga, burung enggang, harimau, dan anjing.' },
      { type: 'p', text: 'Motif naga melambangkan kekuatan, kebijaksanaan, dan perlindungan. Motif burung enggang (rangkong) melambangkan keindahan, kedamaian, dan keharmonisan dengan alam.' },
    ]},
    { id: 7, number: 7, videoId: '1931699', content: [
      { type: 'p', text: 'Untuk motif tumbuhan, direpresentasikan dengan bentuk bunga terong yang melambangkan kedewasaan, kemampuan beradaptasi, dan merepresentasikan kekayaan alam Kalimantan.' },
      { type: 'p', text: '"Tato ini menunjukkan status di suku dan kedewasaan. Artinya, saya sudah siap mengabdi kepada keluarga sekaligus berbuat kebaikan untuk masyarakat," ujar Pak Ding.' },
      { type: 'p', text: 'Penempatan tato di leher depan pun memiliki arti khusus. Hanya orang dengan kasta tinggi dan keturunan kerajaan pada Suku Dayak Aoheng saja yang boleh ditato pada bagian leher.' },
    ]},
    { id: 8, number: 8, videoId: '1931701', content: [
      { type: 'p', text: 'Tidak hanya itu, ada pula tato motif manusia dalam pose dan mengenakan atribut tertentu. Biasanya gaya motif tato bukan realis, melainkan abstrak.' },
      { type: 'p', text: 'Tato motif ini melambangkan status sosial atau pengalaman hidup tertentu yang pernah dialami.' },
      { type: 'p', text: 'Beberapa motif manusia juga dijadikan kenangan akan figur nenek moyang atau tokoh penting dalam Suku Dayak.' },
    ]},
    { id: 9, number: 9, videoId: '1931703', content: [
      { type: 'p', text: 'Tato Dayak bukan sekadar ornamen tubuh — ia adalah arsip hidup yang mencatat perjalanan, status, dan hubungan seseorang dengan alam semesta.' },
      { type: 'p', text: 'Pak Ding berharap generasi muda Dayak Aoheng tetap mengenal dan menghargai tradisi ini.' },
      { type: 'p', text: '"Kalau tidak ada yang meneruskan, siapa yang akan menjaga warisan leluhur kita?" kata Pak Ding.' },
    ]},
  ])
}
