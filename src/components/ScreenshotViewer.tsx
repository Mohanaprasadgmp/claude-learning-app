'use client';

import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface Screenshot {
  src: string;
  alt: string;
}

interface Props {
  screenshots: Screenshot[];
}

export default function ScreenshotViewer({ screenshots }: Props) {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, close]);

  return (
    <>
      {screenshots.map((shot, i) => (
        <div key={i} className="mt-6">
          <div
            className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm cursor-zoom-in"
            onClick={() => setLightbox(shot)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} className="w-full object-cover" />
          </div>
        </div>
      ))}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
