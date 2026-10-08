"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "photography",
    title: "Photography",
    image: "/photography.jpg",
    description:
      "Professional photography services capturing brands, people, and moments with precision and creative direction.",
    offerings: [
      "Corporate and personal branding",
      "Events and celebrations",
      "Portraits and lifestyle photography",
      "Product and commercial photography",
      "Weddings and special occasions",
    ],
  },
  {
    id: "cinematography",
    title: "Cinematography & Video Production",
    image: "/cinematography.jpg",
    description:
      "Visual storytelling and production services, shaped by cinematic technique and refined narrative craft.",
    offerings: [
      "Event cinematography",
      "Corporate videos",
      "Promotional and marketing videos",
      "Interviews and documentaries",
      "Social media video content",
      "Brand storytelling",
    ],
  },
  {
    id: "content-creation",
    title: "Content Creation",
    image: "/content-creation.jpg",
    video: "/content-creation.mp4",
    description:
      "Creative content development for businesses, brands, and individuals looking to grow their digital presence.",
    offerings: [
      "Social media content",
      "Brand campaigns",
      "Digital storytelling",
      "Reels and short-form videos",
      "Creative concepts and visual campaigns",
    ],
  },
  {
    id: "training",
    title: "Training & Capacity Building",
    image: "/training.jpg",
    description:
      "Hands-on training programmes that equip individuals and organisations across Africa with practical, relevant, and technical skills in photography, videography, cinematography, content creation, and creative technologies.",
    offerings: [
      "Hands-on technical workshops",
      "Corporate team media training",
      "One-on-one creative mentorship",
      "Equipment & workflow masterclasses",
    ],
  },
  {
    id: "events",
    title: "Events & Media Coverage",
    image: "/events.jpg",
    description:
      "End-to-end visual coverage and media support, ensuring every moment of your event is captured with intention.",
    offerings: [
      "Corporate events",
      "Conferences and seminars",
      "Weddings and celebrations",
      "Product launches",
      "Red-carpet events",
      "Private and social events",
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
  }),
} as any;

export default function ServicesContent() {
  return (
    <div className="bg-paper text-ink selection:bg-primary selection:text-paper">
      {/* PAGE HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeIn}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Services</span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeIn}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-ink"
        >
          Everything We Do, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            In Detail.
          </span>
        </motion.h1>

        {/* STICKY QUICK-NAV BAR */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeIn}
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          {services.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-ink/5 hover:bg-primary hover:text-paper border border-ink/10 transition-all duration-300"
            >
              {item.title.split(" ")[0]}
            </a>
          ))}
        </motion.div>
      </section>

      {/* FULL SERVICE BREAKDOWN */}
      <div className="space-y-16 pb-20">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className="max-w-6xl mx-auto px-6 py-12 scroll-mt-28"
            >
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                {/* Image Container */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  custom={0}
                  className={`relative h-80 sm:h-[420px] rounded-3xl overflow-hidden bg-ink/5 border border-ink/10 group lg:col-span-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  <span className="absolute top-6 left-6 font-mono text-xs font-bold text-paper bg-ink/60 backdrop-blur-md px-3 py-1 rounded-full border border-paper/20">
                    0{index + 1}
                  </span>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  custom={0.15}
                  className={`flex flex-col justify-center lg:col-span-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg text-ink/75 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {service.offerings.length > 0 && (
                    <div className="mt-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">
                        Key Capabilities
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.offerings.map((offering) => (
                          <div
                            key={offering}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-ink/5 border border-ink/5 hover:border-primary/30 transition-colors"
                          >
                            <CheckCircle2
                              className="text-primary shrink-0 mt-0.5"
                              size={16}
                            />
                            <span className="text-xs font-medium text-ink/80 leading-snug">
                              {offering}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Link
                      href={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary-dark group"
                    >
                      <span>Book This Service</span>
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CLOSING CTA */}
      <section className="bg-ink text-paper py-28 px-6 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Have a Vision in Mind? Let us Bring It to Life.{" "}
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.1}
            className="mt-4 text-paper/70 text-lg max-w-xl mx-auto"
          >
            Every project is different. Tell us what you are looking to create,
            and we will develop a tailored production approach designed around
            your vision, objectives, and audience.
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl mt-6 sm:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Your Vision. Our Craft.{" "}
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.1}
            className="mt-4 text-paper/70 text-lg max-w-xl mx-auto"
          >
            From concept to final delivery, we create tailored visual
            experiences built around your story, your brand, and your goals.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.2}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-sm font-bold uppercase tracking-widest text-paper shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
