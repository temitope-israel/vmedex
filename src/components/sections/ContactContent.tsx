"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

const services = [
  "Photography",
  "Cinematography & Video",
  "Content Creation",
  "Training",
  "Events & Media Coverage",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Updates a single field in formData without touching the others
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <div className="bg-paper text-ink min-h-screen selection:bg-primary selection:text-paper">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header & quick contact bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pb-12 border-b border-ink/10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary rounded-full bg-primary/10 border border-primary/20 inline-flex items-center gap-2 px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Inquiry</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
              Start A <br />
              <span className="text-primary">Project.</span>
            </h1>

            {/* Matches the same placeholder contact details used in the Footer — swap both together once real info arrives */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-semibold uppercase tracking-wider text-ink/70">
              <a
                href="mailto:hello@vmedexdigital.com"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>hello@vmedexdigital.com</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="tel:+2348000000000"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>+234 800 000 0000</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="pt-12 space-y-10"
        >
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="relative group">
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-ink/50 mb-1 group-focus-within:text-primary transition-colors"
              >
                Your Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Chibuzor Ademide"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-ink/15 py-2 text-base text-ink outline-none focus:border-primary transition-all placeholder:text-ink/20"
              />
            </div>

            <div className="relative group">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-ink/50 mb-1 group-focus-within:text-primary transition-colors"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="chibuzoademide@mail.com"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-ink/15 py-2 text-base text-ink outline-none focus:border-primary transition-all placeholder:text-ink/20"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="relative group">
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-ink/50 mb-1 group-focus-within:text-primary transition-colors"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+234..."
                value={formData.phone}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-ink/15 py-2 text-base text-ink outline-none focus:border-primary transition-all placeholder:text-ink/20"
              />
            </div>

            <div className="relative group">
              <label
                htmlFor="service"
                className="block text-xs font-bold uppercase tracking-wider text-ink/50 mb-1 group-focus-within:text-primary transition-colors"
              >
                Service Focus
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full bg-transparent border-b-2 border-ink/15 py-2 text-base text-ink outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="" className="bg-paper text-ink">
                  Select a capability
                </option>
                {services.map((service) => (
                  <option
                    key={service}
                    value={service}
                    className="bg-paper text-ink"
                  >
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative group">
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-ink/50 mb-1 group-focus-within:text-primary transition-colors"
            >
              Project Overview *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your objectives, timeline, or key deliverables..."
              value={formData.message}
              onChange={handleChange}
              disabled={status === "submitting"}
              className="w-full bg-transparent border-b-2 border-ink/15 py-2 text-base text-ink outline-none focus:border-primary transition-all resize-none placeholder:text-ink/20"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-500/10 text-red-600 text-xs font-semibold">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>Inquiry submitted! We will reach out within 24 hours.</span>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-10 py-4 text-xs font-bold uppercase tracking-widest text-paper hover:bg-primary transition-all duration-300 disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Send Brief</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
