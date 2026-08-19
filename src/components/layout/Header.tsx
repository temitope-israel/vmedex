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
          : "bg-paper/70 backdrop-blur-sm border-ink/10 py-2"
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
            width={100}
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

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight, Camera } from "lucide-react";
// import Button from "@/components/ui/Button";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "motion/react";

// // Primary site navigation — used for both desktop and mobile menus
// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`sticky top-0 z-50 border-b transition-all duration-300 ${
//         isScrolled
//           ? "bg-paper/95 backdrop-blur-md border-ink/15 shadow-sm py"
//           : "bg-paper/70 backdrop-blur-sm border-ink/10 py-1"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py">
//         {/* Logo — links back to Home, closes mobile menu if open */}
//         <Link
//           href="/"
//           onClick={() => setIsOpen(false)}
//           className="transition-opacity hover:opacity-85 flex items-center gap-2"
//         >
//           <Image
//             src="/logo.png"
//             alt="VMedex Digital"
//             width={100}
//             height={20}
//             priority
//             className="object-contain"
//           />
//         </Link>

//         {/* Desktop nav links — Editorial Film Strip Style */}
//         <nav className="hidden lg:flex items-center gap-7">
//           {navLinks.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={label}
//                 href={href}
//                 className={`group relative py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
//                   isActive
//                     ? "text-primary font-bold"
//                     : "text-ink/65 hover:text-ink hover:-translate-y-[2px]"
//                 }`}
//               >
//                 {/* Active Link: Minimal top hairline accent */}
//                 {isActive && (
//                   <motion.span
//                     layoutId="editorial-active-bar"
//                     className="absolute top-0 left-0 right-0 h-[2px] bg-primary"
//                     transition={{ type: "spring", stiffness: 350, damping: 28 }}
//                   />
//                 )}

//                 <span>{label}</span>

//                 {/* Hover Effect: Smooth rising bottom underline */}
//                 {!isActive && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-primary/80 transition-all duration-300 group-hover:w-full" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Desktop CTA button — Primary color with camera flare effect */}
//         <div className="hidden lg:block">
//           <Link
//             href="/contact"
//             className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <Camera className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
//               <span>Book Us</span>
//               <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </span>

//             {/* Light Sweep Reflection */}
//             <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
//           </Link>
//         </div>

//         {/* Mobile menu toggle */}
//         <button
//           className="lg:hidden text-ink p-1.5 rounded-md hover:bg-ink/5 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile nav panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.nav
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//             className="lg:hidden flex flex-col gap-2 px-6 pb-6 overflow-hidden border-t border-ink/5 pt-3"
//           >
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   onClick={() => setIsOpen(false)}
//                   className={`py-2 text-sm uppercase tracking-wider font-semibold transition-all flex items-center justify-between ${
//                     isActive
//                       ? "text-primary pl-3 border-l-2 border-primary bg-primary/5"
//                       : "text-ink/70 hover:text-primary hover:pl-2"
//                   }`}
//                 >
//                   <span>{label}</span>
//                   {isActive && (
//                     <span className="text-[10px] text-primary uppercase font-bold tracking-widest">
//                       Active
//                     </span>
//                   )}
//                 </Link>
//               );
//             })}
//             <div className="mt-3 pt-2">
//               <Button href="/contact">Book Us</Button>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight, Aperture } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent background scrolling when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//   }, [isOpen]);

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-paper/80 backdrop-blur-xl border-b border-ink/10 shadow-sm py-3"
//           : "bg-transparent py-5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
//         {/* Brand Logo with Live Status Indicator */}
//         <div className="flex items-center gap-3">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className="group relative flex items-center gap-3 transition-opacity hover:opacity-90"
//           >
//             <Image
//               src="/logo.png"
//               alt="VMedex Digital"
//               width={135}
//               height={38}
//               priority
//               className="object-contain"
//             />
//             {/* Live recording dot accent */}
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
//             </span>
//           </Link>
//         </div>

