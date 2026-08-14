"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

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

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo.png"
            alt="VMedex Digital"
            width={140}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-ink hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact">Book Us</Button>
        </div>

        <button
          className="lg:hidden text-ink"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden flex flex-col gap-1 px-6 pb-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-2 text-sm font-medium text-ink hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2">
            <Button href="/contact">Book Us</Button>
          </div>
        </nav>
      )}
    </header>
  );
}
