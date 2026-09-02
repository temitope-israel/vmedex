"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Quote,
  Star,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const categories = [
  "All",
  "Commercial Film",
  "Event Coverage",
  "Studio Photography",
  "Content Series",
  "Media Training",
  "Brand Campaigns",
];

const featuredTestimonial = {
  category: "Commercial Film",
  quote:
    "VMedex Digital brought incredible creative discipline and cinematic vision to our flagship product campaign. The final assets elevated our entire brand positioning across global markets.",
  name: "Amina Bello",
  role: "Creative Director — Horizon Creative",
  metric: "+240% Campaign Reach",
  rating: 5,
};

const testimonials = [
  {
    category: "Event Coverage",
    quote:
      "Rapid execution with zero compromise on quality. The live coverage team captured every crucial moment during our multi-day conference effortlessly.",
    name: "Tunde Olanrewaju",
    role: "Lead Strategist — Apex Summit",
    rating: 5,
  },
  {
    category: "Studio Photography",
    quote:
      "Sharp lighting, crisp composition, and extremely fast delivery. They understood our visual guidelines instantly and executed flawlessly.",
    name: "Chidimma Eze",
    role: "Founder — Atelier 93",
    rating: 5,
  },
  {
    category: "Content Series",
    quote:
      "They helped us build a consistent monthly video workflow. Our organic social engagement metrics tripled within the first quarter.",
    name: "Marcus Vance",
    role: "Head of Growth — Lumina Labs",
    rating: 5,
  },
  {
    category: "Media Training",
    quote:
      "Structured, practical, and highly engaging. Our media team gained immediate hands-on technical skills for in-house video production.",
    name: "Funke Adebayo",
    role: "Communications Lead — Elevate Africa",
    rating: 5,
  },
  {
    category: "Brand Campaigns",
    quote:
      "A seamless collaboration from script conceptualization to final color grading. A true production powerhouse.",
    name: "David K.",
    role: "Marketing VP — Nexus Digital",
    rating: 5,
  },
];

