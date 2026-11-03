import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { WordsReveal } from "@/components/ui/WordsReveal";
import { services } from "@/lib/site";

/**
 * What we do: a heading row, then one editorial row per service, alternating sides.
 * Each photograph opens upward as it enters and drifts slowly inside its frame on scroll.
 */
export function Services() {
  return (
    <section id="services" className="bg-charcoal-900 py-24 text-white lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal as="h2" className="font-display text-head font-bold uppercase lg:col-span-5">
            What we do
          </Reveal>
          <WordsReveal
            text="Two disciplines: developing the design of interior materials, then finishing them with the processes that give them function and character."
            className="text-lead text-white/85 lg:col-span-6 lg:col-start-7"
          />
        </div>

        <div className="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-32">
          {services.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <article key={service.id} className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                <Parallax
                  className={`group/frame relative lg:col-span-7 ${reversed ? "lg:order-2 lg:col-start-6" : ""}`}
                >
                  {/* Curved frame: soft corners with one sweeping corner on the outer edge, mirrored per row. */}
                  <span
                    className={`absolute -top-6 h-24 w-24 rounded-full border-2 border-rose-600 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:rotate-90 sm:-top-8 sm:h-32 sm:w-32 ${
                      reversed ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`absolute inset-0 translate-y-4 rounded-[1.75rem] bg-charcoal-800 sm:translate-y-5 ${
                      reversed ? "-translate-x-4 rounded-tl-[6rem] sm:-translate-x-5 lg:rounded-tl-[9rem]" : "translate-x-4 rounded-tr-[6rem] sm:translate-x-5 lg:rounded-tr-[9rem]"
                    }`}
                    aria-hidden
                  />
                  <Reveal
                    variant="clip"
                    className={`group relative aspect-[16/11] overflow-hidden rounded-[1.75rem] ${
                      reversed ? "rounded-tl-[6rem] lg:rounded-tl-[9rem]" : "rounded-tr-[6rem] lg:rounded-tr-[9rem]"
                    }`}
                  >
                    <div
                      className="absolute inset-[-8%]"
                      style={{ translate: "0 calc(var(--parallax, 0) * 0.06px)" }}
                    >
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                </Parallax>

                <div className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:col-start-1 lg:pr-8" : "lg:col-start-8 lg:pl-8"}`}>
                  <Reveal as="h3" className="font-display text-[clamp(2rem,1.4rem+2vw,3rem)] font-bold uppercase leading-none">
                    {service.title}
                  </Reveal>
                  <Reveal as="p" delay={80} className="mt-6 text-lead text-white/90">
                    {service.summary}
                  </Reveal>
                  <ul className="mt-8 flex flex-col gap-3">
                    {service.points.map((point, pointIndex) => (
                      <Reveal
                        as="li"
                        key={point}
                        delay={140 + pointIndex * 70}
                        className="group/point flex items-start gap-4 bg-charcoal-800 px-5 py-4 text-body text-white transition-colors duration-300 hover:bg-charcoal-700"
                      >
                        <span
                          className="mt-[0.55em] h-2 w-2 shrink-0 rotate-45 bg-rose-600 transition-transform duration-300 group-hover/point:scale-125"
                          aria-hidden
                        />
                        {point}
                      </Reveal>
                    ))}
                  </ul>
                  <Reveal delay={440}>
                    <a
                      href="#contact"
                      className="group mt-8 inline-flex items-center gap-3 text-body font-semibold text-white"
                    >
                      Enquire about {service.title}
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </a>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
