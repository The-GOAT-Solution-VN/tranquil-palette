import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField } from "./shared";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About / Artist" },
    { name: "contact", title: "Visit & Contact" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero / home
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "heroTitleA",
      title: "Hero title (line, plain)",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "heroTitleB",
      title: "Hero title (emphasis)",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "heroSub",
      title: "Hero subtitle",
      type: "localeText",
      group: "hero",
    }),
    // About / artist
    defineField({
      name: "artistName",
      title: "Artist name",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "aboutLede",
      title: "About lede (quote)",
      type: "localeText",
      group: "about",
    }),
    defineField({
      name: "story",
      title: "Story paragraphs",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "p1", title: "Paragraph 1", type: "localeText" }),
        defineField({ name: "p2", title: "Paragraph 2", type: "localeText" }),
        defineField({ name: "p3", title: "Paragraph 3", type: "localeText" }),
        defineField({ name: "p4", title: "Paragraph 4", type: "localeText" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "localeString" }),
          ],
          preview: { select: { title: "value", subtitle: "label.en" } },
        }),
      ],
    }),
    // Visit & contact
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "visitInfo",
      title: "Visit info rows",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "localeString" }),
            defineField({ name: "value", title: "Value", type: "localeText" }),
          ],
          preview: { select: { title: "label.en", subtitle: "value.en" } },
        }),
      ],
    }),
    // SEO
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "seo",
    }),
    { ...imageField, name: "ogImage", title: "Default social image", group: "seo" },
    defineField({
      name: "metaDescription",
      title: "Default meta description",
      type: "localeText",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
