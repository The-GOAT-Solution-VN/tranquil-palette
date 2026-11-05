import type { ImageRef } from "./types";

/** True when the image's intrinsic size is known and it is taller than wide. */
export function isPortrait(image: ImageRef | null | undefined): boolean {
  return !!image?.width && !!image?.height && image.height > image.width;
}

/**
 * padding-top for an exhibition image box. Portrait images (e.g. an invitation
 * card) keep their natural ratio so they are never cropped; everything else
 * uses the landscape `fallback` ratio.
 */
export function exhibitionPadding(
  image: ImageRef | null | undefined,
  fallback = "66%",
): string {
  if (isPortrait(image)) {
    return `${((image!.height! / image!.width!) * 100).toFixed(2)}%`;
  }
  return fallback;
}
