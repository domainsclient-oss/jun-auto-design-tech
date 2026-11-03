import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { contactDetails, navLinks, processes, services, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-charcoal-950 text-charcoal-300">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-16">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Design development and post-processing for automotive interior materials, delivered
            with precision and consistent quality.
          </p>
          <address className="mt-8 space-y-4 not-italic">
            {contactDetails.address && (
              <FooterContact icon="Address">
                {contactDetails.address.replace(/\n/g, " ")}
              </FooterContact>
            )}
            {contactDetails.phone && (
              <FooterContact
                icon="Phone"
                href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
              >
                {contactDetails.phone}
              </FooterContact>
            )}
            {contactDetails.email && (
              <FooterContact icon="Email" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </FooterContact>
            )}
          </address>
        </div>

        <FooterColumn title="Company" links={navLinks.map((l) => ({ label: l.label, href: l.href }))} />
        <FooterColumn
          title="Services"
          links={services.map((s) => ({ label: s.title, href: "#services" }))}
        />
        <FooterColumn
          title="Processes"
          links={processes.map((p) => ({ label: p.title, href: `#${p.id}` }))}
        />
      </Container>

      <div className="border-t border-white/5">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <p>
            © {siteConfig.legalName}. All rights reserved.
          </p>
          <a href="#top" className="font-semibold text-white transition-colors hover:text-rose-200">
            Back to top ↑
          </a>
        </Container>
      </div>
    </footer>
  );
}

type FooterContactProps = {
  icon: ContactIconType;
  href?: string;
  children: ReactNode;
};

function FooterContact({ icon, href, children }: FooterContactProps) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-600/15 text-rose-200 ring-1 ring-inset ring-rose-500/30 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:ring-rose-600">
        <ContactIcon type={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 pt-2 text-sm leading-relaxed">{children}</span>
    </>
  );

  return href ? (
    <a
      href={href}
      className="group flex items-start gap-3 text-white transition-colors hover:text-rose-200"
    >
      {content}
    </a>
  ) : (
    <div className="group flex max-w-xs items-start gap-3">{content}</div>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-sm transition-colors hover:text-rose-200">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
