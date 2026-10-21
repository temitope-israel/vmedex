import {
  Camera,
  Lightbulb,
  LayoutGrid,
  Scissors,
  Move3d,
  BookOpen,
  Radio,
  Clapperboard,
  Film,
  Video,
  Mic,
  Palette,
  Aperture,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// The database stores the KEY (left). Everything else looks the icon up here.
// The first seven match the icon names already saved in your table.
export const ICONS: Record<string, { label: string; Icon: LucideIcon }> = {
  camera: { label: "Camera", Icon: Camera },
  lightbulb: { label: "Lighting", Icon: Lightbulb },
  "layout-grid": { label: "Composition", Icon: LayoutGrid },
  "move-3d": { label: "Movement", Icon: Move3d },
  scissors: { label: "Editing", Icon: Scissors },
  "book-open": { label: "Storytelling", Icon: BookOpen },
  radio: { label: "Live broadcast", Icon: Radio },
  clapperboard: { label: "Production", Icon: Clapperboard },
  film: { label: "Film", Icon: Film },
  video: { label: "Video", Icon: Video },
  mic: { label: "Sound", Icon: Mic },
  palette: { label: "Colour", Icon: Palette },
  aperture: { label: "Optics", Icon: Aperture },
  users: { label: "Directing talent", Icon: Users },
  sparkles: { label: "Effects", Icon: Sparkles },
};

export const ICON_KEYS = Object.keys(ICONS);