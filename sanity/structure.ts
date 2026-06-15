import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  ImageIcon,
  CalendarIcon,
  DocumentTextIcon,
  TagIcon,
  EnvelopeIcon,
} from "@sanity/icons";

const SINGLETONS = ["siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tranquil Palette")
    .items([
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("artwork").title("Artworks").icon(ImageIcon),
      S.documentTypeListItem("series").title("Series").icon(TagIcon),
      S.documentTypeListItem("exhibition").title("Exhibitions").icon(CalendarIcon),
      S.documentTypeListItem("journalPost").title("Journal").icon(DocumentTextIcon),
      S.divider(),
      S.documentTypeListItem("enquiry").title("Enquiries").icon(EnvelopeIcon),
    ]);

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Set(SINGLETONS);
