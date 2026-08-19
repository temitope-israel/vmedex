"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutTeaser() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative h-80 sm:h-96 rounded-2xl overflow-hidden"
      >
        <Image
          src="/training.jpg"
          alt="Behind the scenes at VMedex Digital"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Pill badge — matches the label style used in Services */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Who We Are</span>
        </div>

        <h2 className="text-3xl font-bold text-ink tracking-tight sm:text-4xl">
          A Creative Media Partner, Not Just a Vendor
        </h2>

        <p className="mt-5 text-base text-ink/65 leading-relaxed">
          VMedex Digital is a creative media and digital solutions company
          focused on capturing, creating, and delivering compelling visual
          experiences for individuals, brands, organisations, and events. We
          combine creativity, technical expertise, and storytelling to produce
          content that goes beyond simply documenting moments.
        </p>

        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          More About Us <ArrowUpRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
