import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClock,
  HiArrowUpRight,
} from "react-icons/hi2";

const socialLinks = [
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://tiktok.com", icon: FaTiktok, label: "TikTok" },
  { href: "https://youtube.com", icon: FaYoutube, label: "YouTube" },
  { href: "https://wa.me/2348000000000", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
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
    <footer className="bg-ink text-paper pt-20 pb-10 px-6 border-t border-paper/10 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-paper/10">
          {/* Brand Info & Mission Statement */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/footer-logo.png"
                  alt="VMedex Digital"
                  width={150}
                  height={38}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="text-sm text-paper/70 leading-relaxed max-w-sm">
                Beyond Content. Beyond Expectations. Commercial video
                production, elite headshots, live event coverage, and creative
                brand media based in Lagos.
              </p>
            </div>

            {/* Social Pill Buttons */}
            <div className="mt-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-3">
                Follow Us
              </span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-paper/5 border border-paper/10 text-xs font-medium text-paper/80 hover:text-paper hover:bg-primary/20 hover:border-primary/40 transition-all active:scale-95"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-6">
              Navigation
            </span>
            <ul className="grid grid-cols-1 gap-2.5 text-sm font-medium">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-paper/70 hover:text-primary hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group"
                  >
                    <span>{label}</span>
                    <HiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Card */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-6">
                Studio Headquarters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contact Box */}
                <div className="p-4 rounded-2xl bg-paper/5 border border-paper/10 flex flex-col gap-2.5 text-xs text-paper/70 font-mono">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    Direct Reach
                  </span>
                  <a
                    href="mailto:hello@vmedexdigital.com"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <HiOutlineEnvelope className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">hello@vmedexdigital.com</span>
                  </a>
                  <a
                    href="tel:+2348000000000"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <HiOutlinePhone className="w-4 h-4 text-primary shrink-0" />
                    <span>+234 800 000 0000</span>
                  </a>
                </div>

                {/* Location & Hours Box */}
                <div className="p-4 rounded-2xl bg-paper/5 border border-paper/10 flex flex-col gap-2.5 text-xs text-paper/70 font-mono">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    Operations
                  </span>
                  <div className="flex items-center gap-2">
                    <HiOutlineMapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineClock className="w-4 h-4 text-primary shrink-0" />
                    <span>Mon - Sat: 8AM - 6PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="mt-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-paper font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity active:scale-95"
              >
                <span>Schedule a Session</span>
                <HiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper/40">
          <p>
            © {new Date().getFullYear()} VMedex Digital Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-paper/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-paper/80 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
