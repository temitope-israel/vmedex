"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Camera,
  Film,
  Sparkles,
  GraduationCap,
  PartyPopper,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "01",
    icon: Film,
    image: "/cinematography.jpg",
    title: "Cinematography & Video",
    tagline: "4K Cinema & Commercial Video",
    description:
      "High-end corporate films, brand storytelling, documentary coverage, and cinematic color grading tailored for broadcast and web.",
    features: ["Color Grading", "Multi-Cam Setup", "Drone / Aerial Footage"],
  },
  {
    id: "02",
    icon: Camera,
    image: "/photography.jpg",
    title: "Photography",
    tagline: "Studio & On-Location Shoot",
    description:
      "Corporate branding portraits, architectural shots, executive headshots, and high-resolution commercial product photography.",
    features: ["Studio Lighting", "Retouching", "High-Res Raw Export"],
  },
  {
    id: "03",
    icon: Sparkles,
    image: "/content-creation.jpg",
    title: "Content Creation",
    tagline: "Social & Digital Campaigns",
    description:
      "Engineered short-form video reels, dynamic visuals, and creative social campaigns designed for high audience engagement.",
    features: ["Vertical Video (9:16)", "Trend Analysis", "Fast Turnaround"],
  },
  {
    id: "04",
    icon: GraduationCap,
    image: "/training.jpg",
    title: "Training & Masterclasses",
    tagline: "Capacity Building Programs",
    description:
      "Hands-on practical training in camera operations, lighting setups, sound engineering, and post-production workflows.",
    features: ["1-on-1 Mentorship", "Certifications", "Practical Workshops"],
  },
  {
    id: "05",
    icon: PartyPopper,
    image: "/events.jpg",
    title: "Events & Live Coverage",
    tagline: "Conferences & High-Profile Events",
    description:
      "Seamless media production for corporate conferences, product launches, galas, and live broadcast events.",
    features: ["Real-time Delivery", "Live Streaming", "Press Coverage"],
  },
];

export default function ServicesOverview() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="max-w-7xl text-center mx-auto px-6 py-28 relative">
      {/* Section header */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>What We Do</span>
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold text-ink tracking-tight">
          Services Crafted for Maximum Impact
        </h2>

        {/* Added Subtitle Paragraph */}
        <p className="mt-4 text-sm sm:text-base text-ink/70 max-w-lg mx-auto">
          Trusted by industry leaders, corporate partners, and brands to deliver
          uncompromising visual excellence.
        </p>
      </div>

      {/* Split interactive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: interactive service list */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {services.map((service) => {
            const isActive = activeService.id === service.id;
            const Icon = service.icon;

            return (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setActiveService(service)}
                onClick={() => setActiveService(service)}
                aria-expanded={isActive}
                className={`group relative w-full text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? "bg-paper shadow-lg border-ink/15"
                    : "border-transparent hover:bg-ink/5 hover:border-ink/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-2xl border-2 border-primary/40 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-primary text-paper"
                          : "bg-ink/5 text-ink group-hover:bg-ink/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                        {service.tagline}
                      </span>
                      <h3 className="text-lg font-bold text-ink">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-ink/30 border-2 rounded-xl border-primary/50 p-2">
                    {service.id}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="lg:hidden relative h-48 w-full rounded-xl overflow-hidden mt-4">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      </div>

                      <p className="mt-4 text-sm text-ink/75 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/80 bg-ink/5 px-2.5 py-1 rounded-md"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 pt-3 border-t border-ink/10">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                        >
                          <span>Explore {service.title}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Right column: sticky preview */}
        <div className="lg:col-span-5 sticky top-28 hidden lg:block">
          <div className="relative h-[540px] w-full rounded-3xl overflow-hidden border border-ink/10 shadow-2xl bg-ink">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                        Selected Service
                      </span>
                      <h4 className="text-lg font-bold">
                        {activeService.title}
                      </h4>
                    </div>
                    <Link
                      href="/contact"
                      className="px-4 py-2 rounded-xl bg-primary text-paper text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
