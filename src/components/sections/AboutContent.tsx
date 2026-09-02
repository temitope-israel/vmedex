"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Real production types from the client's own About copy
const productionTypes = [
  "Commercials",
  "Corporate Films",
  "Documentaries",
  "Music Videos",
  "Events",
  "Real Estate Films",
  "Social Media Content",
  "Studio Productions",
  "Podcasts",
  "Live Streaming",
];

const philosophy = [
  { line: "We create with purpose." },
  { line: "We produce with precision." },
  { line: "We tell stories that last." },
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
      {/* 1. HERO */}
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
            We Turn Visions Into
            <span className="block italic font-serif font-normal text-primary mt-2">
              Visual Experiences.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg text-ink/60"
          >
            This is VMedex Digital. Your vision. Our craft. One unforgettable
            story.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR STORY — full copy, nothing trimmed */}
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
              Our Story
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-ink leading-snug">
              Every story deserves to be told with intention.
            </h2>
          </motion.div>

          <div className="lg:col-span-8 space-y-8 text-xl text-ink/80 leading-relaxed font-light">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              VMedex Digital is a creative media production company built on one
              simple belief: every story deserves to be told with intention.
              What started from a passion for visual storytelling has grown into
              a production brand committed to helping businesses, brands,
              organizations, churches, creatives, and individuals bring their
              ideas to life through powerful visual content.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We don&apos;t simply point a camera and press record. We take time
              to understand the idea, the message, the audience, and the emotion
              behind every project. From the first concept to the final frame,
              we combine creative direction, cinematography, production,
              technology, and storytelling to create work that connects.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Whether we&apos;re producing a cinematic brand film or managing a
              complex multi-camera live production, our goal remains the same:
              to create visuals that communicate, inspire, and leave a lasting
              impression.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              At VMedex, we believe great production is more than beautiful
              pictures. It is about purpose, precision, creativity, and
              execution. That&apos;s why we continue to invest in people,
              equipment, technology, and knowledge.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl font-medium text-ink border-l-4 border-accent pl-6 py-1"
            >
              We don&apos;t just build productions; we build people. Every
              project is an opportunity for our team to learn, improve,
              experiment, and become better storytellers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE PRODUCE — interactive chip cloud (covers "our productions span...") */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-ink/40">
            What We Produce
          </span>
          <h2 className="text-3xl font-bold tracking-tight mt-1">
            One Team, Every Format
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {productionTypes.map((type, index) => (
            <motion.span
              key={type}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.06 }}
              className="cursor-default rounded-full border border-ink/10 bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {type}
            </motion.span>
          ))}
        </div>
      </section>

      {/* 4. VISUAL STRIP */}
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

      {/* 5. PHILOSOPHY — dark spotlight triad */}
      <section className="bg-ink text-paper py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-accent mb-6 block"
          >
            Our Philosophy
          </motion.span>

          <div className="mt-12 flex flex-col gap-4">
            {philosophy.map(({ line }, index) => (
              <motion.h3
                key={line}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="text-3xl sm:text-5xl font-bold tracking-tight text-paper/85 hover:text-paper transition-colors cursor-default"
              >
                {line}
              </motion.h3>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-paper/60 max-w-xl mx-auto"
          >
            Today, VMedex Digital is growing as a creative production company
            with a vision to deliver world-class visual experiences from Nigeria
            to the world.
          </motion.p>
        </div>
      </section>

     
      {/* 6. SUMMARY — the client's second "About VMedex Digital" block, as a distinct closing statement */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-widest text-primary mb-6 block"
        >
          About VMedex Digital
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-medium text-ink leading-snug"
        >
          VMedex Digital is a creative media production company transforming
          ideas into powerful visual experiences — combining creativity,
          technology, and technical excellence to bring every vision to life.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 text-lg text-ink/60"
        >
          But for us, production is more than what happens in front of the
          camera. It&apos;s about people, purpose, and the story behind every
          frame.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-xl font-semibold text-primary"
        >
          We create with intention. We produce with precision. And we tell
          stories that deserve to be remembered.
        </motion.p>
      </section>

      {/* 7. CLOSING CTA */}
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
