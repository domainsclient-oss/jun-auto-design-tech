import Image from "next/image";
import { ContactIcon } from "@/components/ui/ContactIcon";

// Staggered entrance; written out in full so Tailwind can find each class.
const rise = [
  "animate-[hero-rise_0.9s_var(--ease-premium)_0s_both]",
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.08s_both]",
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.16s_both]",
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.24s_both]",
  "animate-[hero-rise_0.9s_var(--ease-premium)_0.32s_both]",
];

/**
 * Banner: company, what it does and the primary action on the left; a three-photo
 * composition of finished surfaces on the right.
 */
export function Hero() {
  return (
    <section id="top" className="bg-ground pt-20">
      <div className="grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:col-span-6 lg:py-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-16">
          <h1 className={`${rise[0]} font-display text-hero font-bold uppercase text-charcoal-900`}>
            Jun Auto <span className="sm:block">Design Tech</span>
          </h1>
          <p className={`${rise[1]} mt-6 max-w-xl text-lead font-medium text-charcoal-900`}>
            Automotive interior materials, designed and finished in Sriperumbudur, Tamil Nadu.
          </p>
          <p className={`${rise[2]} mt-4 max-w-xl text-body text-charcoal-700`}>
            Design development, perforation, embossing, hot melt lamination and cutting for seat
            and trim materials, with quality control at every stage.
          </p>

          <div className={`${rise[3]} mt-10 flex flex-wrap items-center gap-x-8 gap-y-4`}>
            <a
              href="#contact"
              className="inline-flex items-center bg-rose-700 px-7 py-4 text-body font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-rose-800 active:scale-[0.97]"
            >
              Send an enquiry
            </a>
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

          <p className={`${rise[4]} mt-12 flex items-start gap-3 text-small text-charcoal-900`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface text-rose-700">
              <ContactIcon type="address" className="h-4 w-4" />
            </span>
            <span className="pt-2">SIPCOT Industrial Park, Vallam, Sriperumbudur, Tamil Nadu</span>
          </p>
        </div>

        {/* Three finished surfaces: one large, two close-ups. */}
        <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:h-[60svh] lg:col-span-6 lg:h-auto">
          <div className="relative col-span-3 row-span-2 aspect-[4/3] overflow-hidden bg-charcoal-900 sm:col-span-2 sm:aspect-auto">
            <Image
              src="/images/hero-interior.jpg"
              alt="Black leather seats with red piping and red seat belts"
              fill
              preload
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 66vw, 100vw"
              className="animate-drift object-cover"
            />
          </div>
          <div className="relative hidden overflow-hidden bg-charcoal-900 sm:block">
            <Image
              src="/images/process-perforation.jpg"
              alt="Perforated leather seat face with contrast stitching"
              fill
              sizes="(min-width: 1024px) 17vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            />
          </div>
          <div className="relative hidden overflow-hidden bg-charcoal-900 sm:block">
            <Image
              src="/images/process-embossing.jpg"
              alt="Tan leather seat with an embossed pattern"
              fill
              sizes="(min-width: 1024px) 17vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