//         {/* Desktop Controls Group (Unified Glass Capsule) */}
//         <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-ink/5 dark:bg-paper/5 border border-ink/10 backdrop-blur-md">
//           {/* Navigation Items */}
//           <nav className="flex items-center gap-1 px-1">
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   className={`relative px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 z-10 ${
//                     isActive
//                       ? "text-primary"
//                       : "text-ink/70 hover:text-ink hover:scale-105"
//                   }`}
//                 >
//                   {/* Sliding active pill background */}
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-paper rounded-full shadow-sm border border-ink/10 -z-10"
//                       transition={{
//                         type: "spring",
//                         stiffness: 380,
//                         damping: 30,
//                       }}
//                     />
//                   )}
//                   <span>{label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Integrated CTA Button */}
//           <Link
//             href="/contact"
//             className="group relative inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95 overflow-hidden ml-1"
//           >
//             <span className="relative z-10 flex items-center gap-1.5">
//               <Aperture className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
//               <span>Book Us</span>
//               <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </span>
//             {/* Subtle light reflection sheen */}
//             <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
//           </Link>
//         </div>

//         {/* Mobile Hamburger Toggle Button */}
//         <button
//           className="lg:hidden text-ink z-50 p-2 rounded-full bg-ink/5 hover:bg-ink/10 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           <AnimatePresence mode="wait">
//             {isOpen ? (
//               <motion.div
//                 key="close"
//                 initial={{ opacity: 0, rotate: -90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 90 }}
//                 transition={{ duration: 0.15 }}
//               >
//                 <X size={22} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="open"
//                 initial={{ opacity: 0, rotate: 90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: -90 }}
//                 transition={{ duration: 0.15 }}
//               >
//                 <Menu size={22} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </button>
//       </div>

//       {/* Side-Drawer Mobile Overlay Navigation */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop Dimmer */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
//             />

//             {/* Sliding Side Drawer */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 bottom-0 z-40 w-4/5 max-w-sm bg-paper border-l border-ink/10 p-8 pt-24 lg:hidden flex flex-col justify-between shadow-2xl"
//             >
//               <nav className="flex flex-col gap-3">
//                 {navLinks.map(({ href, label }, idx) => {
//                   const isActive = pathname === href;
//                   return (
//                     <motion.div
//                       key={label}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.05 * idx + 0.1 }}
//                     >
//                       <Link
//                         href={href}
//                         onClick={() => setIsOpen(false)}
//                         className={`py-2 px-3 rounded-lg text-lg font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
//                           isActive
//                             ? "bg-primary/10 text-primary"
//                             : "text-ink/70 hover:text-ink hover:bg-ink/5"
//                         }`}
//                       >
//                         <span>{label}</span>
//                         {isActive && (
//                           <span className="w-2 h-2 rounded-full bg-primary" />
//                         )}
//                       </Link>
//                     </motion.div>
//                   );
//                 })}
//               </nav>

//               <div className="pt-6 border-t border-ink/10">
//                 <Link
//                   href="/contact"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all"
//                 >
//                   <span>Book Us</span>
//                   <ArrowUpRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// // Primary site navigation — used for both desktop and mobile menus
// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);

//   // We split the nav links to place the logo symmetrically in the middle on desktop
//   const leftNav = navLinks.slice(0, 4);
//   const rightNav = navLinks.slice(4);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     // Close mobile menu on resize to desktop
//     const handleResize = () => {
//         if (window.innerWidth >= 1024 && isOpen) {
//             setIsOpen(false);
//         }
//     }

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleResize);

//     return () => {
//         window.removeEventListener("scroll", handleScroll);
//         window.removeEventListener("resize", handleResize);
//     };
//   }, [isOpen]);

//   // Framer Motion Variants for mobile menu animation
//   const menuVariants = {
//     closed: { opacity: 0, scale: 0.98, y: -10 },
//     open: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.98,
//       y: -10,
//       transition: { duration: 0.25, ease: "easeIn" },
//     },
//   };

//   const navLinkVariants = {
//     closed: { opacity: 0, x: -10 },
//     open: (custom: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: { delay: 0.1 + custom * 0.05, duration: 0.3, ease: "easeOut" },
//     }),
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-paper/85 backdrop-blur-lg shadow-sm"
//           : "bg-paper/40 backdrop-blur-sm border-b border-ink/5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-5">

//         {/* Mobile menu toggle — Only below LG */}
//         <button
//           className="lg:hidden text-ink z-50 p-1 rounded-md hover:bg-ink/5 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>

//         {/* Desktop Split Nav Left — Hidden below LG */}
//         <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
//           {leftNav.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <NavLinkItem
//                 key={label}
//                 href={href}
//                 label={label}
//                 isActive={isActive}
//               />
//             );
//           })}
//         </nav>

