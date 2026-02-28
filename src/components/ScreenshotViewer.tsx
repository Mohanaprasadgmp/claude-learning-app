'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Screenshot {
  src: string;
  alt: string;
}

interface Props {
  screenshots: Screenshot[];
  carousel?: boolean;
}

export default function ScreenshotViewer({ screenshots, carousel }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex(i => i !== null ? (i - 1 + screenshots.length) % screenshots.length : null);
  }, [screenshots.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex(i => i !== null ? (i + 1) % screenshots.length : null);
  }, [screenshots.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

  if (carousel) {
    return (
      <>
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshots[activeIndex].src}
              alt={screenshots[activeIndex].alt}
              className="w-full object-cover cursor-zoom-in"
              onClick={() => setLightboxIndex(activeIndex)}
            />

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIndex(i => (i - 1 + screenshots.length) % screenshots.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 p-2 text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveIndex(i => (i + 1) % screenshots.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 p-2 text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {activeIndex + 1} / {screenshots.length}
            </span>
            <div className="flex gap-1">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? 'w-4 bg-amber-500'
                      : 'w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshots[lightboxIndex].src}
                alt={screenshots[lightboxIndex].alt}
                className="max-h-[85vh] max-w-[85vw] rounded-xl shadow-2xl object-contain"
              />
              <span className="text-sm text-white/60">{lightboxIndex + 1} / {screenshots.length}</span>
            </div>
          </div>
        )}
      </>
    );
  }

  // Default: stacked
  return (
    <>
      {screenshots.map((shot, i) => (
        <div key={i} className="mt-6">
          <div
            className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm cursor-zoom-in"
            onClick={() => setLightboxIndex(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} className="w-full object-cover" />
          </div>
        </div>
      ))}

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshots[lightboxIndex].src}
            alt={screenshots[lightboxIndex].alt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
