"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Camera, Video } from "lucide-react";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

// Primary site navigation — used for both desktop and mobile menus
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/training", label: "Training" },
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-paper/95 backdrop-blur-md border-ink/15 shadow-sm py-1"
          : "bg-paper/70 backdrop-blur-sm border-ink/10 py-1"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo — links back to Home, closes mobile menu if open */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="transition-opacity hover:opacity-85 flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="VMedex Digital"
            width={80}
            height={20}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop nav links — Video Icon Above Active Link Style */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`group relative py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex flex-col items-center justify-center ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-ink/65 hover:text-ink hover:-translate-y-[2px]"
                }`}
              >
                {/* Active Link Indicator: Animated Video Icon Positioned Above */}
                {isActive && (
                  <motion.div
                    layoutId="editorial-active-video"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 text-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  >
                    <Video className="w-3.5 h-3.5 animate-pulse" />
                  </motion.div>
                )}

                <span className={isActive ? "mt-1.5" : ""}>{label}</span>

                {/* Hover Effect: Smooth rising bottom underline for inactive items */}
                {!isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-primary/80 transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA button — Primary color with camera flare effect */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Book Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>

            {/* Light Sweep Reflection */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-ink p-1.5 rounded-md hover:bg-ink/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden flex flex-col gap-2 px-6 pb-6 overflow-hidden border-t border-ink/5 pt-3"
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 text-sm uppercase tracking-wider font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? "text-primary pl-3 border-l-2 border-primary bg-primary/5"
                      : "text-ink/70 hover:text-primary hover:pl-2"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && <Video className="w-4 h-4 text-primary" />}
                    <span>{label}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-3 pt-2">
              <Button href="/contact">Book Us</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
