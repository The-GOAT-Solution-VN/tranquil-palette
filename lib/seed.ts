/**
 * Canonical seed content, ported verbatim from the original Tranquil Palette
 * export. This module is the single source of truth used two ways:
 *
 *  1. As the payload to seed the Sanity dataset.
 *  2. As a graceful runtime fallback, so the site always renders the intended
 *     design even when Sanity returns no documents (empty dataset / offline).
 *
 * Every editorial string is bilingual: `{ en, vi }`.
 */
import type { Tone } from "./tones";

export interface Locale {
  en: string;
  vi: string;
}

export interface SeedArtwork {
  id: number;
  title: string; // English title
  vi: string; // Vietnamese title
  series: string; // English series key
  seriesVi: string;
  medium: string; // English medium
  mediumVi: string;
  year: number;
  w: number;
  h: number;
  tone: Tone;
  note: Locale;
  featured?: boolean;
}

export interface SeedPost {
  slug: string;
  category: Locale;
  date: string;
  tone: Tone;
  title: Locale;
  excerpt: Locale;
}

export interface SeedExhibition {
  slug: string;
  name: Locale;
  dates: Locale;
  place: string;
  tone: Tone;
  status: Locale;
  up: boolean; // upcoming / on-now (olive) vs past (gold)
  description: Locale;
}

export const SERIES: { key: string; vi: string }[] = [
  { key: "Hanoi Streets", vi: "Phố Cổ" },
  { key: "Still Life", vi: "Tĩnh Vật" },
  { key: "Portraits", vi: "Chân Dung" },
  { key: "Landscapes", vi: "Phong Cảnh" },
];

export const MEDIUMS: { key: string; vi: string }[] = [
  { key: "Oil on canvas", vi: "Sơn dầu" },
  { key: "Acrylic on canvas", vi: "Acrylic" },
];

