"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { qualitySteps } from "@/lib/site";

/**
 * Sticky photograph beside a timeline of QC stages: the stage in focus opens, the red track
 * fills down to it, and the photograph crossfades to that stage with its progress shown on it.
 */
export function QualityList({ heading }: { heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastIndex = qualitySteps.length - 1;

  // The row crossing the middle of the screen becomes active while scrolling.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    rowRefs.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:sticky lg:top-[12vh] lg:col-span-5 lg:self-start">
        <Reveal variant="clip" className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-900 lg:aspect-[4/5]">
            {qualitySteps.map((step, index) => (
              <Image
                key={step.title}
                src={step.image}
                alt={step.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                loading={index === 0 ? "eager" : "lazy"}
                className={`object-cover transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}

            {/* Progress across the four stages, with the active stage named. */}
            <div className="absolute inset-x-0 bottom-0 bg-charcoal-950/85 p-5 text-white sm:p-6" aria-hidden>
              <div className="flex gap-1.5">
                {qualitySteps.map((step, index) => (
                  <span key={step.title} className="h-1 flex-1 overflow-hidden bg-white/20">
                    <span
                      className={`block h-full origin-left bg-rose-600 transition-transform duration-500 ${
                        index <= active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                ))}
              </div>
              <p className="mt-4 text-small text-white/70">
                Stage {active + 1} of {qualitySteps.length}
              </p>
              <p className="mt-1 font-display text-lead font-semibold uppercase leading-tight">
                {qualitySteps[active].title}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        {heading}
        <ol className="relative mt-14 flex flex-col gap-2">
          {/* Track and its red fill down to the active stage. */}
          <span className="absolute bottom-6 left-[15px] top-6 w-0.5 bg-charcoal-100" aria-hidden />
          <span
            className="absolute left-[15px] top-6 w-0.5 bg-rose-600 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ height: `calc((100% - 3rem) * ${active / lastIndex})` }}
            aria-hidden
          />

          {qualitySteps.map((step, index) => {
            const isActive = index === active;
            const isPassed = index <= active;
            return (
              <li
                key={step.title}
                data-index={index}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className="relative pl-14"
              >
                <span
                  className={`absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    isPassed ? "border-rose-600 bg-rose-600" : "border-charcoal-300 bg-white"
                  }`}
                  aria-hidden
                >
                  <span className={`h-2 w-2 rounded-full ${isPassed ? "bg-white" : "bg-charcoal-300"}`} />
                </span>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`w-full py-4 text-left font-display text-sub font-semibold uppercase transition-colors duration-200 ${
                      isActive ? "text-charcoal-900" : "text-charcoal-500 hover:text-charcoal-900"
                    }`}
                  >
                    {step.title}
                  </button>
                </h3>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="max-w-[44ch] overflow-hidden text-body text-charcoal-700">
                    <span className="block pb-6">{step.description}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
