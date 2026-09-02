import type { Metadata } from "next";
import TrainingContent from "@/components/sections/TrainingContent";

export const metadata: Metadata = {
  title: "Beyond The Frame — Cinematography Training | VMedex Digital",
  description:
    "A 3-week intensive cinematography training programme covering camera, lighting, composition, editing, storytelling, and live streaming. No experience required.",
};

export default function TrainingPage() {
  return <TrainingContent />;
}
