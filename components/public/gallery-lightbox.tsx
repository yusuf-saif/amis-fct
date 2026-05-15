"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function GalleryLightbox({ images, albumTitle }: { images: string[]; albumTitle: string }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((current) => (current === null ? current : (current + 1) % images.length));
      if (event.key === "ArrowLeft") setIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [images.length, index]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, currentIndex) => (
          <button className="public-photo-panel aspect-[4/3] overflow-hidden rounded-xl" key={image} onClick={() => setIndex(currentIndex)} type="button">
            <Image alt={`${albumTitle} photo ${currentIndex + 1}`} className="h-full w-full object-cover" height={480} src={image} unoptimized width={640} />
          </button>
        ))}
      </div>

      {index !== null ? (
        <div className="fixed inset-0 z-[var(--z-modal)] bg-black/80 p-4" onClick={() => setIndex(null)}>
          <div className="mx-auto flex h-full max-w-5xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <button aria-label="Previous photo" className="mr-3 rounded-full bg-white/10 px-4 py-3 text-white" onClick={() => setIndex((index - 1 + images.length) % images.length)} type="button">←</button>
            <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-black">
              <Image alt={`${albumTitle} enlarged photo ${index + 1}`} className="object-contain" fill src={images[index]} unoptimized />
            </div>
            <button aria-label="Next photo" className="ml-3 rounded-full bg-white/10 px-4 py-3 text-white" onClick={() => setIndex((index + 1) % images.length)} type="button">→</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
