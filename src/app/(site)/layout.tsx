
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Reveal from "@/components/ui/Reveal";
import IntroGate from "@/components/sections/IntroGate";





export default function SiteLayout({ children }: {children: React.ReactNode} ){
  return (


        <IntroGate>
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Reveal>
              <Footer />
            </Reveal>
            <WhatsAppFloat />
          </SmoothScroll>
        </IntroGate>
  
  );
}
