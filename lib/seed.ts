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
  /** Size in cm; omit when not recorded. */
  w?: number;
  h?: number;
  tone: Tone;
  note: Locale;
  featured?: boolean;
  /** False once the work belongs to a private collector. Defaults to true. */
  available?: boolean;
  /** Photograph of the finished work, served from /public. */
  image?: { src: string; width: number; height: number; alt: Locale };
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
  { key: "Still Life", vi: "Tĩnh Vật" },
  { key: "Portraits", vi: "Chân Dung" },
  { key: "Spiritual", vi: "Tâm Linh" },
  { key: "Animals", vi: "Động Vật" },
  { key: "Landscapes", vi: "Phong Cảnh" },
];

export const MEDIUMS: { key: string; vi: string }[] = [
  { key: "Oil on canvas", vi: "Sơn dầu" },
  { key: "Acrylic on canvas", vi: "Acrylic" },
];

export const ARTWORKS: SeedArtwork[] = [
  {
    id: 13, title: "The Fragrant Family Garden", vi: "Vườn Nhà Thơm",
    series: "Portraits", seriesVi: "Chân Dung", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2026, w: 60, h: 80, tone: "green", featured: true,
    note: {
      en: "A young woman in a conical nón lá peers up through glossy leaves, white blossom and ripening rambutan in the family garden at Long Thành, Ho Chi Minh City. Shafts of sunlight thread the canopy in this lush, affectionate portrait. February 2026.",
      vi: "Một thiếu nữ đội nón lá ngước nhìn qua tán lá xanh bóng, những chùm hoa trắng và chôm chôm chín đỏ trong khu vườn nhà ở Long Thành, TP. Hồ Chí Minh. Những tia nắng xuyên qua tán lá trong bức chân dung tràn đầy sức sống và tình cảm này. Tháng 2/2026.",
    },
    image: { src: "/artworks/fragrant-family-garden.jpg", width: 1413, height: 1800, alt: { en: "Painting of a smiling young woman in a conical hat among rambutan and citrus branches", vi: "Tranh thiếu nữ đội nón lá mỉm cười giữa vườn chôm chôm và cây có múi" } },
  },
  {
    id: 14, title: "Buddha of Prosperity", vi: "Phật Khai Tài Lộc",
    series: "Spiritual", seriesVi: "Tâm Linh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2026, w: 90, h: 120, tone: "gold", featured: true, available: false,
    note: {
      en: "A serene Buddha in white and gold robes holds an open lotus before a radiant mandala halo. Built up in raised acrylic relief, the gold ornament and beaded halo catch the light and invite blessings of fortune and prosperity. January 2026.",
      vi: "Đức Phật an nhiên trong y phục trắng vàng, tay nâng đóa sen nở trước vầng hào quang mandala rực rỡ. Tranh được đắp nổi bằng acrylic; những chi tiết vàng và vòng hạt hào quang bắt sáng, gửi gắm lời cầu tài lộc và an lành. Tháng 1/2026.",
    },
    image: { src: "/artworks/buddha-of-prosperity.jpg", width: 1142, height: 1500, alt: { en: "Painting of a Buddha in white and gold robes holding a lotus before a golden halo, in a gilded frame", vi: "Tranh Đức Phật áo trắng vàng nâng đóa sen trước vầng hào quang vàng, trong khung mạ vàng" } },
  },
  {
    id: 15, title: "Black Cat with Jade Eyes", vi: "Mèo Đen Mắt Ngọc",
    series: "Animals", seriesVi: "Động Vật", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2024, w: 65, h: 85, tone: "green", featured: true, available: false,
    note: {
      en: "A black-and-white cat sits poised on a wooden stump, glancing over its shoulder with luminous green eyes. Behind it, a sunlit garden glows in golden yellows and deep greens. June 2024.",
      vi: "Chú mèo đen trắng ngồi trên gốc cây, ngoái nhìn với đôi mắt xanh ngọc long lanh. Phía sau là khu vườn ngập nắng với sắc vàng rực và xanh thẫm. Tháng 6/2024.",
    },
    image: { src: "/artworks/black-cat-with-jade-eyes.jpg", width: 1180, height: 1500, alt: { en: "Painting of a black-and-white cat with green eyes seated on a wooden stump before a sunlit garden", vi: "Tranh chú mèo đen trắng mắt xanh ngồi trên gốc cây trước khu vườn nắng" } },
  },
  {
    id: 16, title: "Shakyamuni Buddha", vi: "Đức Phật Thích Ca Mâu Ni",
    series: "Spiritual", seriesVi: "Tâm Linh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 60, h: 80, tone: "sage", available: false,
    note: {
      en: "The Buddha gazes down in stillness, cradling a luminous lotus above rippling water, with a mountain pagoda and waterfall beyond. Painted in thick, sculpted acrylic relief with a gilded, glowing halo. November 2025.",
      vi: "Đức Phật cúi nhìn trong tĩnh lặng, nâng niu đóa sen toả sáng trên mặt nước gợn sóng; xa xa là ngôi chùa trên núi và thác nước. Tranh được đắp nổi dày bằng acrylic, với vầng hào quang vàng rực. Tháng 11/2025.",
    },
    image: { src: "/artworks/shakyamuni-buddha.jpg", width: 1115, height: 1500, alt: { en: "Textured painting of the Buddha holding a lotus above rippling water, with a pagoda and waterfall behind", vi: "Tranh đắp nổi Đức Phật nâng đóa sen trên mặt nước, phía sau là chùa và thác nước" } },
  },
  {
    id: 17, title: "Sunflower", vi: "Hoa Hướng Dương",
    series: "Still Life", seriesVi: "Tĩnh Vật", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2024, w: 50, h: 50, tone: "gold", available: false,
    note: {
      en: "A single sunflower turns toward the light, its golden petals and richly textured seed head set against a soft, misty olive ground. August 2024.",
      vi: "Một đóa hướng dương hướng về phía ánh sáng, cánh vàng rực và nhụy hoa giàu chất liệu nổi bật trên nền xanh ô-liu mờ sương. Tháng 8/2024.",
    },
    image: { src: "/artworks/sunflower.jpg", width: 1356, height: 1500, alt: { en: "Painting of a golden sunflower with green leaves against a misty olive background", vi: "Tranh hoa hướng dương vàng cùng lá xanh trên nền ô-liu mờ sương" } },
  },
  {
    id: 18, title: "West Lake This Evening", vi: "Hồ Tây Chiều Nay",
    series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Oil on canvas", mediumVi: "Sơn dầu",
    year: 2026, w: 40, h: 60, tone: "orange",
    note: {
      en: "The sun sinks into a blaze of orange over Hồ Tây, its glow pooling in the still water below the Hanoi skyline. A blossoming flame-tree branch frames the scene from above, a sign of early summer in the city. May 2026.",
      vi: "Mặt trời lặn trong sắc cam rực rỡ trên Hồ Tây, ánh sáng đổ xuống mặt hồ phẳng lặng bên dưới dải nhà cao tầng Hà Nội. Cành phượng nở hoa vắt ngang từ trên cao như báo hiệu đầu hè. Tháng 5/2026.",
    },
    image: { src: "/artworks/west-lake-this-evening.jpg", width: 968, height: 1500, alt: { en: "Oil painting of a vivid orange sunset over West Lake and the Hanoi skyline, framed by a flowering flame-tree branch", vi: "Tranh sơn dầu hoàng hôn cam rực trên Hồ Tây và dải nhà cao tầng Hà Nội, khung bởi cành phượng nở hoa" } },
  },
  {
    id: 19, title: "Happy Cat", vi: "Mèo Hạnh Phúc",
    series: "Animals", seriesVi: "Động Vật", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 80, h: 60, tone: "gold", available: false,
    note: {
      en: "A golden tabby stretches in a playful bow, its gaze fixed on a butterfly fluttering above. Two ripe golden fruits rest on the terracotta floor beneath a laden branch, completing this warm, sunlit scene of simple contentment. November 2025.",
      vi: "Chú mèo vàng vươn mình duỗi dài, ánh mắt dõi theo chú bướm đang chập chờn phía trên. Hai quả vàng chín nằm trên nền gạch đỏ bên dưới cành quả trĩu nặng, tạo nên khung cảnh ấm áp, đầy nắng của niềm vui giản dị. Tháng 11/2025.",
    },
    image: { src: "/artworks/happy-cat.jpg", width: 1800, height: 1374, alt: { en: "Painting of a golden tabby cat stretching toward a butterfly beside two ripe golden fruits, in a framed canvas", vi: "Tranh chú mèo vàng vươn mình nhìn chú bướm bên hai quả vàng chín, trong khung tranh" } },
  },
  {
    id: 20, title: "Bronze Buddha", vi: "Đức Phật Tượng Đồng",
    series: "Spiritual", seriesVi: "Tâm Linh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2026, w: 62, h: 85, tone: "warm",
    note: {
      en: "A close portrait of the Buddha in the manner of an antique bronze statue. Closed eyes and a quiet half-smile convey deep serenity, while burnished gold tones, coiled earlobes and a lotus-like crown of curls glow against a weathered, mottled blue ground. March 2026.",
      vi: "Chân dung cận cảnh Đức Phật theo dáng tượng đồng cổ. Đôi mắt khép và nụ cười hiền toát lên sự an nhiên sâu lắng; sắc vàng đồng ánh lên cùng đôi tai dài cuộn tròn và búi tóc xoắn hình hoa sen nổi bật trên nền xanh loang màu thời gian. Tháng 3/2026.",
    },
    image: { src: "/artworks/bronze-buddha.jpg", width: 1164, height: 1500, alt: { en: "Painting of a golden Buddha's face with closed eyes, styled like a bronze statue, in an ornate frame", vi: "Tranh gương mặt Đức Phật nhắm mắt màu vàng đồng như tượng đồng, trong khung chạm hoa văn" } },
  },
  {
    id: 21, title: "Happiness 🇻🇳🇺🇸", vi: "Hạnh Phúc 🇻🇳🇺🇸",
    series: "Portraits", seriesVi: "Chân Dung", medium: "Oil on canvas", mediumVi: "Sơn dầu",
    year: 2026, w: 40, h: 60, tone: "warm",
    note: {
      en: "A bride and groom cross a city street hand in hand, seen from behind, the bride's gown trailing and a bouquet held low at her side. Painted entirely in shades of grey, the crossing's stripes and long shadows lead the eye down the avenue ahead. Titled with the flags of Vietnam and the United States, it celebrates a union between two cultures. June 2026.",
      vi: "Cô dâu và chú rể nắm tay nhau băng qua con phố, nhìn từ phía sau; vạt váy cô dâu thướt tha, bó hoa buông nhẹ bên hông. Bức tranh được vẽ hoàn toàn bằng sắc xám, những vạch kẻ đường và bóng đổ dài dẫn mắt người xem về phía trước. Tên tranh kèm hai lá cờ Việt Nam và Hoa Kỳ, ngợi ca sự gắn kết của hai nền văn hoá. Tháng 6/2026.",
    },
    image: { src: "/artworks/happiness.jpg", width: 1166, height: 1800, alt: { en: "Black-and-white painting of a bride and groom walking hand in hand across a city crosswalk", vi: "Tranh đen trắng cô dâu và chú rể nắm tay đi qua vạch kẻ đường giữa phố" } },
  },
  {
    id: 22, title: "Peace and Good Health", vi: "An Khang",
    series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 150, h: 120, tone: "gold", available: false,
    note: {
      en: "Pale lotus blossoms rise from a still pond in warm golden light, among open seed pods, unfurling leaves and buds. Koi glide below while butterflies and dragonflies hover above, a composition that wishes the viewer peace, health and good fortune. November 2025.",
      vi: "Những đóa sen trắng hồng vươn lên từ mặt ao tĩnh lặng trong ánh vàng ấm áp, giữa gương sen, lá cuốn và nụ búp. Đàn cá koi lượn dưới nước, bướm và chuồn chuồn chấp chới phía trên, gửi gắm lời chúc bình an, sức khoẻ và may mắn. Tháng 11/2025.",
    },
    image: { src: "/artworks/an-khang.jpg", width: 1500, height: 1253, alt: { en: "Painting of white lotus flowers, buds and seed pods over a pond with koi, butterflies and dragonflies, in an ornate gold frame", vi: "Tranh hoa sen trắng, nụ và gương sen trên ao có cá koi, bướm và chuồn chuồn, trong khung vàng chạm hoa văn" } },
  },
  {
    id: 23, title: "The Rooster", vi: "Con Gà Trống",
    series: "Animals", seriesVi: "Động Vật", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2024, w: 40, h: 50, tone: "orange",
    note: {
      en: "A proud rooster stands tall in full plumage, with flame-orange hackles, a deep blue-black body and a sweeping tail, set against a glowing meadow flecked with small yellow flowers. August 2024.",
      vi: "Chú gà trống đứng hiên ngang trong bộ lông rực rỡ, cổ cam lửa, thân xanh đen thẫm, đuôi cong vút, trên nền đồng cỏ lung linh điểm những bông hoa vàng nhỏ. Tháng 8/2024.",
    },
    image: { src: "/artworks/the-rooster.jpg", width: 1310, height: 1800, alt: { en: "Painting of a rooster with orange and blue-black plumage and a red comb, standing before a glowing meadow, in a dark wood frame", vi: "Tranh chú gà trống lông cam và xanh đen, mào đỏ, đứng trước đồng cỏ lung linh, trong khung gỗ sẫm" } },
  },
  {
    id: 24, title: "Auckland Dusk", vi: "Chiều Auckland",
    series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 62, h: 82, tone: "orange", available: false,
    note: {
      en: "A street runs straight toward the setting sun between towering buildings, with a construction crane and traffic lights glowing red in the dusk. The Sky Tower rises beyond bare branches as birds wheel overhead, and saturated oranges, magentas and violets turn Auckland's dusk into a vision of fire. September 2025.",
      vi: "Con đường thẳng tắp hướng về mặt trời lặn giữa những toà nhà cao tầng; cần cẩu và đèn giao thông đỏ rực trong hoàng hôn. Tháp Sky Tower nhô lên sau những cành cây trơ lá, đàn chim sải cánh trên cao; những sắc cam, tím và hồng sẫm rực lửa biến buổi chiều Auckland thành một thị kiến cháy bỏng. Tháng 9/2025.",
    },
    image: { src: "/artworks/auckland-evening.jpg", width: 1219, height: 1800, alt: { en: "Painting of an Auckland street at sunset in fiery oranges and violets, with the Sky Tower, a crane and traffic lights", vi: "Tranh con phố Auckland lúc hoàng hôn với sắc cam và tím rực lửa, có tháp Sky Tower, cần cẩu và đèn giao thông" } },
  },
  {
    id: 25, title: "Golden Season", vi: "Mùa Vàng",
    series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 240, h: 135, tone: "gold", available: false,
    note: {
      en: "A golden harvest spreads to the horizon, a winding canal carrying ducks and water lilies through ripe rice fields. In the foreground, young women in traditional dress pause beneath a tree beside sheaves of rice and woven baskets, while farmers work the distant paddies under a sun-washed sky. August 2025.",
      vi: "Mùa gặt vàng trải dài đến tận chân trời, dòng kênh uốn lượn đưa vịt và hoa súng qua những thửa ruộng lúa chín. Phía trước, các thiếu nữ trong trang phục truyền thống nghỉ chân dưới gốc cây bên những bó lúa và chiếc giỏ đan; xa xa, người nông dân vẫn miệt mài trên đồng dưới bầu trời đầy nắng. Tháng 8/2025.",
    },
    image: { src: "/artworks/golden-season.jpg", width: 1800, height: 1057, alt: { en: "Wide painting of golden rice fields with a winding canal, ducks and young women in traditional dress resting under a tree", vi: "Tranh toàn cảnh cánh đồng lúa vàng với dòng kênh uốn lượn, đàn vịt và các thiếu nữ trong trang phục truyền thống nghỉ dưới gốc cây" } },
  },
  {
    id: 26, title: "April's Arrived", vi: "Tháng Tư Về",
    series: "Portraits", seriesVi: "Chân Dung", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2026, w: 60, h: 80, tone: "peach",
    note: {
      en: "A woman in a vivid red áo dài sits at an upright piano, glancing down at an armful of white lilies, the flower that heralds April in Hanoi. The dress is built from bold, blocky strokes of red, orange and pink in a patchwork style, set against a hazy golden ground. May 2026.",
      vi: "Một thiếu nữ trong tà áo dài đỏ rực ngồi bên cây đàn piano, cúi nhìn bó hoa loa kèn trắng, loài hoa báo hiệu tháng Tư Hà Nội. Tà áo được vẽ bằng những mảng màu đỏ, cam, hồng táo bạo theo phong cách mảng miếng trên nền vàng mờ ảo. Tháng 5/2026.",
    },
    image: { src: "/artworks/april-returns.jpg", width: 1337, height: 1800, alt: { en: "Painting of a woman in a red áo dài seated at a piano, holding white lilies, in blocky patchwork brushwork", vi: "Tranh thiếu nữ áo dài đỏ ngồi bên đàn piano, cầm hoa loa kèn trắng, vẽ theo phong cách mảng miếng" } },
  },
  {
    id: 27, title: "Violet Dusk", vi: "Hoàng Hôn Tím",
    series: "Portraits", seriesVi: "Chân Dung", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2026, tone: "sage",
    note: {
      en: "A woman with flowing copper-red hair walks away through a vast field of violet blossoms, her sapphire gown swirling around her, toward a low sun glowing on the horizon. The whole scene is bathed in twilight purples, with tiny points of light scattered like fireflies. 2026.",
      vi: "Một thiếu nữ với mái tóc đỏ đồng xoã dài bước đi giữa cánh đồng hoa tím bát ngát, tà váy xanh tím thướt tha, hướng về mặt trời thấp đang toả sáng nơi chân trời. Cả khung cảnh chìm trong sắc tím hoàng hôn, điểm xuyết những đốm sáng li ti như đom đóm. Năm 2026.",
    },
    image: { src: "/artworks/violet-dusk.jpg", width: 1000, height: 1500, alt: { en: "Painting of a woman with long copper-red hair in a violet gown walking through a field of purple flowers toward a glowing sunset", vi: "Tranh thiếu nữ tóc đỏ đồng dài, váy tím, bước đi giữa cánh đồng hoa tím hướng về mặt trời lặn rực sáng" } },
  },
  {
    id: 28, title: "Far Out to Sea", vi: "Xa Khơi",
    series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2024, w: 50, h: 60, tone: "orange", available: false,
    note: {
      en: "A tall ship under full sail drives through heavy swells toward a blazing sunset, spray bursting from its bow as the sea rolls past in glassy green and white-capped crests. Fiery oranges and violets crowd the sky above, and the low sun scatters gold across the water. September 2024.",
      vi: "Con thuyền buồm lớn căng gió lao qua những con sóng cuộn, bọt nước tung trắng xoá dưới mũi tàu, hướng về hoàng hôn rực lửa. Bầu trời nhuộm cam và tím, mặt trời thấp rải ánh vàng lên mặt biển xanh ngọc. Tháng 9/2024.",
    },
    image: { src: "/artworks/far-out-to-sea.jpg", width: 1130, height: 1500, alt: { en: "Painting of a three-masted sailing ship cresting a wave under a fiery orange and violet sunset sky", vi: "Tranh con thuyền buồm ba cột vượt sóng dưới bầu trời hoàng hôn cam và tím rực lửa" } },
  },
  {
    id: 29, title: "Tu San Canyon, Nho Quế River", vi: "Hẻm Tu Sản, Sông Nho Quế",
    series: "Landscapes", seriesVi: "Phong Cảnh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 35, h: 55, tone: "green",
    note: {
      en: "A young couple sit close at the bow of a boat, gazing along the emerald Nho Quế River as it winds between the towering limestone walls of Tu San Canyon in Hà Giang. A small boat ahead trails a silver wake toward distant, sunlit peaks. February 2025.",
      vi: "Đôi trẻ ngồi sát bên nhau ở mũi thuyền, ngắm dòng sông Nho Quế xanh ngọc uốn quanh vách đá vôi sừng sững của hẻm Tu Sản, Hà Giang. Phía trước, một chiếc thuyền nhỏ để lại vệt nước bạc hướng về những đỉnh núi xa đầy nắng. Tháng 2/2025.",
    },
    image: { src: "/artworks/tu-san-canyon.jpg", width: 1230, height: 1500, alt: { en: "Painting of a couple seated at a boat's bow looking down an emerald river between tall limestone cliffs, in a cream and gold frame", vi: "Tranh đôi trẻ ngồi ở mũi thuyền nhìn dòng sông xanh ngọc giữa vách đá vôi cao, trong khung kem và vàng" } },
  },
  {
    id: 30, title: "Dance of the Plum Blossoms", vi: "Vũ Điệu Hoa Mận",
    series: "Portraits", seriesVi: "Chân Dung", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 60, h: 80, tone: "sage",
    note: {
      en: "A dancer in a flowing white dress, an embroidered sash and a red ribbon headband lifts her arms among orchards of plum blossom, petals drifting like snow around her. Misty violet mountains rise behind a meadow bright with spring grass. February 2025.",
      vi: "Một thiếu nữ trong tà váy trắng thướt tha, thắt lưng thêu và dải băng đỏ trên đầu giơ tay múa giữa vườn hoa mận, cánh hoa bay như tuyết quanh mình. Những dãy núi tím mờ sương nâng phía sau thảm cỏ xuân tươi sáng. Tháng 2/2025.",
    },
    image: { src: "/artworks/dance-of-the-plum-blossoms.jpg", width: 1108, height: 1500, alt: { en: "Painting of a dancer in a white dress with arms raised among white plum blossom trees, with misty mountains behind", vi: "Tranh thiếu nữ váy trắng giơ tay múa giữa những cây hoa mận trắng, núi mờ sương phía sau" } },
  },
  {
    id: 31, title: "Amitabha Buddha", vi: "Đức Phật A Di Đà",
    series: "Spiritual", seriesVi: "Tâm Linh", medium: "Acrylic on canvas", mediumVi: "Acrylic",
    year: 2025, w: 90, h: 120, tone: "warm", available: false,
    note: {
      en: "The Buddha's serene face emerges in luminous teal, amber and orange from a deep, dark ground, eyes lowered in meditation. Worked in thick palette-knife relief, the tiled strokes of the background and the gold-flecked curls of the crown catch the light. July 2025.",
      vi: "Gương mặt Đức Phật an nhiên hiện lên trong sắc lục lam, hổ phách và cam rực từ nền tối sâu thẳm, đôi mắt khép trong thiền định. Tranh được đắp nổi dày bằng dao bay; những mảng màu lát ngói ở nền và búi tóc ánh vàng đón sáng. Tháng 7/2025.",
    },
    image: { src: "/artworks/amitabha-buddha.jpg", width: 1108, height: 1500, alt: { en: "Textured palette-knife painting of the Buddha's face in teal, amber and orange against a dark tiled background", vi: "Tranh đắp nổi bằng dao bay gương mặt Đức Phật sắc lục lam, hổ phách và cam trên nền tối lát ngói" } },
  },
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
  { slug: "three-painters-16-ngo-quyen", place: "16 Ngô Quyền, Hà Nội", tone: "orange", up: true, name: { en: "Exhibition of Three Painters", vi: "Triển lãm tranh của ba họa sĩ" }, dates: { en: "16 – 25 Nov 2026", vi: "16 – 25/11/2026" }, status: { en: "Upcoming", vi: "Sắp tới" }, description: { en: "A group show of three painters — Kim Hương, Thu Hà and Thế Hùng — presented by the Vietnam Fine Arts Association (Hội Mỹ thuật Việt Nam) at its exhibition house, 16 Ngô Quyền, Hanoi. The opening ceremony is at 4:30 pm on 16 November 2026; the exhibition is then open daily from 9 am to 7 pm, 17 – 25 November. The invitation previews a figure in a red áo dài among white lilies, a blazing red rural landscape and a thickly textured vase of flowers.", vi: "Triển lãm tranh của ba họa sĩ — Kim Hương, Thu Hà và Thế Hùng — do Hội Mỹ thuật Việt Nam tổ chức tại Nhà triển lãm 16 Ngô Quyền, Hà Nội. Lễ khai mạc lúc 16 giờ 30 phút ngày 16/11/2026; triển lãm mở cửa hằng ngày từ 9 giờ đến 19 giờ, từ ngày 17/11 đến 25/11. Thiệp mời giới thiệu hình ảnh thiếu nữ áo dài đỏ bên hoa loa kèn trắng, một khung cảnh đồng quê đỏ rực và bình hoa vẽ chất liệu dày." } },
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
  { label: { en: "Address", vi: "Địa chỉ" }, value: { en: "6 Nam Hong Street, Thanh Xuan Ward\nHanoi, Vietnam", vi: "6 Nam Hồng, phường Thanh Xuân\nHà Nội, Việt Nam" } },
  { label: { en: "Hours", vi: "Giờ" }, value: { en: "By appointment\nMost afternoons", vi: "Theo hẹn\nThường vào buổi chiều" } },
  { label: { en: "Email", vi: "Email" }, value: { en: "hello@tranquilpalette.art", vi: "hello@tranquilpalette.art" } },
  { label: { en: "Phone", vi: "Điện thoại" }, value: { en: "+84 24 1234 5678", vi: "+84 24 1234 5678" } },
];
