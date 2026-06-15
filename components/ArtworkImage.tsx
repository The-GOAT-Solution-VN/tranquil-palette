import Image from "next/image";
import { toneGradient, type Tone } from "@/lib/tones";
import type { ImageRef } from "@/lib/types";

/**
 * Renders an aspect-ratio box backed by the gradient "tone" from the original
 * design. When a real Sanity image exists it overlays via next/image; otherwise
 * the gradient stands in — so the layout is always complete.
 */
export function ArtworkImage({
  image,
  tone,
  paddingTop,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  className,
  zoom = false,
}: {
  image: ImageRef | null;
  tone: Tone;
  /** Aspect ratio expressed as a CSS padding-top value, e.g. "122%". */
  paddingTop: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div
      data-zoom={zoom ? "" : undefined}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        paddingTop,
        background: toneGradient(tone),
        transition: zoom
          ? "transform .7s cubic-bezier(.2,.7,.2,1)"
          : undefined,
      }}
    >
      {image?.url && (
        <Image
          src={image.url}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
}
