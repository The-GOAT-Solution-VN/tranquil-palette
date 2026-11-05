/**
 * Static UI microcopy (nav labels, button text, section overlines, form labels).
 * Transcribed verbatim from the original export's `STR` dictionary.
 *
 * Editorial content (artworks, journal, exhibitions) and the larger, frequently
 * edited page copy live in Sanity (see `siteSettings`); this dictionary covers
 * the UI chrome that ships with the interface itself.
 */
export type Lang = "EN" | "VI";

export const messages = {
  EN: {
    navHome: "Home", navGallery: "Gallery", navAbout: "About", navJournal: "Journal", navExhibitions: "Exhibitions", navVisit: "Visit", navVisitCta: "Visit",
    heroEyebrow: "A home gallery in Hanoi", heroTitleA: "Where stillness", heroTitleB: "becomes colour", heroSub: "The private gallery of Kim Pham — true-to-life paintings in oil and acrylic, drawn from a quiet, attentive life in Hanoi.", heroCta1: "Enter the gallery", heroCta2: "Read her story",
    metaHoursL: "Open hours", metaHoursV: "By appointment", metaMediumL: "Medium", metaMediumV: "Oil & Acrylic", metaWhereL: "Location", metaWhereV: "Hanoi, Vietnam",
    featOver: "On the walls", featTitle: "Selected works", viewWork: "View work", viewAll: "View the full collection",
    exOver: "Now on view", exTitle: "Upcoming exhibition", exBadge: "Opening soon", exName: "Seasons of a Quiet Life", exDates: "15 Aug – 30 Sep 2026", exPlace: "Tranquil Palette, Hanoi", exDesc: "A gathering of thirty paintings tracing a single year — lotus to lily, mist to amber autumn — in the rooms where they were made.", exCta: "See all exhibitions",
    aboutOver: "The artist", aboutTeaseTitle: "A passion found, unhurried", aboutTeaseP1: "Kim Pham spent a lifetime as an accountant, caring for her family and quietly setting aside a love of art. At sixty, newly retired, she finally picked up the brush.", aboutTeaseP2: "What began in a few classes became a calling. Today, more than thirty paintings fill the rooms of her home — now a gallery — in Hanoi.", aboutCta: "Read her full story",
    journalOver: "From the studio", journalTitle: "Journal", journalCta: "All entries", readMore: "Read more", featuredPost: "Featured",
    footerBlurb: "A home gallery in Hanoi presenting the true-to-life paintings of Kim Pham, in oil and acrylic on canvas.", footExplore: "Explore", footVisit: "Visit", footAddr1: "6 Nam Hong Street, Thanh Xuan Ward", footAddr2: "Hanoi, Vietnam", footHours: "Open by appointment", footFollow: "Stay close", footNews: "Notes on new work, seasons, and open days — a few times a year.", footEmail: "Your email",
    galOver: "The collection", galTitle: "The Collection", galSub: "More than thirty paintings of Hanoi and its quiet moments. Choose how you would like to wander.", galMedium: "Medium", galLayout: "Layout",
    aboutPageOver: "The artist", aboutPageTitle: "Kim Pham", aboutPageLede: "“I paint the moments that pass around me — so that they stay a little longer.”", dropcap: "M",
    story1: "rs. Kim Pham was born and raised in Hanoi. For her entire working life she was an accountant, devoting herself to her family and rarely imagining she might one day pursue the artistic passion she carried quietly within.",
    story2: "When she retired at the age of sixty, she found herself with time at last. Alongside travelling to places she had never been, she began to pick up the brushes and attend a few art classes — modest beginnings, undertaken simply for the joy of them.",
    story3: "She excelled in every class she attended. Her true-to-life style — capturing the moments unfolding around her — soon gained attention. From a handful of friends, her name began to be mentioned in Hanoi’s art circles, passed quietly from one admirer to the next.",
    story4: "Today, with more than thirty paintings to her name, she has opened her own gallery at home — Tranquil Palette — where she is, at last, living fully her passion for the fine arts.",
    homeGalOver: "The home gallery", homeGalTitle: "Tea, light, and paintings on the wall", homeGalP: "Tranquil Palette is not a white-walled institution but a home, opened with warmth. Visits are intimate and unhurried — a chance to sit with the work, and often with the artist herself.", homeGalCta: "Plan your visit",
    journalPageTitle: "Journal", journalPageSub: "Notes from the studio — on seasons, materials, and the moments that become paintings.",
    exPageOver: "Exhibitions", exPageTitle: "Exhibitions", exPageSub: "Open days and shows at Tranquil Palette and beyond.",
    visitOver: "Come and see", visitTitle: "Visit the gallery", visitSub: "Tranquil Palette opens its doors by appointment. Write to arrange a quiet afternoon among the paintings.",
    formTitle: "Arrange a visit", formSub: "Tell us a little about when you’d like to come, and we’ll be in touch warmly.", formName: "Your name", formEmail: "Email", formSubject: "Subject", formMessage: "Your message", formBtn: "Send request", formSent: "Thank you — we’ll reply soon", formError: "Something went wrong. Please try again.",
    mapTag: "Thanh Xuan Ward, Hanoi", lbMedium: "Medium", lbSize: "Size", lbYear: "Year", lbCollection: "Collection", lbPrivate: "Private collection", lbDetails: "Details", lbHideDetails: "Hide", lbEnquire: "Enquire about this work", portraitTag: "Kim Pham in her studio",
    seriesAll: "All", mediumAll: "All",
    newsletterBtn: "Subscribe", newsletterSent: "Subscribed",
  },
  VI: {
    navHome: "Trang chủ", navGallery: "Phòng tranh", navAbout: "Giới thiệu", navJournal: "Nhật ký", navExhibitions: "Triển lãm", navVisit: "Ghé thăm", navVisitCta: "Ghé thăm",
    heroEyebrow: "Phòng tranh tại gia — Hà Nội", heroTitleA: "Nơi tĩnh lặng", heroTitleB: "hoá sắc màu", heroSub: "Phòng tranh riêng của Phạm Hương — những bức tranh sơn dầu và acrylic chân thực, vẽ nên từ một cuộc sống bình dị ở Hà Nội.", heroCta1: "Vào phòng tranh", heroCta2: "Câu chuyện của bà",
    metaHoursL: "Giờ mở cửa", metaHoursV: "Theo hẹn", metaMediumL: "Chất liệu", metaMediumV: "Sơn dầu & Acrylic", metaWhereL: "Địa điểm", metaWhereV: "Hà Nội, Việt Nam",
    featOver: "Trên tường", featTitle: "Tác phẩm chọn lọc", viewWork: "Xem tranh", viewAll: "Xem toàn bộ bộ sưu tập",
    exOver: "Đang trưng bày", exTitle: "Triển lãm sắp tới", exBadge: "Sắp khai mạc", exName: "Bốn Mùa Bình Dị", exDates: "15/08 – 30/09 2026", exPlace: "Tranquil Palette, Hà Nội", exDesc: "Ba mươi bức tranh kể lại một năm — từ sen đến loa kèn, từ sương sớm đến thu vàng — ngay trong căn phòng nơi chúng ra đời.", exCta: "Xem tất cả triển lãm",
    aboutOver: "Hoạ sĩ", aboutTeaseTitle: "Đam mê tìm thấy, thong thả", aboutTeaseP1: "Phạm Hương dành cả đời làm kế toán, chăm lo cho gia đình và lặng lẽ cất giữ tình yêu hội hoạ. Ở tuổi sáu mươi, khi về hưu, bà mới thực sự cầm cọ.", aboutTeaseP2: "Bắt đầu từ vài lớp học, hội hoạ trở thành tiếng gọi. Nay hơn ba mươi bức tranh lấp đầy ngôi nhà của bà ở Hà Nội — giờ đã thành một phòng tranh.", aboutCta: "Đọc trọn câu chuyện",
    journalOver: "Từ xưởng vẽ", journalTitle: "Nhật ký", journalCta: "Tất cả bài viết", readMore: "Đọc tiếp", featuredPost: "Nổi bật",
    footerBlurb: "Phòng tranh tại gia ở Hà Nội, giới thiệu những bức tranh sơn dầu và acrylic chân thực của hoạ sĩ Phạm Hương.", footExplore: "Khám phá", footVisit: "Ghé thăm", footAddr1: "6 Nam Hồng, phường Thanh Xuân", footAddr2: "Hà Nội, Việt Nam", footHours: "Mở cửa theo hẹn", footFollow: "Kết nối", footNews: "Đôi dòng về tranh mới, mùa và ngày mở cửa — vài lần mỗi năm.", footEmail: "Email của bạn",
    galOver: "Bộ sưu tập", galTitle: "Bộ Sưu Tập", galSub: "Hơn ba mươi bức tranh về Hà Nội và những khoảnh khắc tĩnh lặng. Chọn cách bạn muốn thưởng lãm.", galMedium: "Chất liệu", galLayout: "Bố cục",
    aboutPageOver: "Hoạ sĩ", aboutPageTitle: "Phạm Hương", aboutPageLede: "“Tôi vẽ những khoảnh khắc trôi qua quanh mình — để chúng ở lại lâu hơn một chút.”", dropcap: "B",
    story1: "à Phạm Hương sinh ra và lớn lên ở Hà Nội. Cả đời đi làm, bà là một kế toán, dành trọn cho gia đình và hiếm khi dám nghĩ một ngày nào đó sẽ theo đuổi niềm đam mê nghệ thuật vẫn lặng lẽ mang trong lòng.",
    story2: "Khi về hưu ở tuổi sáu mươi, bà mới có thời gian cho riêng mình. Bên cạnh những chuyến đi đến nơi chưa từng đặt chân, bà bắt đầu cầm cọ và tham gia vài lớp học vẽ — những khởi đầu giản dị, chỉ vì niềm vui.",
    story3: "Bà xuất sắc trong mọi lớp học. Phong cách chân thực — ghi lại những khoảnh khắc diễn ra quanh mình — nhanh chóng được chú ý. Từ một nhóm bạn nhỏ, tên bà bắt đầu được nhắc đến trong các hội nhóm hội hoạ ở Hà Nội.",
    story4: "Nay với hơn ba mươi tác phẩm, bà đã mở phòng tranh riêng tại nhà — Tranquil Palette — nơi bà, cuối cùng, được sống trọn vẹn với đam mê mỹ thuật.",
    homeGalOver: "Phòng tranh tại gia", homeGalTitle: "Trà, ánh sáng và tranh trên tường", homeGalP: "Tranquil Palette không phải một bảo tàng tường trắng, mà là một mái nhà mở ra với sự ấm áp. Mỗi lần ghé thăm đều thân tình và thong thả — để ngồi lại với tranh, và thường là với chính hoạ sĩ.", homeGalCta: "Lên kế hoạch ghé thăm",
    journalPageTitle: "Nhật ký", journalPageSub: "Đôi dòng từ xưởng vẽ — về mùa, chất liệu và những khoảnh khắc trở thành tranh.",
    exPageOver: "Triển lãm", exPageTitle: "Triển Lãm", exPageSub: "Những ngày mở cửa và trưng bày tại Tranquil Palette và hơn thế.",
    visitOver: "Đến và xem", visitTitle: "Ghé thăm phòng tranh", visitSub: "Tranquil Palette mở cửa theo hẹn. Hãy nhắn để cùng sắp xếp một buổi chiều yên tĩnh giữa những bức tranh.",
    formTitle: "Hẹn một buổi ghé thăm", formSub: "Cho chúng tôi biết bạn muốn đến khi nào, chúng tôi sẽ sớm hồi âm.", formName: "Tên của bạn", formEmail: "Email", formSubject: "Tiêu đề", formMessage: "Lời nhắn", formBtn: "Gửi yêu cầu", formSent: "Cảm ơn bạn — chúng tôi sẽ sớm hồi âm", formError: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    mapTag: "Phường Thanh Xuân, Hà Nội", lbMedium: "Chất liệu", lbSize: "Kích thước", lbYear: "Năm", lbCollection: "Sưu tầm", lbPrivate: "Bộ sưu tập tư nhân", lbDetails: "Chi tiết", lbHideDetails: "Thu gọn", lbEnquire: "Hỏi về bức tranh này", portraitTag: "Phạm Hương trong xưởng vẽ",
    seriesAll: "Tất cả", mediumAll: "Tất cả",
    newsletterBtn: "Đăng ký", newsletterSent: "Đã đăng ký",
  },
};

export type Messages = (typeof messages)["EN"];
export type MessageKey = keyof Messages;

export function getMessages(lang: Lang): Messages {
  return messages[lang];
}
