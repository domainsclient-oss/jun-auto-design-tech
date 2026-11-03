import type { ReactNode } from "react";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactDetails, siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/** One contact section: the details on the left of a dark field, the enquiry form on the right. */
export function Contact() {
  const phoneHref = contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null;
  const emailHref = contactDetails.email ? `mailto:${contactDetails.email}` : null;

  return (
    <section id="contact" className="bg-charcoal-900 text-white">
      <Container className="grid gap-14 py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal as="h2" className="font-display text-head font-bold uppercase">
            Talk to our team
          </Reveal>
          <Reveal as="p" delay={80} className="mt-6 max-w-md text-lead text-white">
            Send us your drawings, materials and volumes, and we will come back with the next
            steps for your interior program.
          </Reveal>

          <ul className="mt-12 flex flex-col gap-2">
            {contactDetails.email && emailHref && (
              <ContactRow icon="email" label="Email" href={emailHref} delay={120}>
                {contactDetails.email}
              </ContactRow>
            )}
            {contactDetails.phone && phoneHref && (
              <ContactRow icon="phone" label="Phone" href={phoneHref} delay={180}>
                {contactDetails.phone}
              </ContactRow>
            )}
            {contactDetails.address && (
              <ContactRow icon="address" label="Address" delay={240}>
                <span className="block">{siteConfig.legalName}</span>
                <span className="mt-1 block font-normal text-white/80">
                  {contactDetails.address.replace(/\n/g, " ")}
                </span>
              </ContactRow>
            )}
          </ul>
        </div>

        <Reveal delay={120} className="bg-white p-6 text-charcoal-900 sm:p-10 lg:col-span-7">
          <h3 className="font-display text-sub font-bold uppercase">Send an enquiry</h3>
          <p className="mt-3 text-body text-charcoal-700">
            Tell us about the project and we will reply by email. Fields marked
            <span className="text-rose-700"> *</span> are required.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type ContactRowProps = {
  icon: ContactIconType;
  label: string;
  href?: string;
  delay: number;
  children: ReactNode;
};

/** One contact detail on a raised charcoal panel: round icon, small label, the detail itself. */
function ContactRow({ icon, label, href, delay, children }: ContactRowProps) {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal-950 text-rose-400 transition-colors duration-200 group-hover:bg-rose-700 group-hover:text-white">
        <ContactIcon type={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-small text-white/70">{label}</span>
        <span className="mt-0.5 block break-words text-body font-semibold">{children}</span>
      </span>
      {href && (
        <span
          className="hidden self-center text-lead text-white/70 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-white sm:block"
          aria-hidden
        >
          →
        </span>
      )}
    </>
  );
  const rowClass = "group flex items-start gap-4 bg-charcoal-800 px-5 py-4 sm:items-center";

  return (
    <Reveal as="li" delay={delay}>
      {href ? (
        <a href={href} className={`${rowClass} transition-colors duration-200 hover:bg-charcoal-700`}>
          {inner}
        </a>
      ) : (
        <address className={`${rowClass} not-italic`}>{inner}</address>
      )}
    </Reveal>
  );
}
