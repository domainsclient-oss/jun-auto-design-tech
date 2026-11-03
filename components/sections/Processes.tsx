import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processes } from "@/lib/site";
import { ProcessCard } from "./ProcessCard";

export function Processes() {
  return (
    <section id="processes" className="relative bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Manufacturing Processes"
            title={
              <>
                From first pattern to <span className="text-rose-600">final cut</span>
              </>
            }
            description="Five core processes, managed under one roof, take interior materials from design concept to finished, ready-to-assemble components."
          />

          <nav aria-label="Processes" className="hidden lg:block">
            <ol className="flex flex-wrap gap-2">
              {processes.map((process, index) => (
                <li key={process.id}>
                  <a
                    href={`#${process.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-charcoal-100 px-4 py-2 text-xs font-semibold text-charcoal-700 transition-colors hover:border-rose-600 hover:text-rose-600"
                  >
                    <span className="text-rose-600">{String(index + 1).padStart(2, "0")}</span>
                    {process.title.replace(" Process", "")}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <ol className="relative mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {processes.map((process, index) => (
            <ProcessCard key={process.id} process={process} index={index} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
