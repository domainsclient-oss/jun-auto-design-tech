import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="relative bg-charcoal-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Two disciplines, <span className="text-rose-600">one standard of precision</span>
            </>
          }
          description="We support automotive interior programs from design through finishing, so every material leaves our facility ready for the next stage of production."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal
              as="article"
              key={service.id}
              delay={index * 150}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-charcoal-100 transition-shadow duration-500 hover:shadow-2xl hover:shadow-charcoal-900/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-600 font-display text-sm font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <p className="text-base leading-relaxed text-charcoal-500">{service.summary}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-charcoal-700">
                      <CheckIcon />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden>
        <path
          d="m3.5 8.5 3 3 6-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
