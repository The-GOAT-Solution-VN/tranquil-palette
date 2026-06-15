import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageField, toneField } from "./shared";

export const exhibition = defineType({
  name: "exhibition",
  title: "Exhibition",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (rule) => rule.required(),
    }),
    { ...imageField },
    { ...toneField },
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "On now", value: "current" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statusLabel",
      title: "Status label",
      type: "localeString",
      description: "Display label for the status pill (e.g. Upcoming / On now / Past).",
    }),
    defineField({
      name: "dates",
      title: "Dates",
      type: "localeString",
    }),
    defineField({
      name: "place",
      title: "Place",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
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
  ],
  preview: {
    select: { title: "name.en", subtitle: "status", media: "image" },
  },
});
