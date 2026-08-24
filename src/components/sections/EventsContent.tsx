"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Calendar,
  MessageCircle,
  Video,
  Package,
} from "lucide-react";

const eventTypes = [
  {
    image: "/event-corporate.jpg",
    title: "Corporate Events",
    tag: "Galas & Retreats",
  },
  {
    image: "/event-conference.jpg",
    title: "Conferences & Seminars",
    tag: "Multi-Day Summits",
  },
  {
    image: "/event-wedding.jpg",
    title: "Weddings & Celebrations",
    tag: "Luxury Private Events",
  },
  {
    image: "/event-product-launch.jpg",
    title: "Product Launches",
    tag: "Brand Activations",
  },
  {
    image: "/event-red-carpet.jpg",
    title: "Red-Carpet Events",
    tag: "Premieres & Awards",
  },
  {
    image: "/event-social.jpg",
    title: "Private & Social Events",
    tag: "Intimate Gatherings",
  },
];

const process = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Consultation & Briefing",
    description:
      "We dive deep into your event's itinerary, venue specifics, and the exact deliverables you need.",
  },
  {
    step: "02",
    icon: Calendar,
    title: "Coverage Strategy",
    description:
      "A tailored production plan is drafted, outlining crew size, equipment needs, and shot lists.",
  },
  {
    step: "03",
    icon: Video,
    title: "Live Execution",
    description:
      "Our discreet, professional crew captures every critical moment and atmospheric detail on the day.",
  },
  {
    step: "04",
    icon: Package,
    title: "Post & Delivery",
    description:
      "Rapid turnaround on edited photos and cinematic highlights, formatted for all your media channels.",
  },
];

export default function EventsContent() {
  return (
    <div className="bg-paper text-ink min-h-screen selection:bg-primary selection:text-paper">
      {/* PAGE HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 sm:pb-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-primary mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Event & Media Coverage</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-ink leading-[0.95]"
          >
            Every Moment, <br />
            <span className="text-primary">Captured.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-ink/70 leading-relaxed font-medium"
          >
            End-to-end cinematic visual coverage and media support for events of
            every scale. We ensure your most important days are preserved
            flawlessly.
          </motion.p>
        </div>
      </section>

      {/* EDITORIAL GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map(({ image, title, tag }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <Link
                href="/contact"
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-ink/5"
              >
                {/* Fallback background color before image loads */}
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient overlay that darkens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-2 block">
                      {tag}
                    </span>
                    <h3 className="text-2xl font-bold text-paper leading-tight">
                      {title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span>Explore Coverage</span>
                      <ArrowUpRight size={16} className="text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="bg-ink text-paper py-32 rounded-t-[3rem] sm:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-4">
                Operational Framework
              </p>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
                How We Work
              </h2>
            </div>
            <p className="text-sm text-paper/60 max-w-sm leading-relaxed">
              A streamlined, reliable production pipeline designed to deliver
              high-end assets with zero friction.
            </p>
          </motion.div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-white/10" />

            {process.map(({ step, icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink shadow-[0_0_0_8px_rgba(255,255,255,0.05)]">
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-black font-mono text-white/20">
                    {step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-paper uppercase tracking-tight mb-3">
                  {title}
                </h3>
                <p className="text-sm text-paper/60 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING EDITORIAL CTA */}
      <section className="bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 border-t border-white/5" />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-paper leading-[1.1]"
          >
            Ready To Capture <br />
            Your Next Event?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-paper transition-all hover:bg-paper hover:text-ink hover:scale-105"
            >
              <span>Book Our Team</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// "use client";

// import { motion } from "motion/react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowUpRight,
//   Sparkles,
//   Calendar,
//   MessageCircle,
//   Video,
//   Package,
// } from "lucide-react";

// // Event types, pulled directly from the client brief
// const eventTypes = [
//   { image: "/event-corporate.jpg", title: "Corporate Events" },
//   { image: "/event-conference.jpg", title: "Conferences & Seminars" },
//   { image: "/event-wedding.jpg", title: "Weddings & Celebrations" },
//   { image: "/event-product-launch.jpg", title: "Product Launches" },
//   { image: "/event-red-carpet.jpg", title: "Red-Carpet Events" },
//   { image: "/event-social.jpg", title: "Private & Social Events" },
// ];

// // Simple process overview — sets expectations for how booking works
// const process = [
//   {
//     icon: MessageCircle,
//     title: "Consultation",
//     description: "We learn about your event and coverage needs.",
//   },
//   {
//     icon: Calendar,
//     title: "Coverage Plan",
//     description: "A tailored plan for photography, video, or both.",
//   },
//   {
//     icon: Video,
//     title: "Live Coverage",
//     description: "Our team captures every key moment on the day.",
//   },
//   {
//     icon: Package,
//     title: "Delivery",
//     description: "Edited photos and video delivered shortly after.",
//   },
// ];

// export default function EventsContent() {
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
//           <span>Events & Media Coverage</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.15 }}
//           className="text-4xl font-bold tracking-tight text-ink sm:text-6xl leading-[1.15]"
//         >
//           Every Moment, Covered
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.25 }}
//           className="mt-6 max-w-xl mx-auto text-base text-ink/60"
//         >
//           End-to-end visual coverage and media support, for events of every
//           scale.
//         </motion.p>
//       </section>

//       {/* Event type grid */}
//       <section className="max-w-6xl mx-auto px-6 pb-24">
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {eventTypes.map(({ image, title }, index) => (
//             <motion.div
//               key={title}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
//             >
//               <Link
//                 href="/contact"
//                 className="group relative block h-64 overflow-hidden rounded-2xl"
//               >
//                 <Image
//                   src={image}
//                   alt={title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

//                 <div className="relative z-10 flex h-full flex-col justify-end p-6">
//                   <h3 className="text-lg font-semibold text-paper">{title}</h3>
//                   <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100">
//                     Book Coverage <ArrowUpRight size={14} />
//                   </span>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Process overview */}
//       <section className="bg-ink px-6 py-24">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-2xl mx-auto text-center mb-16"
//         >
//           <p className="text-sm font-semibold uppercase tracking-widest text-accent">
//             How It Works
//           </p>
//           <h2 className="mt-3 text-3xl font-semibold text-paper sm:text-4xl">
//             From Booking to Delivery
//           </h2>
//         </motion.div>

//         <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {process.map(({ icon: Icon, title, description }, index) => (
//             <motion.div
//               key={title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="text-center"
//             >
//               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
//                 <Icon size={22} />
//               </div>
//               <h3 className="mt-4 text-base font-semibold text-paper">
//                 {title}
//               </h3>
//               <p className="mt-2 text-sm text-paper/60">{description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Closing CTA */}
//       <section className="max-w-2xl mx-auto px-6 py-32 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-semibold text-ink sm:text-4xl"
//         >
//           Have an event coming up?
//         </motion.h2>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6, delay: 0.15 }}
//           className="mt-8"
//         >
//           <Link
//             href="/contact"
//             className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:bg-primary-dark"
//           >
//             Book Coverage <ArrowUpRight size={16} />
//           </Link>
//         </motion.div>
//       </section>
//     </div>
//   );
// }
