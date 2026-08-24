"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
      <nav className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-2 mb-16">
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
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                isActive
                  ? "text-paper"
                  : "text-ink/70 hover:text-ink hover:bg-ink/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {category.label}
            </button>
          );
        })}
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
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import Image from "next/image";
// import { X, Sparkles } from "lucide-react";

// // Category filter options — "All" plus one per service line
// const categories = [
//   { id: "all", label: "All" },
//   { id: "photography", label: "Photography" },
//   { id: "cinematography", label: "Cinematography" },
//   { id: "content-creation", label: "Content Creation" },
//   { id: "training", label: "Training" },
//   { id: "events", label: "Events" },
// ];

// // Build the gallery items — 5 images per category, generic captions
// // (not real project names — swap for real portfolio pieces once client provides them)
// function buildGallery() {
//   const items: { id: string; category: string; src: string; label: string }[] =
//     [];

//   const categoryData = [
//     { key: "photography", label: "Photography Session" },
//     { key: "cinematography", label: "Cinematic Production" },
//     { key: "content-creation", label: "Content Shoot" },
//     { key: "training", label: "Training Session" },
//     { key: "events", label: "Event Coverage" },
//   ];

//   categoryData.forEach(({ key, label }) => {
//     // First image has no suffix (e.g. "photography.jpg"), the rest are numbered
//     items.push({ id: `${key}-0`, category: key, src: `/${key}.jpg`, label });
//     for (let i = 1; i <= 4; i++) {
//       items.push({
//         id: `${key}-${i}`,
//         category: key,
//         src: `/${key}-${i}.jpg`,
//         label,
//       });
//     }
//   });

//   return items;
// }

// const galleryItems = buildGallery();

// export default function PortfolioContent() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [lightboxItem, setLightboxItem] = useState<
//     (typeof galleryItems)[number] | null
//   >(null);

//   // Filter the gallery based on the selected category
//   const filteredItems =
//     activeCategory === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.category === activeCategory);

//   return (
//     <div className="bg-paper">
//       {/* Page header */}
//       <section className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
//         >
//           <Sparkles className="w-3.5 h-3.5" />
//           <span>Our Portfolio</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.15 }}
//           className="text-4xl font-bold tracking-tight text-ink sm:text-6xl leading-[1.15]"
//         >
//           A Look At Our Craft
//         </motion.h1>
//       </section>

//       {/* Category filter buttons */}
//       <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-3 mb-12">
//         {categories.map((category) => {
//           const isActive = activeCategory === category.id;
//           return (
//             <button
//               key={category.id}
//               type="button"
//               onClick={() => setActiveCategory(category.id)}
//               className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
//                 isActive
//                   ? "bg-primary text-paper"
//                   : "bg-ink/5 text-ink/70 hover:bg-ink/10"
//               }`}
//             >
//               {category.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Gallery grid */}
//       <section className="max-w-6xl mx-auto px-6 pb-24">
//         <motion.div
//           layout
//           className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
//         >
//           <AnimatePresence>
//             {filteredItems.map((item) => (
//               <motion.button
//                 key={item.id}
//                 type="button"
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 onClick={() => setLightboxItem(item)}
//                 className="group relative h-48 sm:h-56 overflow-hidden rounded-xl"
//               >
//                 <Image
//                   src={item.src}
//                   alt={item.label}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors" />
//               </motion.button>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </section>

//       {/* Lightbox — full-screen expanded view */}
//       <AnimatePresence>
//         {lightboxItem && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-6"
//             onClick={() => setLightboxItem(null)}
//           >
//             <button
//               type="button"
//               onClick={() => setLightboxItem(null)}
//               aria-label="Close preview"
//               className="absolute top-6 right-6 text-paper/70 hover:text-paper transition-colors"
//             >
//               <X size={28} />
//             </button>

//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.95 }}
//               transition={{ duration: 0.25 }}
//               className="relative h-[80vh] w-full max-w-4xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Image
//                 src={lightboxItem.src}
//                 alt={lightboxItem.label}
//                 fill
//                 className="object-contain"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
