import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WordsReveal } from "@/components/ui/WordsReveal";
import { processes } from "@/lib/site";

const items = [
  ...processes.map((process) => ({ name: process.title.replace(" Process", ""), href: `#${process.id}` })),
  { name: "Quality Control", href: "#quality" },
];

/**
 * A red band of capability names running off both edges, alternating solid and outlined
 * letters; each name links to its section. Below it, the statement that explains the band.
 */
export function Marquee() {
  // Two identical halves so the -50% translate loops seamlessly; only the first half is reachable by keyboard and screen readers.
  const halves = [items, items];

  return (
    <section aria-labelledby="capabilities-heading" className="bg-ground">
      <h2 id="capabilities-heading" className="sr-only">
        Our capabilities
      </h2>
      <nav aria-label="Capabilities" className="flex items-center overflow-hidden bg-rose-600 py-5 text-white lg:py-6">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused] has-[:focus-visible]:[animation-play-state:paused]">
          {halves.map((half, halfIndex) => (
            <ul key={halfIndex} className="flex items-center" aria-hidden={halfIndex === 1 ? true : undefined}>
              {half.map((item, index) => (
                <li key={item.name} className="flex items-center">
                  <a
                    href={item.href}
                    tabIndex={halfIndex === 1 ? -1 : undefined}
                    className={`whitespace-nowrap px-[0.4em] font-display text-head font-bold uppercase transition-colors duration-300 focus-visible:outline-none ${
                      index % 2 === 1
                        ? "text-transparent [-webkit-text-stroke:1.5px_#ffffff] hover:text-white focus-visible:text-white"
                        : "text-white hover:text-charcoal-950 focus-visible:text-charcoal-950"
                    }`}
                  >
                    {item.name}
                  </a>
                  <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-white sm:h-3.5 sm:w-3.5" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </nav>

      <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-24">
        <WordsReveal
          as="p"
          text="The stages a seat or trim material passes through with us, at SIPCOT Industrial Park, Sriperumbudur."
          className="text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-medium leading-[1.25] text-charcoal-900 lg:col-span-8"
        />
        <Reveal delay={200} className="lg:col-span-3 lg:col-start-10">
          <p className="text-body text-charcoal-700">
            Each stage in the band links straight to its step further down the page.
          </p>
          <a
            href="#processes"
            className="group mt-5 inline-flex items-center gap-2 text-body font-semibold text-charcoal-900"
          >
            See all processes
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
