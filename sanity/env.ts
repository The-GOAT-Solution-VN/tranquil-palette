export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ruscd2pv";

/**
 * Whether a real Sanity project is configured. When false, the site renders
 * entirely from the local seed fallback (lib/seed.ts) so it never breaks
 * during initial setup, and we skip network fetches to a non-existent project.
 */
export const sanityConfigured = projectId !== "placeholder";
