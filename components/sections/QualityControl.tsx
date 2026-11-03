import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualitySteps } from "@/lib/site";

export function QualityControl() {
  return (
    <section id="quality" className="relative overflow-hidden bg-charcoal-50 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Quality Control"
              title={
                <>
                  Inspected at every stage, <span className="text-rose-600">trusted at delivery</span>
                </>
              }
              description="Our QC team checks materials and parts throughout production, not just at the end, so issues are caught early and every shipment meets agreed standards."
            />

            <Reveal delay={150} className="mt-10">
              <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
                <Image
                  src="/images/qc-inspection.jpg"
                  alt="Production team member presenting finished, inspected material panels"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/90 p-4 backdrop-blur">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                      <path
                        d="M9 12.5 11 14.5 15.5 10M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-charcoal-900">
                    Checked against approved samples and customer specifications
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <ol className="relative space-y-6 before:absolute before:bottom-8 before:left-[52px] before:top-8 before:w-px before:bg-rose-200 sm:before:left-[64px]">
            {qualitySteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 100}
                className="group relative flex gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-charcoal-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-charcoal-900/5 sm:p-8"
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 font-display text-lg font-semibold text-rose-600 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white sm:h-16 sm:w-16">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-charcoal-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
