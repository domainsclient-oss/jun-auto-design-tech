import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { contactDetails, navLinks, processes, siteConfig, socialLinks, type SocialName } from "@/lib/site";

/**
 * Corporate footer on charcoal: link columns (company, processes, contact), then a slim
 * bar with the legal line and back to top.
 */
export function Footer() {
  const phoneHref = contactDetails.phone ? `tel:${contactDetails.phone.replace(/\s+/g, "")}` : null;
  const emailHref = contactDetails.email ? `mailto:${contactDetails.email}` : null;

  return (
    <footer className="bg-charcoal-900 text-white">
      <Container>
        {/* Link columns */}
        {/* Four columns sized to their content, with one even gap between each. */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.75fr_0.85fr_1.25fr] lg:gap-14 xl:gap-16 lg:py-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-body text-white/70 lg:max-w-none">
              Design development and <span className="whitespace-nowrap">post-processing</span> of
              automotive interior materials, from first pattern to final cut.
            </p>
            <ul className="mt-8 flex gap-3" aria-label="Social media">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-rose-600"
                  >
                    <SocialIcon name={social.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Company">
            {navLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Processes">
            {processes.map((process) => (
              <FooterLink key={process.id} href={`#${process.id}`}>
                {process.title.replace(" Process", "")}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="sm:col-span-2 lg:col-span-1">
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
      <div className="bg-charcoal-950">
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

/** Brand marks drawn inline; lucide no longer ships brand icons. */
function SocialIcon({ name }: { name: SocialName }) {
  const common = { viewBox: "0 0 24 24", className: "h-[18px] w-[18px]", "aria-hidden": true } as const;
  switch (name) {
    case "LinkedIn":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4V9.75Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M13.5 21v-7.5h2.52l.38-2.93H13.5V8.7c0-.85.24-1.42 1.45-1.42h1.55V4.66A20.6 20.6 0 0 0 14.24 4.5c-2.24 0-3.77 1.37-3.77 3.88v2.19H7.94v2.93h2.53V21h3.03Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      );
  }
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
