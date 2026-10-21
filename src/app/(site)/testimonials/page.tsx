import type { Metadata } from "next";
import TestimonialsContent from "@/components/sections/TestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials | VMedex Digital",
  description:
    "See what clients say about working with VMedex Digital across photography, cinematography, content creation, training, and event coverage.",
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
