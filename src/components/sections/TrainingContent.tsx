"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Lightbulb,
  LayoutGrid,
  Scissors,
  Move3d,
  BookOpen,
  Radio,
  Calendar,
  MapPin,
  Wallet,
  MessageCircle,
  Phone,
  Mail,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clapperboard,
  Plus,
} from "lucide-react";

const curriculum = [
  {
    num: "01",
    icon: Camera,
    label: "Camera Mastery",
    desc: "Manual exposure, focal geometry, depth of field & optics selection.",
  },
  {
    num: "02",
    icon: Lightbulb,
    label: "Cinematic Lighting",
    desc: "Keying, ambient fill, diffusion techniques & high-key vs low-key mood.",
  },
  {
    num: "03",
    icon: LayoutGrid,
    label: "Framing & Composition",
    desc: "Rule of thirds, golden ratio, subject blocking & spatial depth.",
  },
  {
    num: "04",
    icon: Move3d,
    label: "Camera Movement",
    desc: "Gimbal operations, dolly tracking, organic handheld & shot rhythm.",
  },
  {
    num: "05",
    icon: Scissors,
    label: "Post-Production Suite",
    desc: "Color wheels, LUT application, audio mixing & non-linear editing.",
  },
  {
    num: "06",
    icon: BookOpen,
    label: "Visual Direction",
    desc: "Deconstructing scripts, shot listing, storyboarding & directing talent.",
  },
  {
    num: "07",
    icon: Radio,
    label: "Live Broadcast",
    desc: "Multi-camera switching rigs, continuous video signal & live stream gear.",
  },
];

const REGISTER_URL = "https://vmedexdigital.com/registration-form/";

