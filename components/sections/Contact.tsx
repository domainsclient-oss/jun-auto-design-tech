import type { ReactNode } from "react";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { WordsReveal } from "@/components/ui/WordsReveal";
import { contactDetails, siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/**
 * Contact as one card on a light ground: a charcoal information panel on the left and the
 * enquiry form on white on the right, under a short centred header.
 */
export function Contact() {
  const phoneHref = contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null;
  const emailHref = contactDetails.email ? `mailto:${contactDetails.email}` : null;

  return (
    <section id="contact" className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <WordsReveal
            as="h2"
            text="Talk to our team"
            className="font-display text-head font-bold uppercase text-charcoal-900"
          />
          <p className="mt-5 text-lead text-charcoal-700">
            Send us your drawings, materials and volumes, and we will come back with the next steps.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[1.75rem] bg-white lg:mt-16 lg:grid-cols-12">
          {/* Contact information panel */}
          <div className="relative isolate overflow-hidden bg-charcoal-900 p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
            <span
              className="absolute -bottom-24 -right-24 -z-10 h-64 w-64 rounded-full bg-charcoal-800"
              aria-hidden
            />
            <span
              className="absolute -bottom-10 right-16 -z-10 h-32 w-32 rounded-full bg-rose-600/90"
              aria-hidden
            />

            <h3 className="font-display text-sub font-semibold uppercase">Contact information</h3>
            <p className="mt-3 max-w-sm text-body text-white/75">
              Write, call or visit us at SIPCOT Industrial Park, Sriperumbudur.
            </p>

            <ul className="mt-10 flex flex-col gap-2 pb-24 lg:pb-32">
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
                  <span className="block font-semibold">{siteConfig.legalName}</span>
                  <span className="mt-1 block font-normal text-white/75">
                    {contactDetails.address.replace(/\n/g, " ")}
                  </span>
                </Detail>
              )}
            </ul>
          </div>

          {/* Enquiry form */}
          <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
            <h3 className="font-display text-sub font-semibold uppercase text-charcoal-900">Send an enquiry</h3>
            <p className="mt-3 text-body text-charcoal-700">
              Fields marked <span className="text-rose-700">*</span> are required.
            </p>
            <div className="mt-8">
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

/** One contact detail: a round red icon, a small label and the detail; links highlight on hover. */
function Detail({ icon, label, href, children }: DetailProps) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white transition-transform duration-300 group-hover:scale-110">
        <ContactIcon type={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-small text-white/60">{label}</span>
        <span className="mt-0.5 block break-words text-body font-semibold">{children}</span>
      </span>
    </>
  );
  const rowClass = "group -mx-3 flex items-start gap-4 rounded-[1rem] p-3 transition-colors duration-300";

  return (
    <li>
      {href ? (
        <a href={href} className={`${rowClass} hover:bg-charcoal-800`}>
          {inner}
        </a>
      ) : (
        <address className={`${rowClass} not-italic`}>{inner}</address>
      )}
    </li>
  );
}