export const ARTWORKS: SeedArtwork[] = [
  { id: 1, title: "Summer Lotus", vi: "Sen Mùa Hạ", series: "Still Life", seriesVi: "Tĩnh Vật", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2024, w: 80, h: 100, tone: "sage", featured: true, note: { en: "Lotus blooms gathered from the lake near her home, painted in the soft light of a Hanoi morning.", vi: "Những bông sen hái từ hồ gần nhà, vẽ trong ánh sáng dịu của một buổi sáng Hà Nội." } },
  { id: 2, title: "Old Quarter Morning", vi: "Phố Cổ Buổi Sáng", series: "Hanoi Streets", seriesVi: "Phố Cổ", medium: "Acrylic on canvas", mediumVi: "Acrylic", year: 2023, w: 90, h: 60, tone: "peach", featured: true, note: { en: "The narrow streets of the Old Quarter as vendors set out their wares and the city slowly wakes.", vi: "Những con phố hẹp của Phố Cổ khi người bán dọn hàng và thành phố từ từ thức giấc." } },
  { id: 3, title: "My Grandmother", vi: "Bà Tôi", series: "Portraits", seriesVi: "Chân Dung", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2022, w: 60, h: 80, tone: "warm", featured: true, note: { en: "A tender portrait drawn from memory — the quiet dignity of an elder who shaped a family.", vi: "Một bức chân dung dịu dàng vẽ từ ký ức — sự đường hoàng lặng lẽ của người bà đã dựng nên một gia đình." } },
  { id: 4, title: "Sword Lake in October", vi: "Hồ Gươm Tháng Mười", series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2024, w: 100, h: 70, tone: "green", note: { en: "Hoàn Kiếm Lake in autumn, its still water holding the amber of changing leaves.", vi: "Hồ Hoàn Kiếm vào thu, mặt nước tĩnh lặng giữ lấy sắc hổ phách của lá mùa." } },
  { id: 5, title: "The Flower Vendor", vi: "Gánh Hàng Hoa", series: "Hanoi Streets", seriesVi: "Phố Cổ", medium: "Acrylic on canvas", mediumVi: "Acrylic", year: 2023, w: 70, h: 90, tone: "gold", note: { en: "A bicycle laden with seasonal blooms — a moving garden through the streets of Hanoi.", vi: "Chiếc xe đạp chở đầy hoa theo mùa — một khu vườn di động qua những con phố Hà Nội." } },
  { id: 6, title: "Still Life with Oranges", vi: "Tĩnh Vật Với Cam", series: "Still Life", seriesVi: "Tĩnh Vật", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2021, w: 60, h: 60, tone: "orange", note: { en: "An early study of light and warmth, painted shortly after she first picked up the brush.", vi: "Một nghiên cứu sớm về ánh sáng và hơi ấm, vẽ ngay sau khi bà lần đầu cầm cọ." } },
  { id: 7, title: "West Lake Afternoon", vi: "Chiều Tây Hồ", series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Acrylic on canvas", mediumVi: "Acrylic", year: 2024, w: 120, h: 80, tone: "sage", note: { en: "The wide calm of Hồ Tây in late afternoon, where the city softens into water and sky.", vi: "Sự tĩnh lặng mênh mông của Hồ Tây buổi chiều muộn, nơi thành phố tan vào nước và trời." } },
  { id: 8, title: "Girl in Áo Dài", vi: "Cô Gái Áo Dài", series: "Portraits", seriesVi: "Chân Dung", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2023, w: 70, h: 100, tone: "peach", note: { en: "A young woman in the traditional áo dài, captured in a moment of quiet poise.", vi: "Một thiếu nữ trong tà áo dài truyền thống, được ghi lại trong khoảnh khắc thanh thản." } },
  { id: 9, title: "Green Rice Season", vi: "Mùa Cốm", series: "Still Life", seriesVi: "Tĩnh Vật", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2022, w: 80, h: 80, tone: "green", note: { en: "Young green rice wrapped in lotus leaf — a fleeting autumn delicacy and a memory of place.", vi: "Cốm non gói trong lá sen — một thức quà thu thoáng qua và một ký ức về chốn cũ." } },
  { id: 10, title: "Little Alley", vi: "Ngõ Nhỏ", series: "Hanoi Streets", seriesVi: "Phố Cổ", medium: "Acrylic on canvas", mediumVi: "Acrylic", year: 2024, w: 60, h: 90, tone: "gold", note: { en: "A sliver of light down a hidden alley, where life unfolds in close and gentle quarters.", vi: "Một vệt sáng trong con ngõ khuất, nơi cuộc sống diễn ra trong những góc nhỏ thân tình." } },
  { id: 11, title: "Morning Mist", vi: "Sương Sớm", series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2023, w: 100, h: 80, tone: "sage", note: { en: "Mist settling over the fields outside the city, painted in restrained, breathing greys.", vi: "Sương phủ trên những cánh đồng ngoại ô, vẽ bằng những sắc xám tiết chế, đang thở." } },
  { id: 12, title: "Lily Season", vi: "Hoa Loa Kèn", series: "Still Life", seriesVi: "Tĩnh Vật", medium: "Oil on canvas", mediumVi: "Sơn dầu", year: 2024, w: 70, h: 90, tone: "peach", note: { en: "White lilies mark April in Hanoi — a brief, luminous season she returns to each year.", vi: "Hoa loa kèn trắng đánh dấu tháng Tư ở Hà Nội — một mùa ngắn ngủi, rạng rỡ bà trở lại mỗi năm." } },
];

export const POSTS: SeedPost[] = [
  { slug: "mixing-the-greens-of-a-hanoi-spring", date: "May 2026", tone: "green", category: { en: "Process", vi: "Quá trình" }, title: { en: "Mixing the greens of a Hanoi spring", vi: "Pha những sắc xanh của mùa xuân Hà Nội" }, excerpt: { en: "On the dozen quiet greens hidden in a single banyan tree, and how to find them on the palette.", vi: "Về hàng chục sắc xanh ẩn trong một cây đa, và cách tìm thấy chúng trên bảng pha màu." } },
  { slug: "lily-season-painting-against-the-clock", date: "Apr 2026", tone: "peach", category: { en: "Studio", vi: "Xưởng vẽ" }, title: { en: "Lily season, and painting against the clock", vi: "Mùa loa kèn và cuộc đua với thời gian" }, excerpt: { en: "White lilies last only weeks. A note on painting a flower before it fades.", vi: "Hoa loa kèn chỉ nở vài tuần. Đôi dòng về việc vẽ một bông hoa trước khi nó tàn." } },
  { slug: "beginning-at-sixty", date: "Mar 2026", tone: "warm", category: { en: "Story", vi: "Câu chuyện" }, title: { en: "Beginning at sixty: a love arrived late", vi: "Bắt đầu ở tuổi sáu mươi: một tình yêu đến muộn" }, excerpt: { en: "Why it is never too late to pick up the brush — reflections after the first thirty paintings.", vi: "Vì sao không bao giờ là quá muộn để cầm cọ — suy ngẫm sau ba mươi bức tranh đầu tiên." } },
  { slug: "the-lake-that-keeps-appearing", date: "Feb 2026", tone: "sage", category: { en: "Place", vi: "Chốn" }, title: { en: "The lake that keeps appearing in my work", vi: "Mặt hồ cứ trở đi trở lại trong tranh tôi" }, excerpt: { en: "Hồ Tây in every season — why some places ask to be painted again and again.", vi: "Hồ Tây qua mọi mùa — vì sao có những nơi đòi được vẽ đi vẽ lại." } },
  { slug: "on-painting-people-you-love", date: "Jan 2026", tone: "gold", category: { en: "Process", vi: "Quá trình" }, title: { en: "On painting people you love", vi: "Về việc vẽ những người mình thương" }, excerpt: { en: "A portrait of a grandmother, and the difference between a likeness and a memory.", vi: "Chân dung một người bà, và khác biệt giữa sự giống và một ký ức." } },
  { slug: "oil-and-acrylic-two-voices", date: "Dec 2025", tone: "orange", category: { en: "Materials", vi: "Chất liệu" }, title: { en: "Oil and acrylic: choosing between two voices", vi: "Sơn dầu và acrylic: chọn giữa hai giọng nói" }, excerpt: { en: "When a subject calls for the patience of oil, and when acrylic’s quickness is truer.", vi: "Khi nào đề tài cần sự kiên nhẫn của sơn dầu, và khi nào sự nhanh nhạy của acrylic chân thực hơn." } },
];

export const EXHIBITIONS: SeedExhibition[] = [
  { slug: "seasons-of-a-quiet-life", place: "Tranquil Palette, Hanoi", tone: "green", up: true, name: { en: "Seasons of a Quiet Life", vi: "Bốn Mùa Bình Dị" }, dates: { en: "15 Aug – 30 Sep 2026", vi: "15/08 – 30/09 2026" }, status: { en: "Upcoming", vi: "Sắp tới" }, description: { en: "A gathering of thirty paintings tracing a single year through the rooms of the home gallery.", vi: "Ba mươi bức tranh kể lại một năm, ngay trong những căn phòng của phòng tranh tại gia." } },
  { slug: "hanoi-up-close", place: "Café Lành, Hanoi", tone: "peach", up: true, name: { en: "Hanoi, Up Close", vi: "Hà Nội, Thật Gần" }, dates: { en: "10 – 24 May 2026", vi: "10 – 24/05 2026" }, status: { en: "On now", vi: "Đang diễn ra" }, description: { en: "A small show of street scenes and portraits, hung among the tables of a neighbourhood café.", vi: "Một triển lãm nhỏ gồm cảnh phố và chân dung, treo giữa những chiếc bàn của quán cà phê trong khu phố." } },
  { slug: "first-light", place: "Hanoi Art Circle", tone: "gold", up: false, name: { en: "First Light", vi: "Ánh Sáng Đầu Tiên" }, dates: { en: "Nov 2024", vi: "11/2024" }, status: { en: "Past", vi: "Đã qua" }, description: { en: "Her debut group showing — the still lifes and lake studies that first drew quiet acclaim.", vi: "Lần đầu trưng bày nhóm — những bức tĩnh vật và cảnh hồ đầu tiên được giới hội hoạ thầm khen." } },
  { slug: "a-room-of-her-own", place: "Tranquil Palette, Hanoi", tone: "sage", up: false, name: { en: "A Room of Her Own", vi: "Căn Phòng Của Riêng Mình" }, dates: { en: "Aug 2023", vi: "08/2023" }, status: { en: "Past", vi: "Đã qua" }, description: { en: "The opening of the home gallery itself — twelve paintings and an open afternoon of tea.", vi: "Lễ mở cửa của chính phòng tranh tại gia — mười hai bức tranh và một buổi chiều trà rộng mở." } },
];

export const STATS: { value: string; label: Locale }[] = [
  { value: "60", label: { en: "Took up the brush at", vi: "Cầm cọ ở tuổi" } },
  { value: "30+", label: { en: "Paintings to date", vi: "Bức tranh đến nay" } },
  { value: "1", label: { en: "Home gallery", vi: "Phòng tranh tại gia" } },
  { value: "Hanoi", label: { en: "Born & based", vi: "Sinh ra & gắn bó" } },
];

export const VISIT_INFO: { label: Locale; value: Locale }[] = [
  { label: { en: "Address", vi: "Địa chỉ" }, value: { en: "A quiet lane in Tây Hồ\nHanoi, Vietnam", vi: "Một con ngõ yên tĩnh ở Tây Hồ\nHà Nội, Việt Nam" } },
  { label: { en: "Hours", vi: "Giờ" }, value: { en: "By appointment\nMost afternoons", vi: "Theo hẹn\nThường vào buổi chiều" } },
  { label: { en: "Email", vi: "Email" }, value: { en: "hello@tranquilpalette.art", vi: "hello@tranquilpalette.art" } },
  { label: { en: "Phone", vi: "Điện thoại" }, value: { en: "+84 24 1234 5678", vi: "+84 24 1234 5678" } },
];
