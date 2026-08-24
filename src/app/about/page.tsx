import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About Us | VMedex Digital",
  description:
    "VMedex Digital is a creative media and digital solutions company delivering photography, cinematography, content creation, training, and event coverage across Nigeria.",
};

export default function AboutPage() {
  return <AboutContent />;
}
