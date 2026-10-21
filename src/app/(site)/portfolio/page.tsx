import type { Metadata } from "next";
import PortfolioContent from "@/components/sections/PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio | VMedex Digital",
  description:
    "Browse VMedex Digital's portfolio across photography, cinematography, content creation, training, and event coverage.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
