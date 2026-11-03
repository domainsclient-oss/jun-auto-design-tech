import Image from "next/image";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { contactDetails, navLinks, processes, siteConfig } from "@/lib/site";

/**
 * Corporate footer on charcoal: an enquiry card with the closing photograph, link columns
 * (company, processes, contact), then a slim bar with the legal line and back to top.
 */
export function Footer() {
  const phoneHref = contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null;
  const emailHref = contactDetails.email ? `mailto:${contactDetails.email}` : null;

  return (
    <footer className="bg-charcoal-950 text-white">
      <Container className="pt-20 lg:pt-24">
        {/* Enquiry card */}
        <div className="grid overflow-hidden bg-charcoal-900 md:grid-cols-12">
          <div className="group relative min-h-56 overflow-hidden md:col-span-5">
            <Image
              src="/images/iso-quilted.jpg"
              alt="Close crop of a quilted black leather seat"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10 md:col-span-7 lg:p-14">
            <span className="block h-0.5 w-10 bg-rose-600" aria-hidden />
            <h2 className="mt-6 font-display text-sub font-bold uppercase leading-tight">
              Have a seat or trim program in mind?
            </h2>
            <p className="mt-4 max-w-lg text-body text-white/75">
              Share your drawings, materials and volumes. We will come back with the next steps.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button asChild size="cta">
                <a href="#contact">Send an enquiry</a>
              </Button>
              {emailHref && (
                <a
                  href={emailHref}
                  className="text-body font-semibold text-white underline-offset-4 transition-colors hover:text-rose-400 hover:underline"
                >
                  {contactDetails.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-body text-white/70">
              Design development and post-processing of automotive interior materials, from first
              pattern to final cut.
            </p>
          </div>

          <FooterColumn title="Company" className="lg:col-span-2 lg:col-start-6">
            {navLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Processes" className="lg:col-span-2">
            {processes.map((process) => (
              <FooterLink key={process.id} href={`#${process.id}`}>
                {process.title.replace(" Process", "")}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="sm:col-span-2 lg:col-span-3 lg:col-start-10">
            {emailHref && (
              <ContactLine icon="email" href={emailHref}>
                {contactDetails.email}
              </ContactLine>
            )}
            {phoneHref && (
              <ContactLine icon="phone" href={phoneHref}>
                {contactDetails.phone}
              </ContactLine>
            )}
            {contactDetails.address && (
              <ContactLine icon="address">{contactDetails.address.replace(/\n/g, " ")}</ContactLine>
            )}
          </FooterColumn>
        </div>
      </Container>

      {/* Legal bar */}
      <div className="bg-charcoal-900">
        <Container className="flex items-center justify-between gap-6 py-5 text-small text-white/70">
          <p>© {siteConfig.legalName}. All rights reserved.</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-11 w-11 shrink-0 items-center justify-center bg-rose-600 text-white transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-rose-700 active:scale-[0.95]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M12 19V5m0 0-6 6m6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h3 className="text-small font-semibold uppercase tracking-wide text-white">{title}</h3>
      <span className="mt-3 block h-0.5 w-6 bg-rose-600" aria-hidden />
      <ul className="mt-6 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="inline-block text-body text-white/70 transition-[color,translate] duration-200 hover:translate-x-1 hover:text-white"
      >
        {children}
      </a>
    </li>
  );
}

type ContactLineProps = {
  icon: ContactIconType;
  href?: string;
  children: ReactNode;
};

/** A contact detail with a small red icon; links brighten on hover. */
function ContactLine({ icon, href, children }: ContactLineProps) {
  const content = (
    <>
      <ContactIcon type={icon} className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      <span className="min-w-0 break-words">{children}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="flex items-start gap-3 text-body text-white/70 transition-colors hover:text-white">
          {content}
        </a>
      ) : (
        <address className="flex items-start gap-3 text-body not-italic text-white/70">{content}</address>
      )}
    </li>
  );
}
