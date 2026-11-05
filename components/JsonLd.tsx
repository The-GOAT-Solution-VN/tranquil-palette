const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tranquilpalette.art";

/** Structured data: the gallery as a LocalBusiness/ArtGallery and the artist as
 *  a Person. Helps Google rich results and AI answer engines. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ArtGallery", "LocalBusiness"],
        "@id": `${BASE}#gallery`,
        name: "Tranquil Palette",
        description:
          "A home gallery in Hanoi presenting the true-to-life paintings of Kim Pham, in oil and acrylic on canvas.",
        url: BASE,
        address: {
          "@type": "PostalAddress",
          streetAddress: "6 Nam Hong Street",
          addressLocality: "Thanh Xuan Ward, Hanoi",
          addressCountry: "VN",
        },
        email: "hello@tranquilpalette.art",
        telephone: "+84 24 1234 5678",
        founder: { "@id": `${BASE}#artist` },
        openingHours: "By appointment",
      },
      {
        "@type": "Person",
        "@id": `${BASE}#artist`,
        name: "Kim Pham",
        jobTitle: "Painter",
        nationality: "Vietnamese",
        description:
          "Hanoi painter working in oil and acrylic, who took up the brush at sixty and founded the home gallery Tranquil Palette.",
        worksFor: { "@id": `${BASE}#gallery` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
