import { ClipboardCheck, FileText, ScanBarcode, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isoDetails, siteConfig } from "@/lib/site";

const commitments = [
  { title: "Documented, repeatable processes", text: "Every process runs to a written method.", Icon: FileText },
  { title: "Defined inspection and approval stages", text: "Work moves on only once it is checked.", Icon: ClipboardCheck },
  { title: "Record keeping and traceability", text: "Each batch can be traced and reviewed.", Icon: ScanBarcode },
  { title: "Continuous improvement", text: "Findings feed back into how we work.", Icon: TrendingUp },
];

const tableRowClass = "border-b border-charcoal-100 transition-colors duration-200 last:border-b-0 hover:bg-surface"; // taste-skill-ignore: a real table keeps its row lines

/**
 * Quality on record: the commitments, each with its own icon, rising in turn beside the
 * certificate set as a document card on an offset brand-red plate.
 */
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
    <section id="iso" className="overflow-hidden bg-surface py-24 lg:py-32">
      <Container className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <SectionHeading
            title="Quality on record"
            description="We follow a structured quality management approach so that every order is produced, checked and documented consistently. Copies of our certification are available on request."
          />

          <ul className="mt-12 flex flex-col gap-6">
            {commitments.map((item, index) => (
              <Reveal as="li" key={item.title} delay={120 + index * 110} className="group flex items-start gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-rose-600 transition-colors duration-300 group-hover:bg-rose-600 group-hover:text-white">
                  <item.Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} aria-hidden />
                </span>
                <span className="pt-1">
                  <span className="block text-body font-semibold text-charcoal-900">{item.title}</span>
                  <span className="mt-1 block text-small text-charcoal-700">{item.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={150} className="relative lg:col-span-5 lg:col-start-8">
          {/* Offset brand plate behind the card; the card lifts off it on hover. */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-rose-600 sm:translate-x-4 sm:translate-y-4" aria-hidden />
          <div className="relative bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-1.5 hover:-translate-y-1.5 sm:p-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-sub font-semibold uppercase text-charcoal-900">
                  {cardTitle}
                </h3>
              </div>
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
                    <th scope="row" className="block whitespace-nowrap pt-4 text-small font-normal text-charcoal-500 sm:table-cell sm:py-4 sm:pr-6 sm:align-top sm:text-body">
                      {row.label}
                    </th>
                    <td className="block pb-4 pt-1 font-semibold text-charcoal-900 sm:table-cell sm:py-4 sm:text-right">
                      {row.value ?? "Available on request"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button asChild variant="dark" size="cta" className="mt-8 w-full sm:w-auto">
              <a
                href={certificateLink ?? "#contact"}
                {...(certificateLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {certificateLink
                  ? isoDetails.certificatePdf
                    ? "Download certificate (PDF)"
                    : "View full certificate"
                  : "Request a certificate copy"}
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
