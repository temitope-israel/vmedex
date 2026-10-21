// import type { Metadata } from "next";
// import TrainingContent from "@/components/sections/TrainingContent";

// export const metadata: Metadata = {
//   title: "Beyond The Frame — Cinematography Training | VMedex Digital",
//   description:
//     "A 3-week intensive cinematography training programme covering camera, lighting, composition, editing, storytelling, and live streaming. No experience required.",
// };

// export default function TrainingPage() {
//   return <TrainingContent />;
// }


import type { Metadata } from "next";
import TrainingContent from "@/components/sections/TrainingContent";
import { getActiveCohort, getCurriculum } from "@/lib/training";

export const metadata: Metadata = {
  title: "Cinematography Training | VMedex Digital",
  description:
    "A 3-week intensive cinematography training programme covering camera, lighting, composition, editing, storytelling, and live streaming. No experience required.",
};

// Render on every request so the page always reflects the latest database content
export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  // Run both queries at the same time instead of one after the other
  const [cohort, curriculum] = await Promise.all([
    getActiveCohort(),
    getCurriculum(),
  ]);

  return <TrainingContent cohort={cohort} curriculum={curriculum} />;
}
