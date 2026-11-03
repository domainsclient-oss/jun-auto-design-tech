"use client";

import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { processes } from "@/lib/site";

type ProcessId = (typeof processes)[number]["id"];

const notes: Record<ProcessId, string> = {
  "design-development": "Pattern lines and seams are set out on the panel.",
  perforation: "A uniform field of holes opens the face for breathability.",
  embossing: "Heat and pressure press a diamond relief into the surface.",
  "hot-melt-lamination": "Face, hot melt adhesive, foam and scrim are bonded into one composite.",
  cutting: "The panel is cut to its approved shape; the rest is offcut.",
};

const LEATHER = "#9a5a36";
const HOLE = "#3b2015";
// Seat back panel outline used for the design lines and the final cut.
const PANEL = "M118 70 Q200 40 282 70 L312 380 Q314 412 284 416 L116 416 Q86 412 88 380 Z";

/**
 * The page's live specimen: one piece of seat material that the visitor runs through
 * each process. Every toggle adds or removes what that process does to the same swatch.
 */
export function ProcessSwatch({ intro }: { intro?: ReactNode }) {
  const [applied, setApplied] = useState<ProcessId[]>(processes.map((process) => process.id));
  const has = (id: ProcessId) => applied.includes(id);
  const toggle = (id: ProcessId) =>
    setApplied((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const latest = processes.filter((process) => has(process.id)).at(-1);
  const status = latest
    ? notes[latest.id]
    : "Raw seat material, before any process.";

  const holes: { x: number; y: number }[] = [];
  for (let row = 0; row < 18; row++) {
    for (let col = 0; col < 12; col++) {
      holes.push({ x: 145 + col * 10.5 + (row % 2) * 5.25, y: 150 + row * 11 });
    }
  }

  const laminated = has("hot-melt-lamination");
  const cut = has("cutting");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-between">
        <div>
        {intro}
        <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Processes applied to the swatch">
          {processes.map((process) => {
            const on = has(process.id);
            return (
              <li key={process.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(process.id)}
                  className={`group flex w-full items-center gap-4 px-4 py-3 text-left transition-[color,background-color,transform] duration-200 active:scale-[0.99] ${
                    on ? "bg-surface text-charcoal-900" : "text-charcoal-500 hover:bg-surface hover:text-charcoal-900"
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sub font-semibold uppercase leading-tight">{process.verb}</span>
                    <span className="block text-small text-charcoal-700">{process.caption}</span>
                  </span>
                  {/* On/off switch: the knob slides across a track that turns brand red when on. */}
                  <span
                    className={`relative inline-flex h-9 w-[4.5rem] shrink-0 items-center rounded-full transition-colors duration-300 ${
                      on ? "bg-rose-600" : "bg-charcoal-100 group-hover:bg-charcoal-300/60"
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`absolute text-[0.6875rem] font-bold tracking-wide transition-opacity duration-200 ${
                        on ? "left-3 text-white opacity-100" : "right-2.5 text-charcoal-500 opacity-100"
                      }`}
                    >
                      {on ? "ON" : "OFF"}
                    </span>
                    <span
                      className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.25)] transition-[left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on ? "left-[calc(100%-2rem)]" : "left-1"
                      }`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        </div>
        <div className="mt-8 lg:mt-12">
        <p className="max-w-sm text-body text-charcoal-900" aria-live="polite">
          {status}
        </p>
        <div className="mt-6 flex gap-6 text-body font-semibold">
          <button
            type="button"
            onClick={() => setApplied(processes.map((process) => process.id))}
            className="text-rose-700 underline-offset-4 hover:underline"
          >
            Apply all
          </button>
          <button
            type="button"
            onClick={() => setApplied([])}
            className="text-charcoal-900 underline-offset-4 hover:underline"
          >
            Start from raw material
          </button>
        </div>
        </div>
      </div>

      <Reveal as="figure" delay={120} className="relative bg-charcoal-900 lg:col-span-6">
        <div className="flex items-center justify-between gap-4 px-6 pt-6 text-small text-white sm:px-8 sm:pt-8" aria-live="polite">
          <span className="font-semibold">Seat face swatch</span>
          <span>
            <span className="font-display text-lead font-semibold text-rose-500">{applied.length}</span>
            <span className="text-white/70"> of {processes.length} applied</span>
          </span>
        </div>
        <div className="mx-6 mt-5 bg-surface sm:mx-8">
        <svg
          viewBox="0 0 400 520"
          role="img"
          aria-label={`Seat material swatch with ${applied.length ? processes.filter((p) => has(p.id)).map((p) => p.shortTitle.toLowerCase()).join(", ") : "no process"} applied`}
          className="mx-auto block h-auto w-full max-w-[440px]"
        >
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
            <clipPath id="panel-cut">
              <path d={PANEL} />
            </clipPath>
            <pattern id="diamond" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M0 0H28" stroke="rgb(0 0 0 / 0.28)" strokeWidth="2.2" />
              <path d="M0 2H28" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1.4" />
              <path d="M0 0V28" stroke="rgb(0 0 0 / 0.28)" strokeWidth="2.2" />
              <path d="M2 0V28" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1.4" />
            </pattern>
          </defs>

          {/* Material layers seen at the edge once laminated. */}
          <g className="transition-opacity duration-500" opacity={laminated ? 1 : 0}>
            <rect x="60" y="452" width="280" height="10" fill="#fa003f" />
            <rect x="60" y="462" width="280" height="22" fill="#d9d7d2" />
            <rect x="60" y="484" width="280" height="8" fill="#6f6e6a" />
          </g>

          {/* The face material; dimmed outside the cut line once cut. */}
          <g>
            <rect x="60" y="40" width="280" height="412" fill={LEATHER} opacity={cut ? 0.22 : 1} className="transition-opacity duration-500" />
            <g clipPath={cut ? "url(#panel-cut)" : undefined}>
              <rect x="60" y="40" width="280" height="412" fill={LEATHER} />
              <rect x="60" y="40" width="280" height="412" fill={LEATHER} filter="url(#grain)" />
              <rect
                x="60"
                y="40"
                width="280"
                height="412"
                fill="url(#diamond)"
                className="transition-opacity duration-500"
                opacity={has("embossing") ? 1 : 0}
              />
              <g className="transition-opacity duration-500" opacity={has("perforation") ? 1 : 0}>
                {holes.map((hole) => (
                  <circle key={`${hole.x}-${hole.y}`} cx={hole.x} cy={hole.y} r="2.1" fill={HOLE} />
                ))}
              </g>
            </g>
          </g>

          {/* Design lines: panel outline and seams. */}
          <g
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="transition-opacity duration-500"
            opacity={has("design-development") && !cut ? 1 : 0}
          >
            <path d={PANEL} />
            <path d="M136 132 H264 M132 352 H268" />
          </g>

          {/* Cut line. */}
          <path
            d={PANEL}
            fill="none"
            stroke="#fa003f"
            strokeWidth="3"
            className="transition-opacity duration-500"
            opacity={cut ? 1 : 0}
          />
        </svg>
        </div>
        <figcaption className="px-6 pb-6 pt-4 text-small text-white/80 sm:px-8 sm:pb-8">
          {laminated
            ? "Edge, top to bottom: face material, hot melt adhesive, foam, scrim."
            : "A swatch of seat face material, drawn to show what each process adds."}
        </figcaption>
      </Reveal>
    </div>
  );
}
