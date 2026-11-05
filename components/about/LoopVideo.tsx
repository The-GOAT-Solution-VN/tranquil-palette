"use client";

import { useEffect, useRef } from "react";

/**
 * Silent, controls-free looping video that fills its (relatively positioned)
 * parent. The loop's end is cross-faded into its start inside the file itself,
 * so the restart is seamless. Falls back to the poster frame when the visitor
 * prefers reduced motion.
 */
export function LoopVideo({
  mp4,
  webm,
  poster,
  label,
}: {
  mp4: string;
  webm?: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        v.pause();
      } else {
        v.play().catch(() => {});
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
      }}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
