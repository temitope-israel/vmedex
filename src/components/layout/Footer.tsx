import Link from "next/link";
import { FaInstagram, FaTiktok, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

const socialLinks = [
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://tiktok.com", icon: FaTiktok, label: "TikTok" },
  { href: "https://wa.me/1234567890", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
];

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

export default function Footer() {
  return (
    <footer className="bg-ink text-paper px-6 py-16">
      <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">VMedex Digital</p>
          <p className="text-sm text-paper/70 mt-1">
            Beyond Content. Beyond Expectations.
          </p>
          <div className="flex gap-4 mt-6">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  className="text-paper/80 hover:text-accent transition-colors"
                  size={20}
                />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper/90 mb-4">Explore</p>
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-paper/70 hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-paper/90 mb-4">
            Get in touch
          </p>
          <ul className="flex flex-col gap-3 text-sm text-paper/70">
            <li className="flex items-center gap-2">
              <Mail size={16} /> hello@vmedexdigital.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +234 800 000 0000
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Lagos, Nigeria
            </li>
          </ul>
          <div className="mt-6">
            <Button href="/contact">Book Us</Button>
          </div>
        </div>
      </div>

      <p className="max-w-6xl mx-auto mt-12 pt-8 border-t border-paper/10 text-xs text-paper/50">
        © {new Date().getFullYear()} VMedex Digital Ltd. All rights reserved.
      </p>
    </footer>
  );
}
