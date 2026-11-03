import type { ReactNode } from "react";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { contactDetails, siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/**
 * One contact section on a charcoal field: the details as an open list on the left
 * (held in place on desktop), the enquiry form on a panel one tone lighter on the right.
 */
export function Contact() {
  const phoneHref = contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null;
  const emailHref = contactDetails.email ? `mailto:${contactDetails.email}` : null;

  return (
    <section id="contact" className="bg-charcoal-950 text-white">
      <Container className="grid gap-16 py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display text-head font-bold uppercase">Talk to our team</h2>
            <p className="mt-6 max-w-md text-lead text-white">
              Send us your drawings, materials and volumes, and we will come back with the next
              steps for your interior program.
            </p>

            <div className="mt-14 flex flex-col gap-10">
              {contactDetails.email && emailHref && (
                <Detail icon="email" label="Email">
                  <a href={emailHref} className="underline-offset-4 transition-colors hover:text-rose-400 hover:underline">
                    {contactDetails.email}
                  </a>
                </Detail>
              )}
              {contactDetails.phone && phoneHref && (
                <Detail icon="phone" label="Phone">
                  <a href={phoneHref} className="underline-offset-4 transition-colors hover:text-rose-400 hover:underline">
                    {contactDetails.phone}
                  </a>
                </Detail>
              )}
              {contactDetails.address && (
                <Detail icon="address" label="Address">
                  <address className="not-italic">
                    <span className="block text-body">{siteConfig.legalName}</span>
                    <span className="mt-2 block text-body font-normal text-white/80">
                      {contactDetails.address.replace(/\n/g, " ")}
                    </span>
                  </address>
                </Detail>
              )}
            </div>
          </div>
        </div>

        <div className="bg-charcoal-800 p-6 sm:p-10 lg:col-span-6 lg:col-start-7 lg:p-12">
          <h3 className="font-display text-sub font-bold uppercase">Send an enquiry</h3>
          <p className="mt-3 text-body text-white/80">
            Tell us about the project and we will reply by email. Fields marked
            <span className="text-rose-400"> *</span> are required.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

type DetailProps = {
  icon: ContactIconType;
  label: string;
  children: ReactNode;
};

/** One contact detail: a red icon beside a small label and the detail set large. */
function Detail({ icon, label, children }: DetailProps) {
  return (
    <div className="flex gap-5">
      <ContactIcon type={icon} className="mt-1 h-6 w-6 shrink-0 text-rose-400" />
      <div className="min-w-0">
        <p className="text-small text-white/70">{label}</p>
        <div className="mt-1 break-words text-lead font-semibold">{children}</div>
      </div>
    </div>
  );
}
