import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageField, toneField } from "./shared";

export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  icon: ImageIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      group: "content",
      validation: (rule) => rule.required(),
    }),
    { ...imageField, group: "content" },
    { ...toneField, group: "content" },
    defineField({
      name: "note",
      title: "Note",
      type: "localeText",
      group: "content",
      description: "Short description shown in the lightbox.",
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "series" }],
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "localeString",
      group: "details",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "details",
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: "widthCm",
      title: "Width (cm)",
      type: "number",
      group: "details",
    }),
    defineField({
      name: "heightCm",
      title: "Height (cm)",
      type: "number",
      group: "details",
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
      group: "details",
    }),
    defineField({
      name: "featured",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
      group: "details",
    }),
  ],
  orderings: [
    { title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "Year, newest", name: "year", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.en", subtitle: "year", media: "image" },
  },
});
