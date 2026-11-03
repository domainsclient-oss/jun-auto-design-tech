import { ContactIcon } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactDetails, siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const details = [
    {
      label: "Phone" as const,
      value: contactDetails.phone,
      href: contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null,
    },
    {
      label: "Email" as const,
      value: contactDetails.email,
      href: contactDetails.email ? `mailto:${contactDetails.email}` : null,
    },
    { label: "Working Hours" as const, value: contactDetails.hours, href: null },
  ].filter((item) => item.value);

  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal-950 py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-rose-600/20 blur-3xl"
        aria-hidden
      />

      <Container className="relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Contact Us"
            title={
              <>
                Let&apos;s build your <span className="text-rose-500">next interior</span>
              </>
            }
            description="Share your requirement, whether design development, post-processing or a complete program, and our team will respond with the next steps."
          />

          <Reveal delay={150} className="mt-10 space-y-4">
            {contactDetails.address && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600/15 text-rose-200 ring-1 ring-inset ring-rose-500/30">
                    <ContactIcon type="Address" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
                      Address
                    </p>
                    <address className="mt-3 not-italic">
                      <span className="block font-display text-base font-semibold text-white">
                        {siteConfig.legalName}
                      </span>
                      <span className="mt-2 block whitespace-pre-line text-sm leading-relaxed text-white/70">
                        {contactDetails.address}
                      </span>
                    </address>
                  </div>
                </div>
              </div>
            )}

            {details.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {details.map((item) => {
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600/15 text-rose-200 ring-1 ring-inset ring-rose-500/30 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:ring-rose-600">
                        <ContactIcon type={item.label} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
                          {item.label}
                        </span>
                        <span className="mt-1.5 block break-words text-base font-semibold text-white">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );
                  const cardClass =
                    "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur transition-colors duration-300";

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`${cardClass} hover:border-rose-500/40 hover:bg-white/10`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className={cardClass}>
                      {content}
                    </div>
                  );
                })}
              </div>
            ) : !contactDetails.address ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
                  How to reach us
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-300">
                  Use the enquiry form to tell us about your requirement. Include your company,
                  materials and expected volumes so we can respond with the right information.
                </p>
              </div>
            ) : null}
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="rounded-3xl bg-white p-7 shadow-2xl shadow-black/40 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-charcoal-900">
              Enquiry Form
            </h3>
            <p className="mt-2 text-sm text-charcoal-500">
              Fields marked <span className="text-rose-600">*</span> are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
