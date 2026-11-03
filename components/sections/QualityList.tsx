"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { qualitySteps } from "@/lib/site";

/** Sticky photograph beside an active list: the stage in focus opens and brings its picture. */
export function QualityList({ heading }: { heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

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
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-900 lg:aspect-[4/5]">
          {qualitySteps.map((step, index) => (
            <Image
              key={step.title}
              src={step.image}
              alt={step.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              loading="eager"
              className={`object-cover transition-opacity duration-300 ${index === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
      {heading}
      <ol className="mt-14 flex flex-col gap-4">
        {qualitySteps.map((step, index) => {
          const isActive = index === active;
          return (
            <li
              key={step.title}
              data-index={index}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
            >
              <h3>
              <button
                type="button"
                aria-expanded={isActive}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`w-full text-left font-display text-sub font-bold uppercase transition-colors duration-200 ${
                  isActive ? "text-charcoal-900" : "text-charcoal-500 hover:text-charcoal-900"
                }`}
              >
                {step.title}
              </button>
              </h3>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <p className="max-w-[40ch] overflow-hidden text-body text-charcoal-900">
                  <span className="block pb-6 pt-3">{step.description}</span>
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
