import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processes } from "@/lib/site";
import { ProcessSwatch } from "./ProcessSwatch";

/**
 * The swatch the visitor can run through each process, then one full-screen panel per
 * process with its verb held at the centre while the photograph passes behind it.
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

      {processes.map((process) => (
        <article key={process.id} id={process.id} className="relative h-svh overflow-clip bg-charcoal-950">
          <Image
            src={process.image}
            alt={process.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-950/45" aria-hidden />

          <div className="relative flex h-full items-center justify-center px-4 pb-[34svh] sm:pb-0">
            <Reveal as="h2" className="text-center font-display text-display font-bold uppercase text-white">
              {process.verb}
            </Reveal>
          </div>

          <Container className="absolute inset-x-0 bottom-4 sm:bottom-8">
          <div className="max-w-md bg-charcoal-950/85 p-6 text-white sm:p-8">
            <h3 className="text-lead font-semibold">{process.title}</h3>
            <p className="mt-3 text-body">{process.description}</p>
            <p className="mt-4 text-small text-white">{process.highlights.join(" · ")}</p>
          </div>
          </Container>
        </article>
      ))}
    </section>
  );
}