export default function TrainingContentV4() {
  return (
    <div className="bg-paper text-ink selection:bg-accent selection:text-ink min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <section className="border-b border-ink/10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Editorial Index */}
          <div className="flex items-center justify-between border-b border-ink/10 pb-6 mb-12">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-ink">
                VMEDEX ACADEMY
              </span>
            </div>
            <span className="text-xs font-mono text-ink/50 uppercase tracking-widest hidden sm:inline">
              LAGOS, NIGERIA
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary mb-4 block">
                [ 3-WEEK PRACTICAL CINEMATOGRAPHY ]
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-ink leading-[0.9]">
                VISUAL <br />
                <span className="text-primary italic font-serif font-normal">
                  STORY
                </span>
                TELLING
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="text-base text-ink/70 leading-relaxed">
                A hands-on, high-intensity bootcamp focused on real studio
                equipment. Master camera control, lighting setups, and
                post-production.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RegisterButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAILS LEDGER --- */}
      <section className="border-b border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto grid divide-y md:divide-y-0 md:divide-x divide-ink/10 md:grid-cols-4">
          <LedgerItem
            title="PROGRAM DATES"
            main="Oct 12 – Oct 31"
            sub="3 Weeks Intensive"
          />
          <LedgerItem
            title="LOCATION"
            main="Lagos, Nigeria"
            sub="Physical Studio Access"
          />
          <LedgerItem
            title="TUITION FEE"
            main="₦250,000"
            sub="Installment Plans Open"
          />
          <LedgerItem
            title="CERTIFICATION"
            main="Verified Award"
            sub="Portfolio Film Defense"
          />
        </div>
      </section>

      {/* --- CURRICULUM LIST / TABLE --- */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 border-b border-ink/10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
              SYLLABUS INDEX
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink mt-2">
              Curriculum Modules
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/50 uppercase tracking-widest">
            7 COMPREHENSIVE UNITS
          </p>
        </div>

        {/* List Rows */}
        <div className="divide-y divide-ink/10">
          {curriculum.map(({ num, icon: Icon, label, desc }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="py-8 grid sm:grid-cols-12 gap-4 items-center hover:bg-white/80 transition-colors px-4 -mx-4 rounded-xl group"
            >
              <div className="sm:col-span-1 text-xs font-mono font-bold text-ink/30 group-hover:text-primary transition-colors">
                {num}
              </div>

              <div className="sm:col-span-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-paper transition-colors">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-bold text-ink">{label}</h3>
              </div>

              <div className="sm:col-span-6 text-sm text-ink/60 leading-relaxed">
                {desc}
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <Plus
                  size={18}
                  className="text-ink/20 group-hover:text-primary group-hover:rotate-45 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TUITION BANNER --- */}
      <section className="bg-ink text-paper py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
              ENROLLMENT INFORMATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mt-4">
              SECURE YOUR SLOT
            </h2>
            <p className="mt-6 text-paper/70 leading-relaxed max-w-lg">
              Cohorts are kept strictly limited to ensure direct access to
              lighting rigs, camera bodies, and 1-on-1 feedback from active
              industry directors.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider text-paper/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" /> Certificate
                Issued
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" /> Hands-on Only
              </span>
            </div>
          </div>

          <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/40">
              FULL TUITION
            </p>
            <div className="text-5xl font-black text-paper mt-2">₦250,000</div>
            <p className="text-xs text-accent font-mono mt-1">
              Flexible Installments Accepted
            </p>

            <div className="mt-8 pt-8 border-t border-white/10">
              <RegisterButton variant="accent" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 px-6 border-t border-ink/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-ink/40">
              OFFICIAL ACADEMY CONTACT
            </p>
            <p className="text-lg font-bold text-ink mt-1">
              VMEDEX DIGITAL LTD
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink">
            <a
              href="https://wa.me/2349035585681"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MessageCircle size={16} className="text-primary" /> +234 903 558
              5681
            </a>
            <a
              href="tel:+2348166144126"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone size={16} className="text-primary" /> 08166144126
            </a>
            <a
              href="mailto:info@vmedexdigital.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail size={16} className="text-primary" /> info@vmedexdigital.com
            </a>
            <a
              href="mailto:vmedexdigital@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail size={16} className="text-primary" />{" "}
              vmedexdigital@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Ledger Helper
function LedgerItem({
  title,
  main,
  sub,
}: {
  title: string;
  main: string;
  sub: string;
}) {
  return (
    <div className="p-8">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink/40">
        {title}
      </p>
      <p className="text-xl font-black text-ink mt-2">{main}</p>
      <p className="text-xs text-ink/60 mt-0.5">{sub}</p>
    </div>
  );
}

// Button Helper
function RegisterButton({
  variant = "primary",
}: {
  variant?: "primary" | "accent";
}) {
  return (
    <motion.a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
        variant === "primary"
          ? "bg-primary text-paper hover:bg-primary-dark shadow-md shadow-primary/20"
          : "bg-accent text-ink hover:bg-white"
      }`}
    >
      <span>Register Now</span>
      <ArrowUpRight size={16} />
    </motion.a>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import {
//   Camera,
//   Lightbulb,
//   LayoutGrid,
//   Scissors,
//   Move3d,
//   BookOpen,
//   Radio,
//   Calendar,
//   MapPin,
//   Wallet,
//   MessageCircle,
//   Phone,
//   Mail,
//   ArrowUpRight,
//   Award,
//   CheckCircle2,
//   Sparkles,
//   Film,
//   Play,
// } from "lucide-react";

// const curriculum = [
//   { icon: Camera, label: "Camera Mastery", desc: "Manual exposure, cinema optics & sensor depth" },
//   { icon: Lightbulb, label: "Cinematic Lighting", desc: "3-point setup, continuous LED & mood crafting" },
//   { icon: LayoutGrid, label: "Framing & Depth", desc: "Visual golden ratios, blocking & dynamic framing" },
//   { icon: Move3d, label: "Movement & Pacing", desc: "Gimbal operations, tracking shots & rhythm" },
//   { icon: Scissors, label: "Post-Production", desc: "NLE workflows, primary & secondary color grading" },
//   { icon: BookOpen, label: "Visual Storytelling", desc: "Directing, shot listing & script breakdowns" },
//   { icon: Radio, label: "Live Broadcast", desc: "Multi-camera switching & live stream engineering" },
// ];

// const REGISTER_URL = "https://vmedexdigital.com/registration-form/";

// export default function TrainingContentV2() {
//   return (
//     <div className="bg-paper text-ink selection:bg-accent selection:text-ink min-h-screen">
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-32 pb-20 px-6 border-b border-ink/10">
//         <div className="max-w-6xl mx-auto">
//           {/* Top Metadata Row */}
//           <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
//             <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink text-paper text-xs font-mono font-bold tracking-wider">
//               <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
//               COHORT 2026 // LAGOS
//             </div>
//             <div className="text-xs font-mono uppercase tracking-widest text-ink/50">
//               [ 3 WEEKS INTENSIVE BOOTCAMP ]
//             </div>
//           </div>

//           {/* Editorial Headline */}
//           <div className="grid lg:grid-cols-12 gap-8 items-end">
//             <div className="lg:col-span-8">
//               <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-ink">
//                 MASTER THE <br />
//                 <span className="text-primary italic font-serif font-normal">CINEMATIC</span> CRAFT
//               </h1>
//             </div>
//             <div className="lg:col-span-4 lg:pb-2">
//               <p className="text-base text-ink/70 leading-relaxed font-normal">
//                 An immersive hands-on cinematography program designed to transition you from technical operator to visual storyteller.
//               </p>
//               <div className="mt-6 flex items-center gap-4">
//                 <RegisterButton />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- STATS / QUICK METRICS GRID --- */}
//       <section className="border-b border-ink/10 bg-white">
//         <div className="max-w-6xl mx-auto grid divide-y sm:divide-y-0 sm:divide-x divide-ink/10 sm:grid-cols-3">
//           <MetricTile icon={Calendar} title="DATES" value="Oct 12 – Oct 31" sub="3 Weeks Intensive" />
//           <MetricTile icon={MapPin} title="LOCATION" value="Lagos, Nigeria" sub="Physical Studio Sessions" />
//           <MetricTile icon={Wallet} title="TUITION" value="₦250,000" sub="Installment Plans Available" />
//         </div>
//       </section>

//       {/* --- CURRICULUM BENTO GRID --- */}
//       <section className="py-24 px-6 max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
//           <div>
//             <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary mb-2">
//               // SYLLABUS OVERVIEW
//             </p>
//             <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-ink">
//               Core Technical Modules
//             </h2>
//           </div>
//           <p className="text-sm text-ink/60 max-w-xs">
//             Focused balance between physical studio work, live broadcast execution, and post-production suites.
//           </p>
//         </div>

//         <div className="grid gap-px bg-ink/10 border border-ink/10 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
//           {curriculum.map(({ icon: Icon, label, desc }, idx) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: idx * 0.05 }}
//               className="bg-paper p-8 flex flex-col justify-between hover:bg-white transition-colors duration-300 group"
//             >
//               <div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs font-mono text-ink/30 font-bold">0{idx + 1}</span>
//                   <Icon size={20} className="text-ink/40 group-hover:text-primary transition-colors" />
//                 </div>
//                 <h3 className="text-xl font-bold mt-8 text-ink group-hover:text-primary transition-colors">
//                   {label}
//                 </h3>
//                 <p className="text-sm text-ink/60 mt-2 leading-relaxed">{desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* --- FEATURE HIGHLIGHT DARK SECTION --- */}
//       <section className="bg-ink text-paper py-24 px-6">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-mono font-bold tracking-widest mb-6">
//               <Sparkles size={12} /> VERIFIED ACCREDITATION
//             </span>
//             <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
//               PRACTICAL STUDIO EXPERIENCE
//             </h2>
//             <p className="mt-6 text-paper/70 leading-relaxed max-w-lg">
//               We eliminate theoretical fluff. Learn on industry-grade cinema cameras, modern lighting rigs, and professional audio systems in real production setups.
//             </p>

//             <ul className="mt-8 space-y-4">
//               {[
//                 "Verified Certificate of Completion upon defense",
//                 "Portfolio-ready short film produced during cohort",
//                 "Hands-on live stream and multi-camera setup practice",
//               ].map((item) => (
//                 <li key={item} className="flex items-center gap-3 text-sm text-paper/90">
//                   <CheckCircle2 size={16} className="text-accent shrink-0" />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-8 text-white/5">
//               <Film size={180} />
//             </div>

//             <p className="text-xs font-mono uppercase tracking-widest text-accent font-bold">TUITION STRUCTURE</p>
//             <div className="text-5xl sm:text-6xl font-black tracking-tight mt-2 text-paper">
//               ₦250,000
//             </div>
//             <p className="text-xs text-paper/50 font-mono mt-1">NO HIDDEN STUDIO FEES</p>

//             <p className="mt-6 text-sm text-paper/70 leading-relaxed border-t border-white/10 pt-6">
//               Flexible installment payments allowed prior to course commencement. Class size is capped to maintain 1-on-1 instructor feedback.
//             </p>

//             <div className="mt-8">
//               <RegisterButton variant="accent" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- FOOTER CONTACT SECTION --- */}
//       <footer className="py-20 px-6 border-t border-ink/10">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
//           <div>
//             <h3 className="text-2xl font-black uppercase text-ink">VMEDEX DIGITAL ACADEMY</h3>
//             <p className="text-xs text-ink/50 font-mono mt-1">QUESTIONS? TALK TO OUR ADMISSIONS TEAM</p>
//           </div>

//           <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-ink">
//             <a href="https://wa.me/2349035585681" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
//               <MessageCircle size={16} className="text-primary" /> +234 903 558 5681
//             </a>
//             <a href="tel:+2348166144126" className="flex items-center gap-2 hover:text-primary transition-colors">
//               <Phone size={16} className="text-primary" /> 08166144126
//             </a>
//             <a href="mailto:info@vmedexdigital.com" className="flex items-center gap-2 hover:text-primary transition-colors">
//               <Mail size={16} className="text-primary" /> info@vmedexdigital.com
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // Tile Helper
// function MetricTile({ icon: Icon, title, value, sub }: { icon: typeof Calendar; title: string; value: string; sub: string }) {
//   return (
//     <div className="p-8 flex items-start gap-4">
//       <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
//         <Icon size={20} />
//       </div>
//       <div>
//         <p className="text-[10px] font-mono uppercase tracking-widest text-ink/40 font-bold">{title}</p>
//         <p className="text-xl font-bold text-ink mt-0.5">{value}</p>
//         <p className="text-xs text-ink/50 mt-0.5">{sub}</p>
//       </div>
//     </div>
//   );
// }

// // CTA Button Helper
// function RegisterButton({ variant = "primary" }: { variant?: "primary" | "accent" }) {
//   return (
//     <motion.a
//       href={REGISTER_URL}
//       target="_blank"
//       rel="noopener noreferrer"
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-md transition-all ${
//         variant === "primary"
//           ? "bg-primary text-paper hover:bg-primary-dark"
//           : "bg-accent text-ink hover:bg-white"
//       }`}
//     >
//       <span>Claim Your Seat</span>
//       <ArrowUpRight size={16} />
//     </motion.a>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import {
//   Camera,
//   Lightbulb,
//   LayoutGrid,
//   Scissors,
//   Move3d,
//   BookOpen,
//   Radio,
//   Calendar,
//   MapPin,
//   Wallet,
//   MessageCircle,
//   Phone,
//   Mail,
//   ArrowUpRight,
//   Award,
//   CheckCircle2,
//   Sparkles,
//   ChevronRight,
// } from "lucide-react";

// const curriculum = [
//   {
//     icon: Camera,
//     label: "Camera Mastery",
//     desc: "Manual exposure, lenses & focal length",
//   },
//   {
//     icon: Lightbulb,
//     label: "Cinematic Lighting",
//     desc: "3-point setup, ambient & mood control",
//   },
//   {
//     icon: LayoutGrid,
//     label: "Framing & Composition",
//     desc: "Rule of thirds, golden ratio & depth",
//   },
//   {
//     icon: Move3d,
//     label: "Camera Movement",
//     desc: "Gimbal work, tracking shots & pacing",
//   },
//   {
//     icon: Scissors,
//     label: "Post-Production",
//     desc: "Video editing & color grading workflow",
//   },
//   {
//     icon: BookOpen,
//     label: "Visual Storytelling",
//     desc: "Storyboarding, shot listing & direction",
//   },
//   {
//     icon: Radio,
//     label: "Live Broadcast",
//     desc: "Multi-cam setup & live streaming gear",
//   },
// ];

// const details = [
//   {
//     icon: Calendar,
//     label: "Duration",
//     value: "3 Weeks — Intensive Practical Training",
//   },
//   {
//     icon: Radio,
//     label: "Live Sessions",
//     value: "Hands-on Practical + Studio Broadcasts",
//   },
//   {
//     icon: Award,
//     label: "Certificate",
//     value: "Verified Certificate of Completion",
//   },
//   {
//     icon: Wallet,
//     label: "Payment Plan",
//     value: "Flexible Installment Options Available",
//   },
// ];

// const REGISTER_URL = "https://vmedexdigital.com/registration-form/";

// export default function TrainingContent() {
//   return (
//     <div className="bg-paper text-ink overflow-hidden selection:bg-accent selection:text-ink">
//       {/* --- HERO SECTION --- */}
//       <section className="relative max-w-5xl mx-auto px-6 pt-36 pb-24 text-center">
//         {/* Background Ambient Glow */}
//         <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary mb-8"
//         >
//           <Sparkles className="w-3.5 h-3.5 text-primary" />
//           <span>3-Week Cinematography Bootcamp</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="relative text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-ink leading-[0.92]"
//         >
//           BEYOND <span className="text-primary italic font-serif">THE</span>{" "}
//           FRAME
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="relative mt-8 max-w-2xl mx-auto text-base sm:text-lg text-ink/70 leading-relaxed font-normal"
//         >
//           Master camera handling, cinematic lighting, composition, editing, and
//           visual storytelling. Hands-on practical instruction designed for
//           aspiring filmmakers and creators.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
//         >
//           <RegisterButton />
//           <a
//             href="#curriculum"
//             className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/60 hover:text-primary transition-colors py-3 px-6"
//           >
//             Explore Curriculum <ChevronRight size={14} />
//           </a>
//         </motion.div>
//       </section>

//       {/* --- QUICK DETAILS GRID --- */}
//       <section className="max-w-5xl mx-auto px-6 pb-24">
//         <div className="grid gap-4 sm:grid-cols-3">
//           <InfoCard
//             icon={Calendar}
//             label="Start Date"
//             value="12th October"
//             index={0}
//           />
//           <InfoCard
//             icon={Calendar}
//             label="End Date"
//             value="31st October"
//             index={1}
//           />
//           <InfoCard
//             icon={MapPin}
//             label="Location"
//             value="Lagos, Nigeria"
//             index={2}
//           />
//         </div>

//         {/* Pricing Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mt-6 rounded-3xl bg-ink text-paper p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
//         >
//           <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/20 blur-[60px] pointer-events-none rounded-full" />

//           <div className="relative z-10 text-center sm:text-left">
//             <p className="text-xs uppercase tracking-widest text-accent font-bold">
//               Standard Tuition Fee
//             </p>
//             <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
//               <span className="text-4xl sm:text-5xl font-black tracking-tight">
//                 ₦250,000
//               </span>
//               <span className="text-xs text-paper/60 uppercase tracking-wider font-medium">
//                 / full course
//               </span>
//             </div>
//           </div>

//           <div className="relative z-10 w-full sm:w-auto">
//             <RegisterButton variant="dark" />
//           </div>
//         </motion.div>
//       </section>

//       {/* --- CURRICULUM SECTION --- */}
//       <section id="curriculum" className="max-w-5xl mx-auto px-6 pb-28">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
//             What You Will Learn
//           </span>
//           <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-ink">
//             Core Modules
//           </h2>
//         </motion.div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {curriculum.map(({ icon: Icon, label, desc }, index) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.4, delay: index * 0.05 }}
//               whileHover={{ y: -4 }}
//               className="group p-6 rounded-2xl bg-white border border-ink/10 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
//             >
//               <div>
//                 <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-paper transition-colors duration-300">
//                   <Icon size={20} />
//                 </div>
//                 <h3 className="mt-4 text-lg font-bold text-ink">{label}</h3>
//                 <p className="mt-1 text-sm text-ink/60 leading-relaxed">
//                   {desc}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* --- PROGRAMME HIGHLIGHTS --- */}
//       <section className="bg-ink text-paper py-28 px-6 relative overflow-hidden">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid gap-6 sm:grid-cols-2">
//             {details.map(({ icon: Icon, label, value }, index) => (
//               <motion.div
//                 key={label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                 className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
//               >
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-accent">
//                   <Icon size={20} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-accent">
//                     {label}
//                   </p>
//                   <p className="mt-1 text-base font-semibold text-paper/90 leading-snug">
//                     {value}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-12 flex items-center justify-center gap-2 text-sm text-paper/60 border-t border-white/10 pt-8"
//           >
//             <CheckCircle2 size={18} className="text-accent" />
//             <span>
//               Limited seat availability — cohorts are strictly capped for
//               practical focus.
//             </span>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- CONTACT & CLOSING CTA --- */}
//       <section className="max-w-3xl mx-auto px-6 py-32 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl sm:text-6xl font-black tracking-tight text-ink"
//         >
//           Ready to Start Your Career?
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.5, delay: 0.15 }}
//           className="mt-8"
//         >
//           <RegisterButton />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mt-16 pt-12 border-t border-ink/10 flex flex-col items-center gap-4 text-sm text-ink/70"
//         >
//           <p className="text-xs uppercase tracking-widest text-ink/40 font-bold">
//             Have questions? Contact Admissions
//           </p>

//           <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
//             <a
//               href="https://wa.me/2349035585681"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 hover:text-primary transition-colors"
//             >
//               <MessageCircle size={16} className="text-primary" /> +234 903 558
//               5681
//             </a>
//             <a
//               href="tel:+2348166144126"
//               className="flex items-center gap-2 hover:text-primary transition-colors"
//             >
//               <Phone size={16} className="text-primary" /> 08166144126
//             </a>
//             <a
//               href="mailto:info@vmedexdigital.com"
//               className="flex items-center gap-2 hover:text-primary transition-colors"
//             >
//               <Mail size={16} className="text-primary" /> info@vmedexdigital.com
//             </a>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }

// // Reusable Register CTA Button Component
// function RegisterButton({
//   variant = "primary",
// }: {
//   variant?: "primary" | "dark";
// }) {
//   return (
//     <motion.a
//       href={REGISTER_URL}
//       target="_blank"
//       rel="noopener noreferrer"
//       whileHover={{ scale: 1.03, y: -2 }}
//       whileTap={{ scale: 0.98 }}
//       className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-md transition-all ${
//         variant === "primary"
//           ? "bg-primary text-paper hover:bg-primary-dark shadow-primary/20"
//           : "bg-paper text-ink hover:bg-accent hover:text-ink shadow-black/10"
//       }`}
//     >
//       <span>Register Now</span>
//       <ArrowUpRight size={16} />
//     </motion.a>
//   );
// }

// // Info Card Sub-component
// function InfoCard({
//   icon: Icon,
//   label,
//   value,
//   index,
// }: {
//   icon: typeof Calendar;
//   label: string;
//   value: string;
//   index: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.4 }}
//       transition={{ duration: 0.5, delay: index * 0.08 }}
//       whileHover={{ y: -4 }}
//       className="rounded-2xl bg-white border border-ink/10 p-6 transition-all hover:border-primary/30 hover:shadow-md"
//     >
//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
//         <Icon size={18} />
//       </div>
//       <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink/40">
//         {label}
//       </p>
//       <p className="mt-1 text-lg font-bold text-ink">{value}</p>
//     </motion.div>
//   );
// }

// "use client";

// import { motion } from "motion/react";
// import {
//   Camera,
//   Lightbulb,
//   LayoutGrid,
//   Scissors,
//   Move3d,
//   BookOpen,
//   Radio,
//   Calendar,
//   MapPin,
//   Wallet,
//   MessageCircle,
//   Phone,
//   Mail,
//   ArrowUpRight,
//   Award,
//   CheckCircle2,
//   Sparkles,
// } from "lucide-react";

// const curriculum = [
//   { icon: Camera, label: "Camera" },
//   { icon: Lightbulb, label: "Lighting" },
//   { icon: LayoutGrid, label: "Composition" },
//   { icon: Scissors, label: "Editing" },
//   { icon: Move3d, label: "Movements" },
//   { icon: BookOpen, label: "Storytelling" },
//   { icon: Radio, label: "Live Streaming" },
// ];

// const details = [
//   {
//     icon: Calendar,
//     label: "Duration",
//     value: "3 Weeks — Intensive Practical Training",
//   },
//   {
//     icon: Radio,
//     label: "Live Sessions",
//     value: "Practical + Live Streaming Sessions",
//   },
//   { icon: Award, label: "Certificate", value: "Certificate of Completion" },
//   {
//     icon: Wallet,
//     label: "Payment Plan",
//     value: "Affordable & Flexible Options Available",
//   },
// ];

// const REGISTER_URL = "https://vmedexdigital.com/registration-form/";

// export default function TrainingContent() {
//   return (
//     <div className="bg-paper overflow-hidden">
//       {/* Hero */}
//       <section className="relative max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
//         {/* Ambient glow, purely decorative, reinforces "cinematic" tone */}
//         <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
//         >
//           <Sparkles className="w-3.5 h-3.5" />
//           <span>3-Week Cinematography Training</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.15 }}
//           className="relative text-5xl sm:text-7xl font-black tracking-tight text-ink leading-[0.95]"
//         >
//           Beyond <span className="text-primary">The</span> Frame
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           className="relative mt-6 max-w-xl mx-auto text-base text-ink/60"
//         >
//           No experience required. Learn camera, lighting, composition, editing,
//           and storytelling — hands-on, from industry practitioners.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.45 }}
//           className="relative mt-10"
//         >
//           <RegisterButton />
//         </motion.div>
//       </section>

//       {/* Key details — animated cards */}
//       <section className="max-w-5xl mx-auto px-6 pb-24">
//         <div className="grid gap-4 sm:grid-cols-3">
//           <InfoCard
//             icon={Calendar}
//             label="Start Date"
//             value="12th October"
//             index={0}
//           />
//           <InfoCard
//             icon={Calendar}
//             label="End Date"
//             value="31st October"
//             index={1}
//           />
//           <InfoCard
//             icon={MapPin}
//             label="Location"
//             value="Lagos (to be communicated)"
//             index={2}
//           />
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mt-4 rounded-2xl bg-ink text-paper px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
//         >
//           <div>
//             <p className="text-xs uppercase tracking-widest text-accent font-semibold">
//               Training Fee
//             </p>
//             <p className="text-3xl font-bold mt-1">₦250,000</p>
//           </div>
//           <RegisterButton variant="dark" />
//         </motion.div>
//       </section>

//       {/* Curriculum — interactive hover grid */}
//       <section className="max-w-5xl mx-auto px-6 pb-24">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <p className="text-sm font-semibold uppercase tracking-widest text-accent">
//             What You&apos;ll Learn
//           </p>
//           <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
//             Full Curriculum
//           </h2>
//         </motion.div>

//         <div className="flex flex-wrap justify-center gap-3">
//           {curriculum.map(({ icon: Icon, label }, index) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true, amount: 0.4 }}
//               transition={{ duration: 0.4, delay: index * 0.06 }}
//               whileHover={{ y: -6, scale: 1.05 }}
//               className="group flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-5 py-3 cursor-default transition-colors hover:border-primary/40 hover:bg-primary/5"
//             >
//               <Icon className="text-primary" size={18} />
//               <span className="text-sm font-medium text-ink">{label}</span>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Programme details */}
//       <section className="bg-ink px-6 py-24">
//         <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2">
//           {details.map(({ icon: Icon, label, value }, index) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
//             >
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
//                 <Icon size={18} />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-widest text-accent">
//                   {label}
//                 </p>
//                 <p className="mt-1 text-sm text-paper/80">{value}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="max-w-5xl mx-auto mt-8 flex items-center gap-2 text-sm text-paper/50"
//         >
//           <CheckCircle2 size={16} className="text-primary" />
//           Limited slots available — register early to secure your spot.
//         </motion.div>
//       </section>

//       {/* Contact + closing CTA */}
//       <section className="max-w-2xl mx-auto px-6 py-32 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-semibold text-ink sm:text-4xl"
//         >
//           Ready to go beyond the frame?
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6, delay: 0.15 }}
//           className="mt-8"
//         >
//           <RegisterButton />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mt-12 flex flex-col items-center gap-3 text-sm text-ink/60"
//         >
//           <p className="text-xs uppercase tracking-widest text-ink/40 font-semibold">
//             For more info, kindly contact
//           </p>
//           <a
//             href="https://wa.me/2349035585681"
//             className="flex items-center gap-2 hover:text-primary transition-colors"
//           >
//             <MessageCircle size={16} /> +234 903 558 5681
//           </a>
//           <a
//             href="tel:+2348166144126"
//             className="flex items-center gap-2 hover:text-primary transition-colors"
//           >
//             <Phone size={16} /> 08166144126
//           </a>
//           <a
//             href="mailto:info@vmedexdigital.com"
//             className="flex items-center gap-2 hover:text-primary transition-colors"
//           >
//             <Mail size={16} /> info@vmedexdigital.com
//           </a>
//         </motion.div>
//       </section>
//     </div>
//   );
// }

