import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/ui/Parallax";

// Staggered entrance; written out in full so Tailwind can find each class.
const rise = [
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.25s_both]",
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.35s_both]",
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.45s_both]",
];

/**
 * Banner: the name, what the company does and the primary action on the left; on a charcoal
 * panel to the right, the main interior photograph with two close-ups layered over its edge,
 * each moving at its own pace as the page scrolls.
 */
export function Hero() {
  return (
    <section id="top" className="bg-ground pt-20">
      <div className="grid xl:min-h-[calc(100svh-5rem)] xl:grid-cols-12">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:px-10 xl:col-span-6 xl:py-12 xl:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] xl:pr-14">
          <h1 className="font-display text-hero font-bold uppercase text-charcoal-900">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block animate-[line-up_1s_var(--ease-premium)_both]">Jun Auto</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block animate-[line-up_1s_var(--ease-premium)_0.1s_both]">Design Tech</span>
            </span>
          </h1>
          <p className={`${rise[0]} mt-6 max-w-xl text-lead font-medium text-charcoal-900`}>
            Automotive interior materials, designed and finished in Sriperumbudur, Tamil Nadu.
          </p>
          <p className={`${rise[1]} mt-4 max-w-xl text-body text-charcoal-700`}>
            Design development, perforation, embossing, hot melt lamination and cutting for seat
            and trim materials, with quality control at every stage.
          </p>

          <div className={`${rise[2]} mt-10 flex flex-wrap items-center gap-x-8 gap-y-4`}>
            <Button asChild size="cta">
              <a href="#contact">Send an enquiry</a>
            </Button>
            <a
              href="#processes"
              className="group inline-flex items-center gap-2 text-body font-semibold text-charcoal-900"
            >
              See our processes
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          </div>

        </div>

        {/* Charcoal panel: the main photograph with two close-ups layered over its left edge. */}
        <Parallax className="relative h-[62svh] overflow-hidden bg-charcoal-950 sm:h-[72svh] xl:col-span-6 xl:h-auto">
          <div className="absolute inset-y-0 left-0 right-0 animate-[clip-reveal_1.3s_var(--ease-premium)_0.1s_both] overflow-hidden sm:left-[22%]">
            <Image
              src="/images/hero-interior.jpg"
              alt="Black leather seats with red piping and red seat belts"
              fill
              preload
              sizes="(min-width: 1280px) 40vw, (min-width: 640px) 78vw, 100vw"
              className="animate-drift object-cover"
            />
          </div>

          <figure
            className="absolute left-[5%] top-[12%] hidden w-[32%] sm:block"
            style={{ translate: "0 calc(var(--parallax, 0) * -0.12px)" }}
          >
            <div className="group relative aspect-[3/4] animate-[hero-rise_1s_var(--ease-premium)_0.6s_both] overflow-hidden border-[10px] border-charcoal-950">
              <Image
                src="/images/process-perforation.jpg"
                alt="Perforated leather seat face with contrast stitching"
                fill
                sizes="(min-width: 1280px) 16vw, 30vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            </div>
          </figure>

          <figure
            className="absolute bottom-[8%] left-[15%] hidden w-[27%] sm:block"
            style={{ translate: "0 calc(var(--parallax, 0) * -0.22px)" }}
          >
            <div className="group relative aspect-square animate-[hero-rise_1s_var(--ease-premium)_0.75s_both] overflow-hidden border-[10px] border-charcoal-950">
              <Image
                src="/images/process-embossing.jpg"
                alt="Tan leather seat with an embossed pattern"
                fill
                sizes="(min-width: 1280px) 14vw, 26vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            </div>
          </figure>

          <p className="absolute right-5 top-5 flex animate-[hero-rise_0.9s_var(--ease-premium)_0.9s_both] items-center gap-3 bg-charcoal-950/85 px-4 py-3 text-small font-medium text-white sm:right-8 sm:top-8">
            <span className="h-2 w-2 bg-rose-600" aria-hidden />
            Black leather with red piping
          </p>
        </Parallax>
      </div>
    </section>
  );
}
