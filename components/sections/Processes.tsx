import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WordsReveal } from "@/components/ui/WordsReveal";
import { processes } from "@/lib/site";
import { ProcessSwatch } from "./ProcessSwatch";

/**
 * The swatch the visitor can run through each process, then one full-screen panel per
 * process: its photograph drifting behind, its verb rising at the centre, its details below.
 */
export function Processes() {
  return (
    <section id="processes" className="bg-ground">
      <Container className="py-24 lg:py-28">
        <ProcessSwatch
          intro={
            <SectionHeading
              title="One swatch, five processes"
              description="Each process adds something to the same piece of seat material. Switch them on and off to see what each one does."
            />
          }
        />
      </Container>

      {processes.map((process, index) => {
        const next = processes[index + 1];
        return (
          <article key={process.id} id={process.id} className="group relative h-svh overflow-clip bg-charcoal-950">
            <Parallax className="absolute inset-0">
              <div
                className="absolute inset-[-6%]"
                style={{ translate: "0 calc(var(--parallax, 0) * 0.08px)" }}
              >
                <Image
                  src={process.image}
                  alt={process.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
            </Parallax>
            <div className="absolute inset-0 bg-charcoal-950/45" aria-hidden />

            <div className="relative flex h-full items-center justify-center px-4 pb-[38svh]">
              <WordsReveal
                as="h2"
                text={process.verb}
                className="text-center font-display text-display font-bold uppercase text-white"
              />
            </div>

            <Container className="absolute inset-x-0 bottom-4 sm:bottom-8">
              <Reveal delay={150} className="relative max-w-xl bg-charcoal-950/85 p-6 text-white sm:p-8">
                <span className="block h-0.5 w-10 bg-rose-600" aria-hidden />
                <h3 className="mt-4 text-lead font-semibold">{process.title}</h3>
                <p className="mt-3 text-body">{process.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {process.highlights.map((highlight) => (
                    <li key={highlight} className="bg-white/10 px-3 py-1.5 text-small text-white">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <a
                  href={next ? `#${next.id}` : "#quality"}
                  className="group/next mt-6 inline-flex items-center gap-2 text-small font-semibold text-white"
                >
                  {next ? `Next stage: ${next.title.replace(" Process", "")}` : "Next: Quality control"}
                  <span className="transition-transform duration-300 group-hover/next:translate-y-0.5" aria-hidden>
                    ↓
                  </span>
                </a>
              </Reveal>
            </Container>
          </article>
        );
      })}
    </section>
  );
}
