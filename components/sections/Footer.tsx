import Image from "next/image";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ContactIcon, type ContactIconType } from "@/components/ui/ContactIcon";
import { contactDetails, navLinks, siteConfig } from "@/lib/site";

/** Photograph half, menu half: a close crop of the work beside the menu set large. */
export function Footer() {
  return (
    <footer className="grid bg-rose-600 text-charcoal-950 lg:min-h-svh lg:grid-cols-2">
      <div className="relative h-[50svh] overflow-hidden lg:h-auto">
        <Image
          src="/images/iso-quilted.jpg"
          alt="Close crop of a quilted black leather seat"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-drift object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-16 px-4 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div>
          <Logo tone="dark" tile="dark" />
          <nav aria-label="Footer" className="mt-14">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block font-display text-sub font-bold uppercase leading-[0.95] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-3"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <address className="flex flex-col gap-5 text-body not-italic">
          {contactDetails.address && (
            <FooterContact icon="address">
              <span className="block font-semibold">{siteConfig.legalName}</span>
              <span className="mt-1 block">{contactDetails.address.replace(/\n/g, " ")}</span>
            </FooterContact>
          )}
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
            {contactDetails.phone && (
              <FooterContact icon="phone" href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}>
                {contactDetails.phone}
              </FooterContact>
            )}
            {contactDetails.email && (
              <FooterContact icon="email" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </FooterContact>
            )}
          </div>
        </address>

        <div className="flex items-center justify-between gap-6 text-small">
          <p>© {siteConfig.legalName}. All rights reserved.</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-12 w-12 shrink-0 items-center justify-center bg-charcoal-950 text-white transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-charcoal-800 active:scale-[0.95]"
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
        </div>
      </div>
    </footer>
  );
}

type FooterContactProps = {
  icon: ContactIconType;
  href?: string;
  children: ReactNode;
};

/** A contact line with its icon in a charcoal tile, readable on the red field. */
function FooterContact({ icon, href, children }: FooterContactProps) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-charcoal-950 text-white transition-colors duration-200 group-hover:bg-white group-hover:text-charcoal-950">
        <ContactIcon type={icon} />
      </span>
      <span className="min-w-0 pt-2 font-semibold">{children}</span>
    </>
  );

  return href ? (
    <a href={href} className="group flex items-start gap-4 underline-offset-4 hover:underline">
      {content}
    </a>
  ) : (
    <div className="flex items-start gap-4">{content}</div>
  );
}