//         {/* Symmetrical Logo — Links back to Home */}
//         <Link href="/" onClick={() => setIsOpen(false)} className="transition-opacity hover:opacity-85 z-50">
//           <Image
//             src="/logo.png"
//             alt="VMedex Digital"
//             width={130} // Slightly smaller for a more refined look
//             height={38}
//             priority
//             className="object-contain"
//           />
//         </Link>

//         {/* Desktop Split Nav Right — Hidden below LG */}
//         <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
//           {rightNav.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <NavLinkItem
//                 key={label}
//                 href={href}
//                 label={label}
//                 isActive={isActive}
//               />
//             );
//           })}
//         </nav>

//         {/* Desktop CTA button — High contrast minimalist button */}
//         <div className="hidden lg:block">
//           <Link
//             href="/contact"
//             className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink text-paper text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-ink/90 hover:shadow-xl active:scale-95"
//           >
//             <span className="relative z-10">Book Us</span>
//             <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//           </Link>
//         </div>

//         {/* Placeholder CTA for Mobile — Matches the toggle spacing */}
//         <div className="lg:hidden w-[26px]"></div>
//       </div>

//       {/* Modern, Minimalist Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial="closed"
//             animate="open"
//             exit="exit"
//             variants={menuVariants}
//             className="fixed inset-0 z-40 bg-paper/98 backdrop-blur-2xl px-6 pt-24 pb-12 overflow-y-auto lg:hidden"
//           >
//             <motion.nav className="flex flex-col gap-6">
//               {navLinks.map(({ href, label }, index) => {
//                 const isActive = pathname === href;
//                 return (
//                   <motion.div
//                     key={label}
//                     custom={index}
//                     variants={navLinkVariants}
//                   >
//                     <Link
//                       href={href}
//                       onClick={() => setIsOpen(false)}
//                       className={`text-2xl sm:text-3xl font-light uppercase tracking-tight transition-colors ${
//                         isActive ? "text-primary font-medium" : "text-ink/60 hover:text-primary"
//                       }`}
//                     >
//                       {label}
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </motion.nav>

//             {/* Mobile Mobile CTA Button at the bottom */}
//             <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
//                 className="mt-12 pt-8 border-t border-ink/5"
//             >
//                 <Link
//                   href="/contact"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full text-center inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-paper text-sm font-semibold uppercase tracking-widest active:scale-95 transition-all"
//                 >
//                   Book Us
//                 </Link>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// // Sub-component for a single desktop nav link item
// function NavLinkItem({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
//   const isHome = href === "/";

//   return (
//     <Link
//       href={href}
//       className={`group relative py-1 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
//         isActive ? "text-primary" : "text-ink/60 hover:text-ink"
//       }`}
//     >
//       {/* Active Top Line Indicator */}
//       {isActive && (
//         <motion.span
//           layoutId="active-top-line"
//           className={`absolute ${isHome ? "-left-1 -right-1" : "-left-0.5 -right-0.5"} -top-2.5 h-[1.5px] bg-primary`}
//           transition={{ type: "spring", stiffness: 350, damping: 30 }}
//         />
//       )}

//       {/* Hover Background Follower */}
//       <span
//         className="absolute inset-0 -inset-x-2 rounded-lg bg-ink/5 opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
//       />

//       <span className="relative z-10">{label}</span>
//     </Link>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight, Camera } from "lucide-react";
// import Button from "@/components/ui/Button";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// // Primary site navigation — used for both desktop and mobile menus
// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   // Controls whether the mobile menu is open or closed
//   const [isOpen, setIsOpen] = useState(false);

//   // Current route — used to highlight the active nav link
//   const pathname = usePathname();

//   // Tracks whether the page has been scrolled past 20px, to adjust header background
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`sticky top-0 z-50 border-b transition-all duration-300 ${
//         isScrolled
//           ? "bg-paper/90 backdrop-blur-md border-ink/10 shadow-sm"
//           : "bg-paper/60 backdrop-blur-sm border-transparent"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo — links back to Home, closes mobile menu if open */}
//         <Link
//           href="/"
//           onClick={() => setIsOpen(false)}
//           className="transition-opacity hover:opacity-85"
//         >
//           <Image
//             src="/logo.png"
//             alt="VMedex Digital"
//             width={140}
//             height={40}
//             priority
//           />
//         </Link>

//         {/* Desktop nav links — hidden below the lg breakpoint */}
//         <nav className="hidden lg:flex items-center gap-6">
//           {navLinks.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={label}
//                 href={href}
//                 className={`group relative px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
//                   isActive
//                     ? "text-primary"
//                     : "text-ink/70 hover:text-primary hover:-translate-y-[1px]"
//                 }`}
//               >
//                 {/* Active Link: ONLY the pulsing indicator dot on the left */}
//                 {isActive && (
//                   <motion.span
//                     layoutId="active-dot"
//                     className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.8)]"
//                     transition={{ type: "spring", stiffness: 350, damping: 25 }}
//                   />
//                 )}

