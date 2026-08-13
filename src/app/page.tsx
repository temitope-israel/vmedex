import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Reveal from "@/components/ui/Reveal"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-semibold text-primary">VMedex Digital</h1>


<Reveal>

      <Button href="/contact">Book Us</Button>
</Reveal>

<div className="h-[120vh]"/>

<Reveal>
  <p className="text-4xl text-primary">This faded in on scroll</p>
</Reveal>




    </main>
  );
}
