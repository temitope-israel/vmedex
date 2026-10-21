import type { Metadata } from "next";
import RegisterContent from "@/components/sections/RegisterContent";

export const metadata: Metadata = {
  title: "Register for Training | VMedex Digital",
  description:
    "Register for VMedex Digital's beginner cinematography training programme.",
};

export default function RegisterPage() {
  return <RegisterContent />;
}
