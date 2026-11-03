import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { HeroProcessRail } from "./HeroProcessRail";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal-950 pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10 animate-slow-zoom">
        <Image
          src="/images/hero-interior.jpg"
          alt="Premium automotive interior with black leather seats and red accent trim"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_16_19/0.96)_0%,rgb(15_16_19/0.8)_45%,rgb(15_16_19/0.3)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent"
        aria-hidden
      />

      <Container className="flex flex-1 items-center py-10">
        <div className="max-w-2xl">
          <p className="animate-fade-up flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-200 sm:text-xs">
            <span className="h-px w-10 bg-rose-500" aria-hidden />
            {siteConfig.tagline}
          </p>

          <h1
            className="animate-fade-up mt-6 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Jun Auto
            <span className="block text-rose-500">Design Tech</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Precision design development and post-processing for automotive interior materials.
            Surfaces that look refined, feel premium and perform on every vehicle program.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3 sm:gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <Button href="#services">Explore Services</Button>
            <Button href="#contact" variant="outline-light">
              Send an Enquiry
            </Button>
          </div>
        </div>
      </Container>

      <HeroProcessRail />
    </section>
  );
}