//                 <span>{label}</span>

//                 {/* Hover Effect ONLY: Smooth sliding underline bar for non-active links */}
//                 {!isActive && (
//                   <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary/80 transition-all duration-300 ease-out group-hover:w-full" />
//                 )}

//                 {/* Viewfinder corner accent on hover (cinematic/lens feel) */}
//                 {!isActive && (
//                   <span className="absolute -top-0.5 -right-1 w-1 h-1 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Desktop CTA button — Primary color bg with spacious padding */}
//         <div className="hidden lg:block">
//           <Link
//             href="/contact"
//             className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-widest shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <Camera className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
//               <span>Book Us</span>
//               <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </span>

//             {/* Subtle Light Sweep Flare Effect */}
//             <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
//           </Link>
//         </div>

//         {/* Mobile menu toggle — only visible below the lg breakpoint */}
//         <button
//           className="lg:hidden text-ink p-1 rounded-md hover:bg-ink/5 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile nav panel — animates open/closed, only rendered below lg breakpoint */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.nav
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//             className="lg:hidden flex flex-col gap-2 px-6 pb-6 overflow-hidden border-t border-ink/5 pt-3"
//           >
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   onClick={() => setIsOpen(false)}
//                   className={`py-2 text-sm uppercase tracking-wider font-semibold transition-all flex items-center justify-between ${
//                     isActive
//                       ? "text-primary pl-2 border-l-2 border-primary"
//                       : "text-ink/70 hover:text-primary hover:pl-2"
//                   }`}
//                 >
//                   <span className="flex items-center gap-2">
//                     {isActive && (
//                       <span className="w-1.5 h-1.5 rounded-full bg-primary" />
//                     )}
//                     {label}
//                   </span>
//                   {isActive && (
//                     <span className="text-[10px] text-primary uppercase font-bold tracking-widest">
//                       Active
//                     </span>
//                   )}
//                 </Link>
//               );
//             })}
//             <div className="mt-3 pt-2">
//               <Button href="/contact">Book Us</Button>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight } from "lucide-react";
// import Button from "@/components/ui/Button";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// // Primary site navigation — used for both desktop and mobile menus
// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   // Controls whether the mobile menu is open or closed
//   const [isOpen, setIsOpen] = useState(false);

//   // Current route — used to highlight the active nav link
//   const pathname = usePathname();

//   // Tracks whether the page has been scrolled past 20px, to adjust header background
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`sticky top-0 z-50 border-b transition-all duration-300 ${
//         isScrolled
//           ? "bg-paper/95 backdrop-blur-md border-ink/10 shadow-sm"
//           : "bg-paper/60 backdrop-blur-sm border-transparent"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo — links back to Home, closes mobile menu if open */}
//         <Link
//           href="/"
//           onClick={() => setIsOpen(false)}
//           className="transition-opacity hover:opacity-85"
//         >
//           <Image
//             src="/logo.png"
//             alt="VMedex Digital"
//             width={140}
//             height={40}
//             priority
//           />
//         </Link>

//         {/* Desktop nav links — hidden below the lg breakpoint */}
//         <nav className="hidden lg:flex items-center gap-7">
//           {navLinks.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={label}
//                 href={href}
//                 className={`group relative py-1 text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
//                   isActive
//                     ? "text-primary font-semibold"
//                     : "text-ink/80 hover:text-primary hover:-translate-y-[1px]"
//                 }`}
//               >
//                 {/* Active link pulsing indicator dot */}
//                 {isActive && (
//                   <motion.span
//                     layoutId="active-dot"
//                     className="w-1.5 h-1.5 rounded-full bg-primary"
//                     transition={{ type: "spring", stiffness: 350, damping: 25 }}
//                   />
//                 )}

//                 <span>{label}</span>

