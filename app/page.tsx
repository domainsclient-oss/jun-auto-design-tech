import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { IsoCertification } from "@/components/sections/IsoCertification";
import { Marquee } from "@/components/sections/Marquee";
import { Processes } from "@/components/sections/Processes";
import { QualityControl } from "@/components/sections/QualityControl";
import { Services } from "@/components/sections/Services";
import { sectionVisibility } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        {sectionVisibility.about && <About />}
        <Services />
        <IsoCertification />
        <Processes />
        <QualityControl />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
