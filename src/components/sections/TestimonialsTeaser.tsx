"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "VMedex Digital transformed our brand identity with their high-production commercial shoot. The cinematic lighting and color grading exceeded every expectation.",
    name: "Dr. Alistair Vance",
    role: "Director, Apex Medical Group",
    category: "Commercial Film",
    rating: 5,
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    quote:
      "The live coverage for our annual corporate summit was flawless. Multi-camera streaming without a single hitch, and the post-event highlight reel blew our board away.",
    name: "Sarah Jenkins",
    role: "Head of Marketing, Horizon Tech",
    category: "Event Coverage",
    rating: 5,
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    quote:
      "Their photography team has an incredible eye for detail. The studio portrait session captured the exact editorial tone our luxury publication needed.",
    name: "Michael Sterling",
    role: "Creative Director, Lumina Media",
    category: "Studio Photography",
    rating: 5,
    avatar: "/avatars/avatar-3.jpg",
  },
  {
    quote:
      "From pre-production concepts to final delivery, VMedex brought unmatched professionalism. The social content series drove our highest engagement quarter to date.",
    name: "Elena Rostova",
    role: "Brand Strategist, Velvet & Co.",
    category: "Content Series",
    rating: 5,
    avatar: "/avatars/avatar-4.jpg",
  },
  {
    quote:
      "Hands-down the best video editing and production workshop our team has attended. Practical, hands-on, and packed with industry-standard workflows.",
    name: "David Kalu",
    role: "Lead Creator, Vantage Studios",
    category: "Media Training",
    rating: 5,
    avatar: "/avatars/avatar-5.jpg",
  },
];

export default function TestimonialsTeaser() {
  const [index, setIndex] = useState(0);

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (newIndex: number) => {
    setIndex((newIndex + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section className="relative bg-ink py-24 px-6 overflow-hidden text-paper">
      {/* Background Decorative Ambient Flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-paper">
          What Clients Say
        </h2>
        <p className="mt-4 text-sm sm:text-base text-paper/60 max-w-lg mx-auto">
          Trusted by industry leaders, corporate partners, and brands to deliver
          uncompromising visual excellence.
        </p>
      </motion.div>

      {/* Main Glassmorphic Testimonial Card Container */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl min-h-[320px] flex flex-col justify-between">
          {/* Top Row: Category Tag & Rating Stars */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
              {current.category}
            </span>

            <div className="flex items-center gap-1 text-primary">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary" />
              ))}
            </div>
          </div>

          {/* Animated Quote Content */}
          <div className="my-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <Quote className="absolute -top-6 -left-4 w-10 h-10 text-primary/15 pointer-events-none" />
                <p className="text-lg sm:text-2xl font-medium text-paper/90 leading-relaxed italic relative z-10">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/30 bg-white/10 flex-shrink-0">
                    {/* Fallback avatar box if image isn't loaded */}
                    <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/10">
                      {current.name.charAt(0)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-paper uppercase tracking-wider">
                      {current.name}
                    </h3>
                    <p className="text-xs text-paper/50 font-mono mt-0.5">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Nav Bar: Controls & Counter */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {/* Slide Counter */}
            <span className="text-xs font-mono text-paper/40 tracking-widest uppercase">
              [ 0{index + 1} / 0{testimonials.length} ]
            </span>

            {/* Pagination Lines */}
            <div className="hidden sm:flex items-center gap-2">
              {testimonials.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => goTo(dotIndex)}
                  aria-label={`Go to testimonial ${dotIndex + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-paper/70 hover:text-paper hover:bg-white/15 transition-all active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-paper/70 hover:text-paper hover:bg-white/15 transition-all active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
