"use client";

import { motion } from "motion/react";
import { ChevronDown, Play, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  // Smoothly scrolls to whatever section follows the Hero when the indicator is clicked
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-90"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Multi-layer dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/60" />
      {/* Radial vignette — darkens edges, keeps center lighter, genuine cinematic falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)] opacity-80 pointer-events-none" />

      {/* Viewfinder Camera Elements (HUD) */}
      <div className="absolute inset-8 pointer-events-none hidden md:flex flex-col justify-between z-20">
        {/* Top HUD Line */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-white/50 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-semibold">REC</span>
            <span>[RAW 4K]</span>
          </div>
          <span>FPS 60.00</span>
          <span>TC 00:01:24:08</span>
        </div>

        {/* Viewfinder Framing Corners */}
        <div className="relative w-full h-full my-4">
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/30" />
          <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/30" />
          <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/30" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/30" />
        </div>

        {/* Bottom HUD Line */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase">
          <span>ISO 800</span>
          <span>5600K</span>
          <span>1/50 SHUTTER</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Beyond Content. Beyond Expectations.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          We Capture Moments. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
            We Create Experiences.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-base sm:text-xl text-white/80 font-normal leading-relaxed"
        >
          High-end photography, cinematography, and creative visual storytelling
          for ambitious brands, high-profile events, and individuals who demand
          excellence.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-paper text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>Book A Session</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Secondary Showreel Play Button */}
          <Link
            href="/training"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-3 h-3 fill-black ml-0.5" />
            </div>
            <span>Register for Training</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Bottom Trust Line — generic, no unverified figures until client confirms real numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 hidden sm:flex items-center gap-8 text-xs font-mono tracking-wider text-white/50 border-t border-white/10 pt-6"
        >
          <div>
            <strong className="text-white block text-sm font-sans font-bold">
              Trusted
            </strong>
            By Brands & Events
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div>
            <strong className="text-white block text-sm font-sans font-bold">
              4K HDR
            </strong>
            Mastered Output
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div>
            <strong className="text-white block text-sm font-sans font-bold">
              Full-Service
            </strong>
            Creative Partner
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator — now actually scrolls when clicked */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}
