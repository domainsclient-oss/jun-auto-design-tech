import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isoDetails, siteConfig } from "@/lib/site";

const commitments = [
  "Documented, repeatable processes",
  "Defined inspection and approval stages",
  "Record keeping and traceability",
  "Continuous improvement culture",
];

export function IsoCertification() {
  const certificateRows = [
    { label: "Standard", value: isoDetails.standard },
    { label: "Certificate No.", value: isoDetails.certificateNumber },
    { label: "Certifying Body", value: isoDetails.certifyingBody },
    { label: "Scope", value: isoDetails.scope },
    // Validity dates are only listed once they are filled in.
    ...(isoDetails.validFrom ? [{ label: "Valid From", value: isoDetails.validFrom }] : []),
    ...(isoDetails.validUntil ? [{ label: "Valid Until", value: isoDetails.validUntil }] : []),
  ];
  const certificateLink = isoDetails.certificatePdf ?? isoDetails.certificateImage;

  return (
    <section id="iso" className="relative isolate overflow-hidden bg-charcoal-950 py-24 sm:py-32">
      <Image
        src="/images/iso-quilted.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal-950 via-charcoal-950/90 to-rose-800/40"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="ISO Certification"
            title={
              <>
                Quality managed <span className="text-rose-500">by system</span>, not by chance
              </>
            }
            description="We follow a structured quality management approach so that every order is produced, checked and documented consistently. Certification details are listed here and copies are available on request."
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {commitments.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={index * 90}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white backdrop-blur"
              >
                <span className="h-2 w-2 shrink-0 rotate-45 bg-rose-500" aria-hidden />
                {item}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={150}>
          <div className="relative rounded-3xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/40 sm:p-10">
            <div className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-rose-600 sm:inset-x-10" />
            {isoDetails.badgeImage && (
              <div className="mb-8 flex items-center justify-center rounded-2xl border border-charcoal-100 bg-gradient-to-b from-charcoal-50 to-white px-6 py-8">
                <Image
                  src={isoDetails.badgeImage}
                  alt="ISO"
                  width={539}
                  height={446}
                  sizes="160px"
                  className="h-24 w-auto sm:h-28"
                />
              </div>
            )}
            <div className="flex items-center gap-4">
              {!isoDetails.badgeImage && <SealIcon />}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
                  Certificate
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-charcoal-900">
                  {isoDetails.standard && !isoDetails.isSample
                    ? `${isoDetails.standard} Certified`
                    : "Quality Management System"}
                </p>
              </div>
            </div>

            {isoDetails.certificateImage && (
              <a
                href={certificateLink ?? isoDetails.certificateImage}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 block overflow-hidden rounded-2xl border border-charcoal-100 bg-charcoal-50"
              >
                <div className="relative aspect-[1/1.414]">
                  <Image
                    src={isoDetails.certificateImage}
                    alt={`${siteConfig.name} ${isoDetails.standard ?? "ISO"} certificate`}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <span className="absolute inset-x-3 bottom-3 rounded-xl bg-charcoal-950/80 py-2.5 text-center text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  View full certificate
                </span>
              </a>
            )}

            <dl className="mt-8 divide-y divide-charcoal-100 border-y border-charcoal-100">
              {certificateRows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="shrink-0 whitespace-nowrap text-sm text-charcoal-500">{row.label}</dt>
                  <dd
                    className={`text-right text-sm font-semibold ${
                      row.value ? "text-charcoal-900" : "text-charcoal-300"
                    }`}
                  >
                    {row.value ?? "Available on request"}
                  </dd>
                </div>
              ))}
            </dl>

            {certificateLink ? (
              <a
                href={certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700"
              >
                {isoDetails.certificatePdf ? "Download certificate (PDF)" : "View full certificate"}
                <span aria-hidden>→</span>
              </a>
            ) : (
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700"
              >
                Request certificate copy
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function SealIcon() {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
        <path
          d="M12 2.5 14.2 4l2.6-.2.9 2.5 2.2 1.4-.6 2.6 1 2.4-1.9 1.8-.3 2.6-2.6.6L14 19.5l-2-.9-2 .9-1.5-2.2-2.6-.6-.3-2.6L3.7 12.3l1-2.4-.6-2.6 2.2-1.4.9-2.5 2.6.2L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="m8.8 11.6 2.2 2.2 4.2-4.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