// // Reusable register CTA — links externally, since registration is hosted elsewhere.
// // Includes a subtle hover "lift" as a micro-interaction.
// function RegisterButton({
//   variant = "primary",
// }: {
//   variant?: "primary" | "dark";
// }) {
//   return (
//     <motion.a
//       href={REGISTER_URL}
//       target="_blank"
//       rel="noopener noreferrer"
//       whileHover={{ scale: 1.04, y: -2 }}
//       whileTap={{ scale: 0.97 }}
//       className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
//         variant === "primary"
//           ? "bg-primary text-paper hover:bg-primary-dark"
//           : "bg-paper text-ink hover:bg-accent hover:text-ink"
//       }`}
//     >
//       Register Now <ArrowUpRight size={16} />
//     </motion.a>
//   );
// }

// // Small stat card used for Start Date / End Date / Location
// function InfoCard({
//   icon: Icon,
//   label,
//   value,
//   index,
// }: {
//   icon: typeof Calendar;
//   label: string;
//   value: string;
//   index: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.4 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -4 }}
//       className="rounded-2xl border border-ink/10 p-6 transition-colors hover:border-primary/30"
//     >
//       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
//         <Icon size={18} />
//       </div>
//       <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
//         {label}
//       </p>
//       <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
//     </motion.div>
//   );
// }
