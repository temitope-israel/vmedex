import type { Metadata } from "next";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | VMedex Digital",
  description:
    "Get in touch with VMedex Digital for photography, cinematography, content creation, training, and event coverage enquiries.",
};

export default function ContactPage() {
  return <ContactContent />;
}
