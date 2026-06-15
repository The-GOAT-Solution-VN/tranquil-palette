import { defineField } from "sanity";

export const TONE_OPTIONS = [
  { title: "Sage", value: "sage" },
  { title: "Peach", value: "peach" },
  { title: "Gold", value: "gold" },
  { title: "Green", value: "green" },
  { title: "Orange", value: "orange" },
  { title: "Warm", value: "warm" },
];

/** Fallback gradient tone shown behind an image (or in place of a missing one). */
export const toneField = defineField({
  name: "tone",
  title: "Fallback tone",
  type: "string",
  options: { list: TONE_OPTIONS, layout: "radio" },
  initialValue: "sage",
  description: "Gradient shown if no image is set, ported from the original design.",
});

/** Standard image field with hotspot + required alt text for accessibility. */
export const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      description: "Describe the image for screen readers and SEO.",
    }),
  ],
});
