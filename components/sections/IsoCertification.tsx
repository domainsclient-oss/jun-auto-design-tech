import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isoDetails, siteConfig } from "@/lib/site";

const commitments = [
  "Documented, repeatable processes",
  "Defined inspection and approval stages",
  "Record keeping and traceability",
  "Continuous improvement",
];

const tableRowClass = "border-b border-charcoal-100 last:border-b-0"; // taste-skill-ignore: a real table keeps its row lines

export function IsoCertification() {
  const certificateRows = [
    { label: "Standard", value: isoDetails.standard },
    { label: "Certificate no.", value: isoDetails.certificateNumber },
    { label: "Certifying body", value: isoDetails.certifyingBody },
    { label: "Scope", value: isoDetails.scope },
    // Validity dates are only listed once they are filled in.
    ...(isoDetails.validFrom ? [{ label: "Valid from", value: isoDetails.validFrom }] : []),
    ...(isoDetails.validUntil ? [{ label: "Valid until", value: isoDetails.validUntil }] : []),
  ];
  const certificateLink = isoDetails.certificatePdf ?? isoDetails.certificateImage;
  const cardTitle =
    isoDetails.standard && !isoDetails.isSample
      ? `${isoDetails.standard} Certified`
      : "Quality system";

  return (
    <section id="iso" className="bg-surface py-24 lg:py-28">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <SectionHeading
            title="Quality on record"
            description="We follow a structured quality management approach so that every order is produced, checked and documented consistently. Copies of our certification are available on request."
          />
          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {commitments.map((item, index) => (
              <Reveal as="li" key={item} delay={120 + index * 70} className="flex gap-4 text-body font-medium text-charcoal-900">
                <span className="mt-[0.6em] h-2 w-2 shrink-0 bg-rose-600" aria-hidden />
                {item}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={150} className="bg-white p-8 sm:p-12 lg:col-span-5 lg:col-start-8">
          <div className="flex items-center justify-between gap-6">
            <h3 className="font-display text-sub font-bold uppercase text-charcoal-900">
              {cardTitle}
            </h3>
            {isoDetails.badgeImage && (
              <Image
                src={isoDetails.badgeImage}
                alt="ISO"
                width={539}
                height={446}
                sizes="96px"
                className="h-16 w-auto shrink-0 sm:h-20"
              />
            )}
          </div>

          {isoDetails.certificateImage && (
            <a
              href={certificateLink ?? isoDetails.certificateImage}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 block aspect-[1/1.414] bg-surface"
            >
              <Image
                src={isoDetails.certificateImage}
                alt={`${siteConfig.name} ${isoDetails.standard ?? "ISO"} certificate`}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-contain p-3"
              />
            </a>
          )}

          <table className="mt-8 w-full text-left text-body">
            <caption className="sr-only">Certification details</caption>
            <tbody>
              {certificateRows.map((row) => (
                <tr key={row.label} className={tableRowClass}>
                  <th scope="row" className="whitespace-nowrap py-4 pr-6 align-top font-normal text-charcoal-500">
                    {row.label}
                  </th>
                  <td className="py-4 text-right font-semibold text-charcoal-900">
                    {row.value ?? "Available on request"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <a
            href={certificateLink ?? "#contact"}
            {...(certificateLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-8 inline-flex items-center bg-charcoal-900 px-7 py-4 text-body font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-rose-700 active:scale-[0.97]"
          >
            {certificateLink
              ? isoDetails.certificatePdf
                ? "Download certificate (PDF)"
                : "View full certificate"
              : "Request a certificate copy"}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
