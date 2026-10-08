import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About Us | VMedex Digital",
  description:
    "VMedex Digital is a creative media brand focused on capturing, creating, and delivering compelling visual experiences for individuals, brands, organizations, and events. We combine creativity, practical skill; compelling storytelling and intentional execution to produce content that goes beyond simply documenting moments, that goes beyond expectation.",
};

export default function AboutPage() {
  return <AboutContent />;
}
