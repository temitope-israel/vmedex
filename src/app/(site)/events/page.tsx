import type { Metadata } from "next";
import EventsContent from "@/components/sections/EventsContent";

export const metadata: Metadata = {
  title: "Events & Media Coverage | VMedex Digital",
  description:
    "End-to-end visual coverage for corporate events, conferences, weddings, product launches, and more with VMedex Digital.",
};

export default function EventsPage() {
  return <EventsContent />;
}
