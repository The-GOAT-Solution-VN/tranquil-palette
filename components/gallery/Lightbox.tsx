"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { toneGradient } from "@/lib/tones";
import type { Artwork } from "@/lib/types";

/**
 * Full-screen artwork viewer.
 *
 * Layout (see `.tp-lb*` in globals.css):
 *  - Phones / narrow screens: a column — slim top bar, the painting filling all
 *    remaining space, and a compact caption below that expands on demand.
 *  - Wide or landscape screens: the painting on the left, the full caption on
 *    the right.
 * The overlay is `position: fixed; inset: 0` (not 100vh/100dvh) so it always
 * matches the visible screen, including iOS Safari's collapsing toolbars.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Artwork[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { loc } = useLang();
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const a = items[index];

  const step = useCallback(
    (dir: number) => {
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  // Keyboard: Esc / arrows. Scroll lock + initial focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // Simple focus trap within the dialog.
        const focusables = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [step, onClose]);

  if (!a) return null;

  const title = loc(a.title) ?? "Artwork";

  // Swipe left / right on the painting to move between works.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current =
      e.touches.length === 1
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      step(dx < 0 ? 1 : -1);
    }
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-testid="lightbox"
      className="tp-lb"
    >
      <div className="tp-lb-bar">
        <div className="tp-lb-count" aria-live="polite">
          {index + 1} / {items.length}
        </div>
        <button type="button" aria-label="Close" className="tp-lb-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="tp-lb-body">
        <div
          className="tp-lb-stage"
          data-testid="lb-stage"
          onClick={(e) => {
            // A tap on the empty space around the painting closes the viewer.
            if (e.target === e.currentTarget) onClose();
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {a.image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={a.id}
              className="tp-lb-img"
              src={a.image.url}
              alt={loc(a.image.alt) ?? title}
              decoding="async"
              draggable={false}
            />
          ) : (
            <div
              className="tp-lb-img tp-lb-ph"
              style={{
                aspectRatio: a.w && a.h ? `${a.w} / ${a.h}` : "4 / 5",
                background: toneGradient(a.tone),
              }}
            />
          )}
          <button type="button" aria-label="Previous" data-testid="lb-prev" className="tp-lb-btn tp-lb-nav tp-lb-prev" onClick={() => step(-1)}>‹</button>
          <button type="button" aria-label="Next" data-testid="lb-next" className="tp-lb-btn tp-lb-nav tp-lb-next" onClick={() => step(1)}>›</button>
        </div>

        {/* Keyed by artwork so the expanded state resets when you move on. */}
        <Caption key={a.id} a={a} />
      </div>
    </div>
  );
}

function Caption({ a }: { a: Artwork }) {
  const { t, loc } = useLang();
  const [open, setOpen] = useState(false);
  const size = a.w && a.h ? `${a.w} × ${a.h} cm` : "";
  const summary = [loc(a.medium), size, a.year].filter(Boolean).join(" · ");

  return (
    <div className="tp-lb-cap" data-open={open}>
      <div className="tp-lb-head">
        <div className="tp-lb-headtext">
          <div className="tp-lb-series">{loc(a.series)}</div>
          <h2 className="tp-lb-title">{loc(a.title)}</h2>
          <div className="tp-lb-vi">{a.title.vi}</div>
          <div className="tp-lb-meta">{summary}</div>
        </div>
        <button
          type="button"
          className="tp-lb-toggle"
          aria-expanded={open}
          aria-controls="tp-lb-more"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? t.lbHideDetails : t.lbDetails}
        </button>
      </div>

      <p className="tp-lb-note">{loc(a.note)}</p>

      <div className="tp-lb-more" id="tp-lb-more">
        <dl className="tp-lb-dl">
          <dt>{t.lbMedium}</dt><dd>{loc(a.medium)}</dd>
          {size && (<><dt>{t.lbSize}</dt><dd>{size}</dd></>)}
          <dt>{t.lbYear}</dt><dd>{a.year}</dd>
          {!a.available && (<><dt>{t.lbCollection}</dt><dd>{t.lbPrivate}</dd></>)}
        </dl>
        <Link
          href={`/visit?artwork=${encodeURIComponent(loc(a.title) ?? "")}`}
          className="tp-cta-gold tp-lb-cta"
        >
          {t.lbEnquire}
        </Link>
      </div>
    </div>
  );
}
