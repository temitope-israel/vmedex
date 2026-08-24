"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const values = [
  "Creativity",
  "Excellence",
  "Professionalism",
  "Storytelling",
  "Innovation",
];

const galleryItems = [
  { src: "/photography.jpg", title: "Photography", category: "Visual Arts" },
  {
    src: "/cinematography.jpg",
    title: "Cinematography",
    category: "Film Production",
  },
  {
    src: "/content-creation.jpg",
    title: "Content Creation",
    category: "Digital Media",
  },
  { src: "/events.jpg", title: "Event Coverage", category: "Live Experiences" },
];

export default function AboutContent() {
  return (
    <div className="bg-paper text-ink min-h-screen selection:bg-accent selection:text-ink">
      {/* 1. HERO SECTION - Editorial High-Impact */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>About VMedex</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] max-w-5xl"
          >
            We don&apos;t just capture moments.
            <span className="block italic font-serif font-normal text-primary mt-2">
              We create visual experiences.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* 2. BRAND STORY - Asymmetric Split Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-ink/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-3">
              Brand Story
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-ink leading-snug">
              Positioned at the intersection of modern art and digital media.
            </h2>
          </motion.div>

          <div className="lg:col-span-8 space-y-8 text-xl text-ink/80 leading-relaxed font-light">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              VMedex Digital is a creative media and digital solutions company
              focused on capturing, creating, and delivering compelling visual
              experiences for individuals, brands, organisations, and events.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We operate across photography, cinematography, content creation,
              media production, training, and event coverage — combining
              creativity, technical expertise, and storytelling to produce
              content that goes beyond simply documenting moments.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-medium text-ink border-l-4 border-accent pl-6 py-1"
            >
              We position ourselves as a professional, modern, creative, and
              reliable media partner — capable of handling both individual
              projects and corporate engagements.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 3. VISUAL STRIP - Interactive Hover Cards */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-ink/40">
              Our Process
            </span>
            <h2 className="text-3xl font-bold tracking-tight mt-1">
              A Glimpse Into How We Work
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[420px] rounded-3xl overflow-hidden bg-ink/5 cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-paper">
                <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. VALUES SECTION - Dark Spotlight List */}
      <section className="bg-ink text-paper py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-accent mb-6 block"
          >
            What We Stand For
          </motion.span>

          <div className="divide-y divide-paper/10 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="py-8 group flex items-center justify-between cursor-default transition-colors hover:px-4 duration-300"
              >
                <span className="text-xs font-mono text-paper/40 group-hover:text-accent transition-colors">
                  0{index + 1}
                </span>
                <h3 className="text-3xl sm:text-6xl font-bold tracking-tight text-paper/80 group-hover:text-paper group-hover:scale-105 transition-all duration-300">
                  {value}
                </h3>
                <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-accent transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA - Banner Style */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="bg-gradient-to-br from-primary/10 via-paper to-accent/10 rounded-3xl p-10 sm:p-20 border border-ink/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
              Ready to create something beyond expectations?
            </h2>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-5 text-sm font-bold uppercase tracking-widest text-paper hover:bg-primary transition-colors shadow-xl"
            >
              <span>Book Us</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
