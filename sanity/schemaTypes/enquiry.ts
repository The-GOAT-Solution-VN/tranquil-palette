import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Visit enquiries submitted through the contact form. Written by the
 * `/api/contact` route handler (server-side, with a write token). Read-only in
 * the Studio so editors can triage without editing submissions.
 */
export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Visit form", value: "visit" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Artwork enquiry", value: "artwork" },
        ],
      },
    }),
    defineField({ name: "artworkTitle", title: "Artwork", type: "string" }),
    defineField({ name: "createdAt", title: "Received", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "newest",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "subject", description: "createdAt" },
  },
});
