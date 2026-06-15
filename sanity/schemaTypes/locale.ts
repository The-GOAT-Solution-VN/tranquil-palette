import { defineField, defineType } from "sanity";

/**
 * Lightweight field-level localization for a two-language site (EN + VI).
 * A simple `{ en, vi }` object keeps GROQ trivial (`title.en`) and matches the
 * frontend `loc()` helper. (For many locales, prefer the internationalized-array
 * plugin; for two it would be overkill.)
 */
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "vi", title: "Tiếng Việt", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
    defineField({ name: "vi", title: "Tiếng Việt", type: "text", rows: 3 }),
  ],
});

const simpleBlocks = [
  {
    type: "block" as const,
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [{ title: "Bullet", value: "bullet" }],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
      annotations: [],
    },
  },
];

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "array", of: simpleBlocks }),
    defineField({ name: "vi", title: "Tiếng Việt", type: "array", of: simpleBlocks }),
  ],
});
