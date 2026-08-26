"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";


interface GalleryItem {
  id: string;
  category: string;
  src: string;
  label: string;
  aspectRatio: string;
}

const categories = [
  { id: "all", label: "All Works" },
  { id: "photography", label: "Photography" },
  { id: "cinematography", label: "Cinematography" },
  { id: "content-creation", label: "Content Creation" },
  { id: "training", label: "Training" },
  { id: "events", label: "Events" },
];

function buildGallery(): GalleryItem[] {
  const items: GalleryItem[] = [];

  const categoryData = [
    { key: "photography", label: "Photography Session" },
    { key: "cinematography", label: "Cinematic Production" },
    { key: "content-creation", label: "Content Shoot" },
    { key: "training", label: "Training Session" },
    { key: "events", label: "Event Coverage" },
  ];

  const aspectRatios = [
    "aspect-[4/5]",
    "aspect-[3/4]",
    "aspect-[16/9]",
    "aspect-[1/1]",
    "aspect-[4/3]",
  ];

  categoryData.forEach(({ key, label }) => {
    items.push({
      id: `${key}-0`,
      category: key,
      src: `/${key}.jpg`,
      label: `${label} — Showcase`,
      aspectRatio: aspectRatios[0],
    });
    for (let i = 1; i <= 4; i++) {
      items.push({
        id: `${key}-${i}`,
        category: key,
        src: `/${key}-${i}.jpg`,
        label: `${label} 0${i}`,
        aspectRatio: aspectRatios[i % aspectRatios.length],
      });
    }
  });

  return items;
}

const galleryItems = buildGallery();

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0,
    );
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1,
    );
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <div className="bg-paper text-ink selection:bg-primary selection:text-paper min-h-screen">
      {/* PAGE HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-ink"
        >
          A Look At Our Craft
        </motion.h1>
      </section>

      {/* CATEGORY FILTER TABS */}
      <nav className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategory(category.id);
                  setLightboxIndex(null);
                }}
                className={`isolate relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                  isActive
                    ? "text-paper"
                    : "text-ink/70 hover:text-ink hover:bg-primary/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 z-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* GALLERY MASONRY GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative w-full ${item.aspectRatio} overflow-hidden rounded-2xl bg-ink/5 border border-ink/10 text-left block focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* OVERLAY ON HOVER */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <div className="flex items-center justify-between text-paper">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent block">
                          {item.category.replace("-", " ")}
                        </span>
                        <p className="text-base font-bold leading-tight mt-0.5">
                          {item.label}
                        </p>
                      </div>
                      <span className="p-2.5 rounded-full bg-paper/20 backdrop-blur-md text-paper shrink-0 ml-2">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close preview"
              className="absolute top-6 right-6 p-3 rounded-full bg-paper/10 text-paper hover:bg-paper/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* PREVIOUS BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-paper/10 text-paper hover:bg-paper/20 transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>

            {/* NEXT BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-paper/10 text-paper hover:bg-paper/20 transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* LIGHTBOX CONTAINER */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.label}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* FOOTER METADATA */}
              <div className="mt-4 flex items-center justify-between w-full max-w-2xl px-4 text-paper/80">
                <span className="text-xs font-semibold uppercase tracking-widest">
                  {currentLightboxItem.label}
                </span>
                <span className="text-xs font-mono text-paper/50">
                  {(lightboxIndex ?? 0) + 1} / {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing CTA */}
      {/* Closing CTA */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 border-t border-white/5" />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-4"
          >
            Like What You See?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-paper leading-[1.1]"
          >
            Let&apos;s Create <br />
            Your Next Story.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-paper transition-all hover:bg-paper hover:text-ink hover:scale-105"
            >
              <span>Book Us</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
