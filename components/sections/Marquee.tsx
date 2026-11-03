import { Container } from "@/components/ui/Container";
import { processes } from "@/lib/site";

const items = [
  ...processes.map((process) => ({ name: process.title.replace(" Process", ""), href: `#${process.id}` })),
  { name: "Quality Control", href: "#quality" },
];

/** A red band of process names running off both edges; each name links to its section. */
export function Marquee() {
  // Two identical halves so the -50% translate loops seamlessly; only the first half is reachable by keyboard and screen readers.
  const halves = [items, items];

  return (
    <section aria-labelledby="capabilities-sentence" className="bg-ground">
      <nav aria-label="Capabilities" className="flex items-center overflow-hidden bg-rose-600 py-5 text-white lg:py-6">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused] has-[:focus-visible]:[animation-play-state:paused]">
          {halves.map((half, halfIndex) => (
            <ul key={halfIndex} className="flex items-center" aria-hidden={halfIndex === 1 ? true : undefined}>
              {half.map((item) => (
                <li key={item.name} className="flex items-center">
                  <a
                    href={item.href}
                    tabIndex={halfIndex === 1 ? -1 : undefined}
                    className="whitespace-nowrap px-[0.4em] font-display text-head font-bold uppercase transition-colors duration-200 hover:text-charcoal-950 focus-visible:text-charcoal-950 focus-visible:outline-none"
                  >
                    {item.name}
                  </a>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white sm:h-3.5 sm:w-3.5" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </nav>
      <Container className="py-10 lg:py-12">
        <h2 id="capabilities-sentence" className="max-w-3xl text-lead font-medium text-charcoal-900">
          The stages a seat or trim material passes through with us, at SIPCOT Industrial Park,
          Sriperumbudur.
        </h2>
      </Container>
    </section>
  );
}
