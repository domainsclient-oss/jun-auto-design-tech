"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { qualitySteps } from "@/lib/site";

// Scroll distance each stage stays open for while the section is pinned.
const STAGE_SCROLL_VH = 40;
// Where the pinned block sits below the top of the screen (clears the 80px header).
const PIN_TOP_PX = 96;

/**
 * Sticky photograph beside a timeline of QC stages: the stage in focus opens, the red track
 * fills down to it, and the photograph crossfades to that stage with its progress shown on it.
 * On large screens the block holds in place and scrolling steps through the stages at an even
 * pace; on smaller screens, where it is taller than the screen, stages open on tap.
 */
export function QualityList({ heading }: { heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Where a click is scrolling the page to, and the timer that stops waiting for it.
  const clickScroll = useRef<number | null>(null);
  const clickTimer = useRef<number | undefined>(undefined);
  const lastIndex = qualitySteps.length - 1;

  // Pin only on large screens where the whole block fits below the header.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const update = () =>
      setPinned(window.innerWidth >= 1024 && grid.offsetHeight + PIN_TOP_PX + 40 <= window.innerHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // While pinned, the scroll through the extra distance picks the stage.
  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const releaseClick = () => {
      clickScroll.current = null;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        // A clicked stage stays open while the page glides to it; the stages passed on the way are skipped.
        const pending = clickScroll.current;
        if (pending !== null) {
          if (Math.abs(window.scrollY - pending) > 2) return;
          releaseClick();
        }
        const extra = (window.innerHeight * STAGE_SCROLL_VH * qualitySteps.length) / 100;
        const progress = (PIN_TOP_PX - wrapper.getBoundingClientRect().top) / extra;
        setActive(Math.min(Math.max(Math.floor(progress * qualitySteps.length), 0), lastIndex));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Scrolling by hand mid-glide hands control straight back to the scroll position.
    window.addEventListener("wheel", releaseClick, { passive: true });
    window.addEventListener("touchstart", releaseClick, { passive: true });
    window.addEventListener("keydown", releaseClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", releaseClick);
      window.removeEventListener("touchstart", releaseClick);
      window.removeEventListener("keydown", releaseClick);
    };
  }, [pinned, lastIndex]);

  // A click opens the stage; while pinned it also scrolls to that stage's place so the two agree.
  const openStage = (index: number) => {
    setActive(index);
    const wrapper = wrapperRef.current;
    if (!pinned || !wrapper) return;
    const extra = (window.innerHeight * STAGE_SCROLL_VH * qualitySteps.length) / 100;
    const pinStart = window.scrollY + wrapper.getBoundingClientRect().top - PIN_TOP_PX;
    const top = Math.round(pinStart + ((index + 0.5) / qualitySteps.length) * extra);
    clickScroll.current = top;
    // Stop waiting if the glide never lands exactly (e.g. the page cannot scroll that far).
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      clickScroll.current = null;
    }, 1500);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef}>
    <div
      ref={gridRef}
      className={`grid gap-12 lg:grid-cols-12 lg:gap-8 ${pinned ? "sticky" : ""}`}
      style={pinned ? { top: PIN_TOP_PX } : undefined}
    >
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
              <li key={step.title} className="relative pl-14">
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
                    onClick={() => openStage(index)}
                    onFocus={() => setActive(index)}
                    className={`w-full cursor-pointer py-4 text-left font-display text-sub font-semibold uppercase transition-colors duration-200 ${
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
    {/* Scroll room for the pinned block; padding would not count, a sticky element only travels through content. */}
    {pinned && <div style={{ height: `${STAGE_SCROLL_VH * qualitySteps.length}vh` }} aria-hidden />}
    </div>
  );
}
