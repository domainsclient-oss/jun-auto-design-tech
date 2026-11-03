import type { ReactNode } from "react";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { WordsReveal } from "@/components/ui/WordsReveal";
import { contactDetails, siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/**
 * Contact on a charcoal field: a full-width header, then the details on the left (held in
 * place on desktop) beside the enquiry form on a panel one tone lighter.
 */
export function Contact() {
  const phoneHref = contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null;
  const emailHref = contactDetails.email ? `mailto:${contactDetails.email}` : null;

  return (
    <section id="contact" className="bg-charcoal-950 text-white">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <WordsReveal
            as="h2"
            text="Talk to our team"
            className="font-display text-head font-bold uppercase lg:col-span-6"
          />
          <p className="max-w-xl text-lead text-white/85 lg:col-span-5 lg:col-start-8">
            Send us your drawings, materials and volumes, and we will come back with the next
            steps for your interior program.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <ul className="flex flex-col gap-3 lg:sticky lg:top-32">
              {contactDetails.email && emailHref && (
                <Detail icon="email" label="Email" href={emailHref}>
                  {contactDetails.email}
                </Detail>
              )}
              {contactDetails.phone && phoneHref && (
                <Detail icon="phone" label="Phone" href={phoneHref}>
                  {contactDetails.phone}
                </Detail>
              )}
              {contactDetails.address && (
                <Detail icon="address" label="Address">
                  <span className="block text-body font-semibold">{siteConfig.legalName}</span>
                  <span className="mt-2 block text-body font-normal text-white/80">
                    {contactDetails.address.replace(/\n/g, " ")}
                  </span>
                </Detail>
              )}
            </ul>
          </div>

          <div className="bg-charcoal-800 p-6 sm:p-10 lg:col-span-7 lg:p-12">
            <span className="block h-0.5 w-10 bg-rose-600" aria-hidden />
            <h3 className="mt-5 font-display text-sub font-bold uppercase">Send an enquiry</h3>
            <p className="mt-3 text-body text-white/80">
              Tell us about the project and we will reply by email. Fields marked
              <span className="text-rose-400"> *</span> are required.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

type DetailProps = {
  icon: ContactIconType;
  label: string;
  href?: string;
  children: ReactNode;
};

/** One contact detail: a round icon badge, a small label and the detail; links slide an arrow in on hover. */
function Detail({ icon, label, href, children }: DetailProps) {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal-800 text-rose-600 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white">
        <ContactIcon type={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block text-small text-white/70">{label}</span>
        <span className="mt-1 block break-words text-lead font-semibold">{children}</span>
      </span>
      {href && (
        <span
          className="hidden self-center text-lead text-rose-500 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block"
          aria-hidden
        >
          →
        </span>
      )}
    </>
  );
  const rowClass = "group flex items-start gap-5 p-4 -mx-4 transition-colors duration-300";

  return (
    <li>
      {href ? (
        <a href={href} className={`${rowClass} hover:bg-charcoal-900`}>
          {inner}
        </a>
      ) : (
        <address className={`${rowClass} not-italic`}>{inner}</address>
      )}
    </li>
  );
}