//                 {/* Obvious Hover Underline with Glow */}
//                 <span
//                   className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
//                     isActive
//                       ? "w-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
//                       : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
//                   }`}
//                 />
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Desktop CTA button — hidden below the lg breakpoint */}
//         <div className="hidden lg:block">
//           <Link
//             href="/contact"
//             className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-paper text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center gap-1">
//               Book Us
//               <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </span>
//             {/* Subtle light sweep reflection effect on hover */}
//             <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
//           </Link>
//         </div>

//         {/* Mobile menu toggle — only visible below the lg breakpoint */}
//         <button
//           className="lg:hidden text-ink p-1 rounded-md hover:bg-ink/5 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile nav panel — animates open/closed, only rendered below lg breakpoint */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.nav
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//             className="lg:hidden flex flex-col gap-2 px-6 pb-6 overflow-hidden border-t border-ink/5 pt-3"
//           >
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   onClick={() => setIsOpen(false)}
//                   className={`py-2 text-base font-medium transition-all flex items-center justify-between ${
//                     isActive
//                       ? "text-primary font-semibold pl-2 border-l-2 border-primary"
//                       : "text-ink/80 hover:text-primary hover:pl-2"
//                   }`}
//                 >
//                   <span>{label}</span>
//                   {isActive && (
//                     <span className="text-xs text-primary uppercase font-bold">
//                       Active
//                     </span>
//                   )}
//                 </Link>
//               );
//             })}
//             <div className="mt-3 pt-2">
//               <Button href="/contact">Book Us</Button>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ArrowUpRight } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
//   const pathname = usePathname();

//   // Scroll detection for dynamic styling
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Lock body scroll when mobile overlay is active
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//   }, [isOpen]);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:py-4 transition-all duration-300">
//       <div
//         className={`max-w-7xl mx-auto rounded-2xl px-5 sm:px-8 py-3 flex items-center justify-between transition-all duration-300 ${
//           isScrolled
//             ? "bg-paper/80 backdrop-blur-xl border border-ink/10 shadow-lg shadow-black/[0.03]"
//             : "bg-paper/40 backdrop-blur-md border border-ink/5"
//         }`}
//       >
//         {/* Brand Logo */}
//         <Link
//           href="/"
//           onClick={() => setIsOpen(false)}
//           className="relative z-50 flex items-center transition-transform hover:scale-105 active:scale-95"
//         >
//           <Image
//             src="/logo.png"
//             alt="VMedex Digital"
//             width={130}
//             height={36}
//             priority
//             className="h-auto w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav
//           className="hidden lg:flex items-center gap-1 bg-ink/5 dark:bg-paper/5 p-1.5 rounded-full border border-ink/5"
//           onMouseLeave={() => setHoveredIdx(null)}
//         >
//           {navLinks.map(({ href, label }, idx) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={label}
//                 href={href}
//                 onMouseEnter={() => setHoveredIdx(idx)}
//                 className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 z-10 ${
//                   isActive ? "text-primary" : "text-ink/80 hover:text-ink"
//                 }`}
//               >
//                 {label}

//                 {/* Animated active pill indicator */}
//                 {isActive && (
//                   <motion.span
//                     layoutId="active-nav-pill"
//                     className="absolute inset-0 bg-paper dark:bg-ink rounded-full shadow-sm -z-10"
//                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                   />
//                 )}

//                 {/* Hover backdrop pill */}
//                 {hoveredIdx === idx && !isActive && (
//                   <motion.span
//                     layoutId="hover-nav-pill"
//                     className="absolute inset-0 bg-ink/10 dark:bg-paper/10 rounded-full -z-10"
//                     transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                   />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Action Button */}
//         <div className="hidden lg:flex items-center gap-3">
//           <Link
//             href="/contact"
//             className="relative group overflow-hidden rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-paper shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
//           >
//             <span className="relative z-10 flex items-center gap-1.5">
//               Book Us
//               <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </span>
//             <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
//           </Link>
//         </div>

//         {/* Mobile Hamburger Toggle */}
//         <button
//           className="relative z-50 p-2 lg:hidden text-ink rounded-full hover:bg-ink/5 transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           <AnimatePresence mode="wait">
//             {isOpen ? (
//               <motion.div
//                 key="close"
//                 initial={{ opacity: 0, rotate: -90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 90 }}
//                 transition={{ duration: 0.15 }}
//               >
//                 <X size={24} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="open"
//                 initial={{ opacity: 0, rotate: 90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: -90 }}
//                 transition={{ duration: 0.15 }}
//               >
//                 <Menu size={24} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </button>
//       </div>

