"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

// Trajectories
const baseItems = [
  { src: "/photography.jpg", tx: "-85vw", ty: "-75vh", r: -12 },
  { src: "/cinematography.jpg", tx: "85vw", ty: "-75vh", r: 12 },
  { src: "/content-creation.jpg", tx: "-80vw", ty: "80vh", r: -15 },
  { src: "/training.jpg", tx: "80vw", ty: "80vh", r: 15 },
  { src: "/events.jpg", tx: "-95vw", ty: "0vh", r: -8 },
  { src: "/photography-1.jpg", tx: "95vw", ty: "0vh", r: 8 },
  { src: "/events-1.jpg", tx: "0vw", ty: "-90vh", r: -6 },
  { src: "/cinematography-1.jpg", tx: "0vw", ty: "90vh", r: 6 },
];

const warpItems = Array.from({ length: 3 }, (_, groupIndex) =>
  baseItems.map((item, index) => ({
    ...item,
    id: `warp-${groupIndex}-${index}-${item.src}`,
  })),
).flat();

type Phase = "intro" | "bursting" | "done";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Guard ref to prevent re-triggering during animation
  const isStartedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Magnetic Button Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.3);
    mouseY.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Synchronize initial state on client mount only
  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("vmedex-intro-seen");
    if (seen === "true") {
      setPhase("done");
      isStartedRef.current = true;
    }
  }, []);

  // Lock document scroll while intro is playing
  useEffect(() => {
    if (!mounted) return;
    if (phase !== "done") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [phase, mounted]);

  const handleBegin = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Strict lock: if already started or transitioning, ignore clicks
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    // Immediately mark seen so refresh doesn't replay
    sessionStorage.setItem("vmedex-intro-seen", "true");
    setPhase("bursting");

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setPhase("done");
    }, 3200);
  };

  // Prevents SSR layout shifts before hydration completes
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <>
      {/* 1. INTRO OVERLAY LAYER */}
      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            key="global-intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden touch-none select-none w-screen h-screen"
          >
            {/* Film Grain */}
            <div
              className="fixed inset-[-60%] w-[220%] h-[220%] z-[201] pointer-events-none opacity-[0.04] transform-gpu"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
                backgroundSize: "220px 220px",
              }}
            />

            {/* Vignette */}
            <div className="fixed inset-0 z-[202] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />

            {/* Header Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="absolute top-8 left-8 text-white font-semibold tracking-widest text-xl uppercase flex items-center gap-2 z-[210]"
            >
              <span
                className="h-2 w-2 rounded-full bg-primary animate-ping"
                style={{ animationDuration: "2s" }}
              />
              VMEDEX DIGITAL
            </motion.div>

            {/* BEGIN BUTTON */}
            {phase === "intro" && (
              <motion.button
                key="intro-btn"
                type="button"
                onClick={handleBegin}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: springX, y: springY }}
                className="relative flex h-40 w-40 items-center justify-center group cursor-pointer z-[210] focus:outline-none"
                aria-label="Enter site intro sequence"
              >
                {/* Outermost Ring */}
                <motion.div
                  className="absolute inset-0 h-full w-full pointer-events-none flex items-center justify-center"
                  animate={{ scale: isHovered ? 1.12 : 1.0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full spin-outer"
                    style={{
                      ["--outer-speed" as string]: isHovered ? "0.5s" : "30s",
                    }}
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeDasharray="3 7"
                      className={`transition-colors duration-500 ${
                        isHovered ? "text-primary" : "text-white/20"
                      }`}
                    />
                  </svg>
                </motion.div>

                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-0 h-full w-full pointer-events-none flex items-center justify-center"
                  animate={{ scale: isHovered ? 1.08 : 1.0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full spin-inner"
                    style={{
                      ["--inner-speed" as string]: isHovered ? "0.2s" : "22s",
                    }}
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.3"
                      strokeDasharray="10 8 2 8"
                      className={`transition-colors duration-500 ${
                        isHovered ? "text-primary/90" : "text-white/30"
                      }`}
                    />
                  </svg>
                </motion.div>

                {/* Inner Glass Circle */}
                <div
                  className={`absolute inset-10 rounded-full border transition-all duration-500 bg-neutral-950/80 backdrop-blur-sm overflow-hidden ${
                    isHovered
                      ? "border-primary/50 shadow-[0_0_35px_rgba(var(--primary-rgb),0.25)]"
                      : "border-white/10"
                  }`}
                />

                {/* Center Content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <motion.span
                    animate={{
                      scale: [0.85, 1.3, 0.85],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--tw-shadow-color)] shadow-primary mb-2"
                  />
                  <span className="text-white text-xs font-black uppercase tracking-[0.35em] pl-0.5 mt-3">
                    BEGIN
                  </span>
                </div>
              </motion.button>
            )}

            {/* BURSTING PICTURES SEQUENCE */}
            {phase === "bursting" && (
              <div
                key="bursting-stage"
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-[205]"
              >
                {warpItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      scale: 0.1,
                      x: "0vw",
                      y: "0vh",
                      rotateZ: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.1, 0.8, 1.8, 2.5],
                      x: ["0vw", `calc(${item.tx} * 0.4)`, item.tx],
                      y: ["0vh", `calc(${item.ty} * 0.4)`, item.ty],
                      rotateZ: [0, item.r * 0.5, item.r],
                    }}
                    transition={{
                      duration: 2.2,
                      delay: i * 0.08,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="absolute w-[240px] sm:w-[300px] md:w-[360px] aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 transform-gpu"
                  >
                    <Image
                      src={item.src}
                      alt="Portfolio showcase preview"
                      fill
                      sizes="(max-width: 768px) 240px, 360px"
                      priority={i < 6}
                      className="object-cover grayscale"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. LANDING PAGE CONTENT (ANIMATES IN WHEN DONE) */}

      {/* LANDING PAGE CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80, // Started lower (increased from 30/40 to 80 for a grander glide up)
          scale: 0.94, // Scaled down slightly more so it expands outwards as it rises
          filter: "blur(8px)", // Added a subtle cinematic depth-of-field blur
        }}
        animate={
          phase === "done"
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y: 80,
                scale: 0.94,
                filter: "blur(8px)",
              }
        }
        transition={{
          duration: 4.2, // Slower duration for a buttery smooth entrance (up from 1.4s)
          delay: 0.1, // Tiny breathing pause right as the pictures burst finishes
          // Ultra-smooth luxury custom ease curve [cubic-bezier(0.16, 1, 0.3, 1)]
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          pointerEvents: phase === "done" ? "auto" : "none",
        }}
      >
        {children}
      </motion.div>
      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          phase === "done" ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
        }
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: phase === "done" ? "auto" : "none",
        }}
      >
        {children}
      </motion.div> */}
    </>
  );
}
