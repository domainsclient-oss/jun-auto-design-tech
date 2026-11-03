import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    title: "Design-Led",
    description: "Engineering thinking applied from the very first pattern.",
  },
  {
    title: "Process Expertise",
    description: "In-house perforation, embossing, lamination and cutting.",
  },
  {
    title: "Quality Focused",
    description: "Inspection at every stage, from material to finished part.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-24 sm:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-charcoal-100 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/factory-line.jpg"
              alt="Automated automotive production line with robotic arms"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-4 w-44 overflow-hidden rounded-2xl border-4 border-white sm:-right-6 sm:w-56">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about-seat.jpg"
                alt="Finished leather automotive seat with precise stitching"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
          <div
            className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-3xl border-2 border-rose-600/30 sm:-left-6 sm:-top-6"
            aria-hidden
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            title={
              <>
                Engineering the details that define{" "}
                <span className="text-rose-600">premium interiors</span>
              </>
            }
            description="Jun Auto Design Tech specialises in design development and post-processing of automotive interior materials. We work closely with our customers to turn design intent into consistent, production-ready components, combining technical know-how with careful craftsmanship."
          />

          <Reveal delay={120}>
            <p className="mt-6 text-base leading-relaxed text-charcoal-500">
              Our capabilities span the complete journey of an interior surface: developing the
              design, adding function and character through perforation, embossing and hot melt
              lamination, and finishing with precise cutting, all supported by disciplined
              quality control.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={200 + index * 100}
                className="rounded-2xl border border-charcoal-100 bg-charcoal-50 p-5 transition-colors duration-300 hover:border-rose-200 hover:bg-rose-50"
              >
                <span className="block h-1 w-8 rounded-full bg-rose-600" aria-hidden />
                <h3 className="mt-4 font-display text-base font-semibold text-charcoal-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                  {pillar.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