//       {/* Premium Full-Screen Mobile Drawer */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: "-100%" }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: "-100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-8 pt-28 pb-12"
//           >
//             <motion.nav
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={{
//                 open: {
//                   transition: { staggerChildren: 0.05, delayChildren: 0.1 },
//                 },
//                 closed: {
//                   transition: { staggerChildren: 0.03, staggerDirection: -1 },
//                 },
//               }}
//               className="flex flex-col gap-4"
//             >
//               {navLinks.map(({ href, label }) => {
//                 const isActive = pathname === href;
//                 return (
//                   <motion.div
//                     key={label}
//                     variants={{
//                       open: { opacity: 1, x: 0 },
//                       closed: { opacity: 0, x: -20 },
//                     }}
//                   >
//                     <Link
//                       href={href}
//                       onClick={() => setIsOpen(false)}
//                       className={`text-2xl font-semibold tracking-tight transition-colors flex items-center justify-between group ${
//                         isActive ? "text-primary" : "text-ink/70 hover:text-ink"
//                       }`}
//                     >
//                       <span>{label}</span>
//                       <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </motion.nav>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="mt-8 pt-6 border-t border-ink/10 flex flex-col gap-4"
//             >
//               <Link
//                 href="/contact"
//                 onClick={() => setIsOpen(false)}
//                 className="w-full text-center py-3.5 rounded-xl bg-primary text-paper font-semibold text-sm tracking-wider uppercase shadow-lg shadow-primary/20"
//               >
//                 Book Us
//               </Link>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import Button from "@/components/ui/Button";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "motion/react";

// // Primary site navigation — used for both desktop and mobile menus
// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/services", label: "Services" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/training", label: "Training" },
//   { href: "/events", label: "Events" },
//   { href: "/testimonials", label: "Testimonials" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Header() {
//   // Controls whether the mobile menu is open or closed
//   const [isOpen, setIsOpen] = useState(false);

//   // Current route — used to highlight the active nav link
//   const pathname = usePathname();

//   // Tracks whether the page has been scrolled past 20px, to adjust header background
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`sticky top-0 z-50 border-b transition-all duration-300 ${
//         isScrolled
//           ? "bg-paper/95 backdrop-blur-md border-ink/10"
//           : "bg-paper/60 backdrop-blur-sm border-transparent"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo — links back to Home, closes mobile menu if open */}
//         <Link href="/" onClick={() => setIsOpen(false)}>
//           <Image
//             src="/logo.png"
//             alt="VMedex Digital"
//             width={140}
//             height={40}
//             priority
//           />
//         </Link>

//         {/* Desktop nav links — hidden below the lg breakpoint */}
//         <nav className="hidden lg:flex items-center gap-8">
//           {navLinks.map(({ href, label }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={label}
//                 href={href}
//                 className={`group relative text-sm font-medium transition-colors ${
//                   isActive ? "text-primary" : "text-ink hover:text-primary"
//                 }`}
//               >
//                 {label}
//                 {/* Animated underline — grows from left on hover */}
//                 <span
//                   className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-transform duration-300 origin-left ${
//                     isActive
//                       ? "w-full scale-x-100"
//                       : "w-full scale-x-0 group-hover:scale-x-100"
//                   }`}
//                 />
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Desktop CTA button — hidden below the lg breakpoint */}
//         <div className="hidden lg:block">
//           <Button href="/contact">Book Us</Button>
//         </div>

//         {/* Mobile menu toggle — only visible below the lg breakpoint */}
//         <button
//           className="lg:hidden text-ink"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label={isOpen ? "Close menu" : "Open menu"}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile nav panel — animates open/closed, only rendered below lg breakpoint */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.nav
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="lg:hidden flex flex-col gap-1 px-6 pb-6 overflow-hidden"
//           >
//             {navLinks.map(({ href, label }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={label}
//                   href={href}
//                   onClick={() => setIsOpen(false)}
//                   className={`py-2 text-sm font-medium transition-colors ${
//                     isActive ? "text-primary" : "text-ink hover:text-primary"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               );
//             })}
//             <div className="mt-2">
//               <Button href="/contact">Book Us</Button>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }
