import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageField, toneField } from "./shared";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "localeString",
    }),
    defineField({
      name: "date",
      title: "Date label",
      type: "string",
      description: 'Human label such as "May 2026".',
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Used for ordering.",
    }),
    { ...imageField },
    { ...toneField },
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localeBlockContent",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] },
    {
      title: "Published, newest",
      name: "published",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.en", subtitle: "date", media: "image" },
  },
});
