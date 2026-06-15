import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText, localeBlockContent } from "./locale";
import { series } from "./series";
import { artwork } from "./artwork";
import { exhibition } from "./exhibition";
import { journalPost } from "./journalPost";
import { siteSettings } from "./siteSettings";
import { enquiry } from "./enquiry";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  localeString,
  localeText,
  localeBlockContent,
  // Documents
  siteSettings,
  series,
  artwork,
  exhibition,
  journalPost,
  enquiry,
];
