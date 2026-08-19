// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Play,
//   ArrowUpRight,
//   Sparkles,
//   Film,
//   Camera,
//   Award,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// // Reels / Featured media cards
// const heroReels = [
//   {
//     id: "cinematography",
//     label: "Cinematography",
//     title: "Brand Storytelling & 4K Cinema",
//     poster: "/hero-poster.jpg",
//     video: "/hero-video.mp4",
//   },
//   {
//     id: "photography",
//     label: "Photography",
//     title: "Commercial & Studio Photography",
//     poster: "/photography.jpg",
//     video: "/hero-video.mp4",
//   },
// ];

// export default function Hero() {
//   const [activeReel, setActiveReel] = useState(heroReels[0]);

//   return (
//     <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-black text-white flex items-center pt-20 pb-12 overflow-hidden">
//       {/* Subtle Background Glow */}
//       <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
//         {/* Left Column: Editorial Typography & CTAs (7 Cols) */}
//         <div className="lg:col-span-7 flex flex-col items-start">
//           {/* Eyebrow Pill */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-6"
//           >
//             <Sparkles className="w-3.5 h-3.5" />
//             <span>Creative Production Studio</span>
//           </motion.div>

//           {/* Main Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]"
//           >
//             We Capture <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-white/70">
//               Moments.
//             </span>{" "}
//             <br />
//             We Craft Stories.
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="mt-6 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed font-normal"
//           >
//             High-end photography, cinematography, and strategic content creation
//             built for brands, high-profile events, and individuals who demand
//             visual excellence.
//           </motion.p>

//           {/* CTAs */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
//           >
//             <Link
//               href="/contact"
//               className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
//             >
//               <span>Book Us Now</span>
//               <ArrowUpRight className="w-4 h-4" />
//             </Link>

//             <Link
//               href="/portfolio"
//               className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/5 border border-white/15 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/25 transition-all duration-300"
//             >
//               <span>Explore Portfolio</span>
//             </Link>
//           </motion.div>

//           {/* Metrics Grid */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full max-w-lg"
//           >
//             <div>
//               <span className="text-2xl sm:text-3xl font-bold text-white block">
//                 500+
//               </span>
//               <span className="text-[11px] font-mono uppercase text-white/50 tracking-wider">
//                 Shoots Delivered
//               </span>
//             </div>
//             <div>
//               <span className="text-2xl sm:text-3xl font-bold text-white block">
//                 4K HDR
//               </span>
//               <span className="text-[11px] font-mono uppercase text-white/50 tracking-wider">
//                 Mastered Quality
//               </span>
//             </div>
//             <div>
//               <span className="text-2xl sm:text-3xl font-bold text-white block">
//                 100%
//               </span>
//               <span className="text-[11px] font-mono uppercase text-white/50 tracking-wider">
//                 Satisfaction
//               </span>
//             </div>
//           </motion.div>
//         </div>

//         {/* Right Column: Framed Media Showcase (5 Cols) */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="lg:col-span-5 relative"
//         >
//           {/* Main Video Frame */}
//           <div className="relative h-[460px] sm:h-[540px] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeReel.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="relative h-full w-full"
//               >
//                 <video
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   poster={activeReel.poster}
//                   className="absolute inset-0 h-full w-full object-cover"
//                 >
//                   <source src={activeReel.video} type="video/mp4" />
//                 </video>

//                 {/* Dark Vignette Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

//                 {/* Top Camera HUD Overlay */}
//                 <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] font-mono text-white/70 uppercase tracking-widest z-10">
//                   <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
//                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//                     <span>REC // 4K RAW</span>
//                   </div>
//                   <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
//                     FPS 60.0
//                   </span>
//                 </div>

//                 {/* Bottom Media Card info */}
//                 <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-white z-10">
//                   <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block mb-1">
//                     {activeReel.label} Showcase
//                   </span>
//                   <h3 className="text-base font-bold">{activeReel.title}</h3>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Reel Selector Buttons Floating Below */}
//           <div className="mt-4 flex items-center gap-3">
//             {heroReels.map((reel) => (
//               <button
//                 key={reel.id}
//                 onClick={() => setActiveReel(reel)}
//                 className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
//                   activeReel.id === reel.id
//                     ? "bg-primary border-primary text-paper shadow-md"
//                     : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
//                 }`}
//               >
//                 {reel.id === "cinematography" ? (
//                   <Film className="w-3.5 h-3.5" />
//                 ) : (
//                   <Camera className="w-3.5 h-3.5" />
//                 )}
//                 <span>{reel.label}</span>
//               </button>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

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
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-3 h-3 fill-black ml-0.5" />
            </div>
            <span>View Showreel</span>
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

// "use client";

// import { motion } from "motion/react";
// import { ChevronDown } from "lucide-react";
// import Button from "@/components/ui/Button";

// export default function Hero() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {/* Background video - muted, looped, autoplay for a cinematic backdrop */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         poster="/hero-poster.jpg"
//         className="absolute inset-0 h-full w-full object-cover"
//       >
//         <source src="/hero-video.mp4" type="video/mp4" />
//       </video>

//       {/* Dark gradient overlay - keeps text legible over any footage */}
//       <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/75 to-ink/90" />

//       {/*  Hero Content*/}
//       <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
//         <motion.p
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-sm font-semibold uppercase tracking-[0.3em] text-accent"
//         >
//           Beyond Content. Beyond Expectations.
//         </motion.p>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="mt-4 max-w-3xl text-4xl font-semibold text-paper sm:text-6xl"
//         >
//           We Capture Moments.<br/> We Create Experiences.
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.6 }}
//           className="mt-6 max-w-xl text-base text-paper/80 sm:text-lg"
//         >
//           Photography, cinematograpy, and creative storytelling for brands,
//           events, and individuals who expect more.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.8 }}
//           className="mt-10 flex flex-col gap-4 sm:flex-row"
//         >
//           <Button href="/contact">Book Us</Button>
//           <Button href="/portfolio" variant="outline-dark">
//             View Portfolio
//           </Button>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//       initial={{opacity: 0}}
//       animate={{opacity:1, y: [0, 8, 0]}}
//       transition={{
//         opacity: {duration: 0.6, delay: 1.2},
//         y: {duration: 1.6, repeat: Infinity, ease: "easeInOut"}
//       }}
//       className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-paper/70"
//       >
//         <ChevronDown size={28}/>
//       </motion.div>
//     </section>
//   );
// }
