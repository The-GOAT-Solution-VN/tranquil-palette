import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/** Server-only client with a write token, used to persist contact enquiries. */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
