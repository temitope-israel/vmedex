import type { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent";

export const metadata: Metadata = {
  title: "Our Services | VMedex Digital",
  description:
    "Explore VMedex Digital's full range of services — photography, cinematography, content creation, training, and event coverage.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
