"use client";

import { motion } from "motion/react";
import {ICONS} from "@/lib/icons";
import {


  MessageCircle,
  Phone,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Plus,
} from "lucide-react";
import type { Cohort, CurriculumItem } from "@/lib/training";
import { formatDateRange, formatNaira, hasEnded } from "@/lib/format";

const REGISTER_URL = "https://vmedexdigital.com/registration-form/";
const WHATSAPP_URL = "https://wa.me/2349035585681";

// Shown until the admin uploads a flyer — change to your new flyer's filename if different
const DEFAULT_FLYER = "/new-training-flyer.jpg";

// The database stores an icon *name*; this maps it to the real component.
// The admin's icon dropdown will offer exactly these keys.

type Props = {
  cohort: Cohort | null;
  curriculum: CurriculumItem[];
};

export default function TrainingContent({ cohort, curriculum }: Props) {
  // Registration is open only if there's an active cohort that hasn't ended yet
  const open = cohort !== null && !hasEnded(cohort.endDate);

  const flyerSrc = cohort?.flyerPath
    ? `/api/flyer/${cohort.flyerPath}` // built in the flyer-upload step
    : DEFAULT_FLYER;

  const ledger =
    open && cohort
      ? [
          {
            title: "PROGRAM DATES",
            main: formatDateRange(cohort.startDate, cohort.endDate),
            sub: cohort.durationNote,
          },
          {
            title: "LOCATION",
            main: cohort.location,
            sub: cohort.locationNote,
          },
          {
            title: "TUITION FEE",
            main: formatNaira(cohort.feeAmount),
            sub: cohort.feeNote,
          },
          ...(cohort.certificationTitle
            ? [
                {
                  title: "CERTIFICATION",
                  main: cohort.certificationTitle,
                  sub: cohort.certificationNote,
                },
              ]
            : []),
        ]
      : [
          {
            title: "NEXT COHORT",
            main: "Coming Soon",
            sub: "Dates will be announced shortly",
          },
          {
            title: "LOCATION",
            main: "Lagos, Nigeria",
            sub: "Physical Studio Access",
          },
        ];

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

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: All Text Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block">
                [ 3-WEEK PRACTICAL CINEMATOGRAPHY ]
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-ink leading-[0.9]">
                VISUAL <br />
                <span className="text-primary italic font-serif font-normal">
                  STORY
                </span>
                TELLING
              </h1>

              <p className="text-base text-ink/70 leading-relaxed max-w-xl">
                A hands-on, high-intensity bootcamp focused on real studio
                equipment. Master camera control, lighting setups, and
                post-production.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <CtaButton open={open} />
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-6">
              <img
                src={flyerSrc}
                alt="Practical Cinematography Bootcamp"
                className="w-full h-auto rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAM DETAILS LEDGER --- */}
      <section className="border-b border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto grid divide-y md:divide-y-0 md:divide-x divide-ink/10 md:grid-cols-4">
          {ledger.map((item) => (
            <LedgerItem
              key={item.title}
              title={item.title}
              main={item.main}
              sub={item.sub}
            />
          ))}
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
            {curriculum.length} COMPREHENSIVE UNITS
          </p>
        </div>

        {/* List Rows */}
        <div className="divide-y divide-ink/10">
          {curriculum.map(({ id, icon, label, description }, idx) => {
            const Icon = (ICONS[icon] ?? ICONS.clapperboard).Icon;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="py-8 grid sm:grid-cols-12 gap-4 items-center hover:bg-white/80 transition-colors px-4 -mx-4 rounded-xl group"
              >
                <div className="sm:col-span-1 text-xs font-mono font-bold text-ink/30 group-hover:text-primary transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="sm:col-span-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-paper transition-colors">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{label}</h3>
                </div>

                <div className="sm:col-span-6 text-sm text-ink/60 leading-relaxed">
                  {description}
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  <Plus
                    size={18}
                    className="text-ink/20 group-hover:text-primary group-hover:rotate-45 transition-all duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
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
              {open ? "SECURE YOUR SLOT" : "STAY IN THE LOOP"}
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
              {open ? "FULL TUITION" : "NEXT COHORT"}
            </p>
            <div className="text-5xl font-black text-paper mt-2 md:text-4xl">
              {open && cohort ? formatNaira(cohort.feeAmount) : "Soon"}
            </div>
            <p className="text-xs text-accent font-mono mt-1">
              {open && cohort
                ? cohort.feeNote
                : "Message us to be told when registration reopens"}
            </p>

            <div className="mt-8 pt-8 border-t border-white/10">
              <CtaButton variant="accent" open={open} />
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
  sub?: string | null;
}) {
  return (
    <div className="p-8">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink/40">
        {title}
      </p>
      <p className="text-xl font-black text-ink mt-2">{main}</p>
      {sub && <p className="text-xs text-ink/60 mt-0.5">{sub}</p>}
    </div>
  );
}

// Button Helper — registers while a cohort is open, otherwise points to WhatsApp
function CtaButton({
  variant = "primary",
  open,
}: {
  variant?: "primary" | "accent";
  open: boolean;
}) {
  return (
    <motion.a
      href={open ? REGISTER_URL : WHATSAPP_URL}
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
      <span>{open ? "Register Now" : "Ask About Next Cohort"}</span>
      <ArrowUpRight size={16} />
    </motion.a>
  );
}

