import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";

/** Pinned heading on a charcoal field while the two services pass beside it. */
export function Services() {
  return (
    <section id="services" className="relative bg-charcoal-900 py-24 text-white lg:py-28">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="sticky top-24 z-10 -mx-4 bg-charcoal-900 px-4 py-3 font-display text-head font-bold uppercase sm:-mx-8 sm:px-8 lg:top-32 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
            What we do
          </h2>
        </div>

        <div className="flex flex-col gap-28 lg:col-span-7 lg:col-start-6 lg:gap-40">
          {services.map((service, index) => (
            <article key={service.id}>
              <Reveal as="h3" className="font-display text-sub font-bold uppercase">
                {service.title}
              </Reveal>
              <Reveal as="p" delay={80} className="mt-6 max-w-xl text-lead text-white">
                {service.summary}
              </Reveal>

              <div
                className={`mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 ${
                  index % 2 === 1 ? "sm:flex-row-reverse sm:justify-end" : ""
                }`}
              >
                <Reveal delay={160} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-[3/4] sm:w-56">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 640px) 224px, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                  />
                </Reveal>
                <ul className="flex flex-col gap-4">
                  {service.points.map((point, pointIndex) => (
                    <Reveal as="li" key={point} delay={200 + pointIndex * 70} className="flex gap-4 text-body text-white">
                      <span className="mt-[0.6em] h-2 w-2 shrink-0 bg-rose-600" aria-hidden />
                      {point}
                    </Reveal>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