export default function TestimonialsContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredList =
    activeCategory === "All"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <div className="bg-ink text-paper min-h-screen selection:bg-primary selection:text-paper">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Endorsements</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-paper leading-none">
              Client <span className="text-primary">Stories.</span>
            </h1>
          </div>
          <p className="text-sm text-paper/60 max-w-sm leading-relaxed">
            Discover how we collaborate with brands, institutions, and creators
            to deliver high-impact media production.
          </p>
        </div>

        {/* FEATURED SPOTLIGHT BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/15 overflow-hidden"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-mono font-bold uppercase text-primary">
                  Spotlight Feature - {featuredTestimonial.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(featuredTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>

              <Quote size={36} className="text-primary/40" />

              <p className="text-xl sm:text-2xl font-medium text-paper leading-relaxed italic">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-paper font-mono font-bold text-base">
                  {featuredTestimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-paper">
                    {featuredTestimonial.name}
                  </h3>
                  <p className="text-xs text-paper/50 font-mono mt-0.5">
                    {featuredTestimonial.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-3 text-center lg:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
                Impact Metric
              </span>
              <div className="text-3xl font-black text-paper uppercase tracking-tight">
                {featuredTestimonial.metric}
              </div>
              <p className="text-xs text-paper/60 leading-relaxed">
                Measured impact across brand social channels post-campaign
                release.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CATEGORY NAV */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-mono uppercase text-paper/40 mr-2">
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                  isActive
                    ? "bg-primary text-paper border-primary"
                    : "bg-white/[0.02] text-paper/60 border-white/10 hover:border-white/30 hover:text-paper"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ASYMMETRIC GRID */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredList.map((t) => (
              <motion.div
                key={t.name + t.category}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                      {t.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-paper/80 leading-relaxed italic pt-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-xs font-mono font-bold text-paper">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-paper uppercase tracking-wider">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-paper/50 font-mono mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* FOOTER CALLOUT */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-primary shrink-0" size={20} />
            <span className="text-xs text-paper/70 font-mono uppercase tracking-wider">
              Verified client testimonials & production reviews
            </span>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary hover:text-paper transition-colors"
          >
            <span>Start a project with us</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sparkles, Quote, Star, ArrowUpRight } from "lucide-react";

// const categories = [
//   "All Work",
//   "Commercial Film",
//   "Event Coverage",
//   "Studio Photography",
//   "Content Series",
//   "Media Training",
//   "Brand Campaigns",
// ];

// const testimonials = [
//   {
//     category: "Commercial Film",
//     quote:
//       "VMedex Digital captured our brand identity with unmatched visual precision. The lighting, pacing, and storytelling exceeded our expectations across every deliverable.",
//     name: "Amina Bello",
//     role: "Creative Director — Horizon Creative",
//     rating: 5,
//     featured: true,
//   },
//   {
//     category: "Event Coverage",
//     quote:
//       "Seamless execution from start to finish. The team operated with absolute professionalism on-site and delivered high-impact highlights within 24 hours.",
//     name: "Tunde Olanrewaju",
//     role: "Lead Strategist — Apex Summit",
//     rating: 5,
//     featured: false,
//   },
//   {
//     category: "Studio Photography",
//     quote:
//       "The attention to detail during our product and portrait shoots was world-class. Sharp composition, rich tones, and prompt post-production turnaround.",
//     name: "Chidimma Eze",
//     role: "Founder — Atelier 93",
//     rating: 5,
//     featured: false,
//   },
//   {
//     category: "Content Series",
//     quote:
//       "They transformed our social media video strategy into an engaging episodic series. Engagement metrics across platforms tripled within the first month.",
//     name: "Marcus Vance",
//     role: "Head of Growth — Lumina Labs",
//     rating: 5,
//     featured: false,
//   },
//   {
//     category: "Media Training",
//     quote:
//       "Hands-on, actionable, and structured. Our internal communications team walked away with professional camera confidence and production workflows.",
//     name: "Funke Adebayo",
//     role: "Communications Lead — Elevate Africa",
//     rating: 5,
//     featured: false,
//   },
//   {
//     category: "Brand Campaigns",
//     quote:
//       "From script writing to master deliverables, VMedex delivered a commercial asset that resonated deeply with our audience and scaled effortlessly.",
//     name: "David K.",
//     role: "Marketing VP — Nexus Digital",
//     rating: 5,
//     featured: false,
//   },
// ];

// export default function TestimonialsContent() {
//   const [activeCategory, setActiveCategory] = useState("All Work");

//   const filteredTestimonials =
//     activeCategory === "All Work"
//       ? testimonials
//       : testimonials.filter((t) => t.category === activeCategory);

//   return (
//     <div className="bg-ink text-paper min-h-screen selection:bg-primary selection:text-paper">
//       <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-16">
//         {/* PAGE HEADER */}
//         <div className="max-w-3xl mx-auto text-center space-y-4">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-widest text-primary"
//           >
//             <Sparkles className="w-3.5 h-3.5" />
//             <span>Client Endorsements</span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-paper leading-none"
//           >
//             Proof In <span className="text-primary">Production.</span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-sm sm:text-base text-paper/60 leading-relaxed max-w-xl mx-auto"
//           >
//             Feedback and testimonials from partners, brands, and creative teams
//             we have collaborated with across visual disciplines.
//           </motion.p>
//         </div>

//         {/* CATEGORY FILTER PILLS */}
//         <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
//           {categories.map((cat) => {
//             const isActive = activeCategory === cat;
//             return (
//               <button
//                 key={cat}
//                 type="button"
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border ${
//                   isActive
//                     ? "bg-primary text-paper border-primary shadow-lg shadow-primary/20"
//                     : "bg-white/[0.03] text-paper/60 border-white/10 hover:border-white/30 hover:text-paper"
//                 }`}
//               >
//                 {cat}
//               </button>
//             );
//           })}
//         </div>

//         {/* TESTIMONIAL GRID */}
//         <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <AnimatePresence mode="popLayout">
//             {filteredTestimonials.map((t) => (
//               <motion.div
//                 key={t.category + t.name}
//                 layout
//                 initial={{ opacity: 0, scale: 0.96 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.96 }}
//                 transition={{ duration: 0.3 }}
//                 className="group relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col justify-between hover:border-primary/50 transition-all duration-300"
//               >
//                 <div className="space-y-6">
//                   {/* TOP CARD BAR */}
//                   <div className="flex items-center justify-between gap-4">
//                     <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
//                       {t.category}
//                     </span>

//                     <div className="flex items-center gap-1 text-amber-400">
//                       {[...Array(t.rating)].map((_, i) => (
//                         <Star key={i} size={12} fill="currentColor" />
//                       ))}
//                     </div>
//                   </div>

//                   <Quote
//                     className="text-primary/30 group-hover:text-primary transition-colors duration-300"
//                     size={28}
//                   />

//                   <p className="text-sm text-paper/80 leading-relaxed italic">
//                     &ldquo;{t.quote}&rdquo;
//                   </p>
//                 </div>

//                 {/* AUTHOR DETAILS */}
//                 <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/10">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold font-mono text-primary border border-primary/30">
//                     {t.name.charAt(0)}
//                   </div>
//                   <div className="overflow-hidden">
//                     <p className="text-xs font-bold text-paper uppercase tracking-wider truncate">
//                       {t.name}
//                     </p>
//                     <p className="text-[11px] text-paper/50 font-mono truncate mt-0.5">
//                       {t.role}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* CTA INVITATION */}
//         <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 text-center max-w-3xl mx-auto space-y-4">
//           <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-paper">
//             Ready To Launch Your Campaign?
//           </h2>
//           <p className="text-xs sm:text-sm text-paper/60 max-w-md mx-auto">
//             Book a consultation with our team to discuss project specifications,
//             timelines, and deliverables.
//           </p>
//           <div className="pt-2">
//             <a
//               href="/contact"
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors"
//             >
//               <span>Get In Touch</span>
//               <ArrowUpRight size={14} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { motion } from "motion/react";
// import { Quote, Sparkles } from "lucide-react";

// // Placeholder testimonials — clearly marked as samples, not real client quotes.
// // Swap for real feedback once the client provides it.
// const categories = [
//   "Commercial Film",
//   "Event Coverage",
//   "Studio Photography",
//   "Content Series",
//   "Media Training",
//   "Brand Campaigns",
// ];

// const testimonials = categories.map((category) => ({
//   category,
//   quote:
//     "This is a placeholder testimonial. Real client feedback for this category will be featured here once available.",
//   name: "Sample Client",
//   role: `Placeholder — ${category}`,
// }));

// export default function TestimonialsContent() {
//   return (
//     <div className="bg-ink min-h-screen">
//       {/* Page header */}
//       <section className="max-w-3xl mx-auto px-6 pt-32 pb-16 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
//         >
//           <Sparkles className="w-3.5 h-3.5" />
//           <span>Client Feedback</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.15 }}
//           className="text-4xl font-bold tracking-tight text-paper sm:text-6xl"
//         >
//           What Clients Say
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.25 }}
//           className="mt-4 text-base text-paper/60"
//         >
//           Real reviews are being gathered — this page shows how they&apos;ll be
//           presented once published.
//         </motion.p>
//       </section>

//       {/* Testimonial grid */}
//       <section className="max-w-6xl mx-auto px-6 pb-32">
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map((t, index) => (
//             <motion.div
//               key={t.category}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
//               className="relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col"
//             >
//               <span className="self-start px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[11px] font-mono font-semibold uppercase tracking-wider text-primary mb-6">
//                 {t.category}
//               </span>

//               <Quote className="text-primary/20" size={28} />
//               <p className="mt-4 text-sm text-paper/80 italic leading-relaxed flex-1">
//                 {t.quote}
//               </p>

//               <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/10">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
//                   {t.name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-paper uppercase tracking-wider">
//                     {t.name}
//                   </p>
//                   <p className="text-xs text-paper/50 font-mono mt-0.5">
//                     {t.role}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
