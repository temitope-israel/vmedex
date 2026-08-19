"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Play,
  Sparkles,
  Film,
  Camera,
  Video,
  Sparkle,
} from "lucide-react";
import Link from "next/link";

const featured = [
  {
    id: "cinema",
    number: "01",
    image: "/cinematography.jpg",
    caption: "Cinematic Production",
    category: "Video",
    icon: Film,
    description:
      "High-end commercial films, narrative visual stories, and brand documentaries.",
  },
  {
    id: "portrait",
    number: "02",
    image: "/photography.jpg",
    caption: "Studio Portrait Session",
    category: "Photography",
    icon: Camera,
    description:
      "High-fashion editorials, studio headshots, and fine-art portrait photography.",
  },
  {
    id: "event",
    number: "03",
    image: "/events.jpg",
    caption: "Live Event Coverage",
    category: "Events",
    icon: Video,
    description:
      "Multi-camera live streaming, corporate summits, and concert cinematography.",
  },
  {
    id: "content",
    number: "04",
    image: "/content-creation.jpg",
    caption: "Brand Content Series",
    category: "Content",
    icon: Sparkle,
    description:
      "Short-form social visual series and dynamic campaign creative assets.",
  },
];

export default function FeaturedWork() {
  const [activeHover, setActiveHover] = useState<string | null>("cinema");

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Portfolio</span>
        </div>

        <h2 className="text-3xl font-bold text-ink sm:text-5xl tracking-tight">
          A Glimpse Into What We Do
        </h2>

        <p className="mt-4 max-w-xl text-sm sm:text-base text-ink/65 leading-relaxed">
          Hover over each category to explore our creative capabilities across
          photography, cinematography, and digital campaigns.
        </p>
      </motion.div>

      {/* Horizontal Interactive Film Accordion */}
      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[480px] w-full">
        {featured.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = activeHover === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveHover(item.id)}
              className={`relative overflow-hidden rounded-3xl transition-all duration-500 ease-out border border-ink/10 shadow-sm ${
                isExpanded
                  ? "lg:flex-[2.5] bg-ink text-white shadow-2xl border-primary/40"
                  : "lg:flex-1 bg-ink/5 text-ink hover:border-ink/25"
              } h-[320px] lg:h-full cursor-pointer`}
            >
              <Link href="/portfolio" className="relative block h-full w-full">
                {/* Image Background */}
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isExpanded
                      ? "scale-105 filter brightness-90"
                      : "scale-100 filter brightness-75 group-hover:scale-105"
                  }`}
                />

                {/* Dark Vignette Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 transition-opacity duration-300 ${
                    isExpanded ? "opacity-90" : "opacity-75"
                  }`}
                />

                {/* Card Content Container */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 text-white">
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-primary/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {item.number}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Bar: Title & Category details */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {item.category}
                    </span>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                      {item.caption}
                    </h3>

                    {/* Expanded Only Description & CTA */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? "max-h-24 opacity-100 mt-2"
                          : "max-h-0 opacity-0 lg:opacity-0"
                      }`}
                    >
                      <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <span>Explore Portfolio</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <Link
          href="/portfolio"
          className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>View Full Portfolio</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { ArrowUpRight, Play, Sparkles } from "lucide-react";
// import Link from "next/link";

// const featured = [
//   {
//     image: "/cinematography.jpg",
//     caption: "Cinematic Production",
//     category: "Video",
//     tag: "4K Cinema",
//     span: "md:col-span-7 h-[360px] sm:h-[420px]",
//   },
//   {
//     image: "/photography.jpg",
//     caption: "Studio Portrait Session",
//     category: "Photography",
//     tag: "Editorial",
//     span: "md:col-span-5 h-[360px] sm:h-[420px]",
//   },
//   {
//     image: "/events.jpg",
//     caption: "Live Event Coverage",
//     category: "Events",
//     tag: "Live Multi-Cam",
//     span: "md:col-span-5 h-[360px] sm:h-[420px]",
//   },
//   {
//     image: "/content-creation.jpg",
//     caption: "Brand Content Series",
//     category: "Content",
//     tag: "Digital Campaign",
//     span: "md:col-span-7 h-[360px] sm:h-[420px]",
//   },
// ];

// export default function FeaturedWork() {
//   return (
//     <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
//       {/* Section Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 0.6 }}
//         className="flex flex-col items-center text-center mb-16"
//       >
//         <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
//           <Sparkles className="w-3.5 h-3.5" />
//           <span>Our Portfolio</span>
//         </div>

//         <h2 className="text-3xl font-bold text-ink sm:text-5xl tracking-tight">
//           A Glimpse Into What We Do
//         </h2>

//         <p className="mt-4 max-w-xl text-sm sm:text-base text-ink/65 leading-relaxed">
//           High-end visuals engineered for modern brands — exploring storytelling
//           through cinematography, photography, and live event production.
//         </p>
//       </motion.div>

//       {/* Featured Editorial Grid */}
//       <div className="grid gap-6 md:grid-cols-12">
//         {featured.map(({ image, caption, category, tag, span }, index) => (
//           <motion.div
//             key={caption}
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             className={span}
//           >
//             <Link
//               href="/portfolio"
//               className="group relative block h-full w-full overflow-hidden rounded-3xl border border-ink/10 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl"
//             >
//               {/* Background Image with Dynamic Zoom */}
//               <Image
//                 src={image}
//                 alt={caption}
//                 fill
//                 className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//               />

//               {/* Multi-stage Cinematic Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

//               {/* Corner Tag / Reticle Identifier */}
//               <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
//                 <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold uppercase tracking-wider text-white/90">
//                   {tag}
//                 </span>
//               </div>

//               {/* Bottom Card Details */}
//               <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
//                 <span className="text-xs font-bold uppercase tracking-widest text-primary">
//                   {category}
//                 </span>

//                 <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
//                   {caption}
//                 </h3>

//                 {/* Animated Hover Reveal CTA */}
//                 <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
//                     Explore Category
//                   </span>

//                   <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-paper transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-primary/30">
//                     <ArrowUpRight className="w-4 h-4" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* Footer Portfolio Button */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//         className="mt-16 flex justify-center"
//       >
//         <Link
//           href="/portfolio"
//           className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
//         >
//           <span>View Full Portfolio</span>
//           <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//         </Link>
//       </motion.div>
//     </section>
//   );
// }
