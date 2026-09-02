// src/components/ui/WhatsAppFloat.tsx
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "motion/react";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/2349035585681"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
