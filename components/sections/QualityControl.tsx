import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QualityList } from "./QualityList";

export function QualityControl() {
  return (
    <section id="quality" className="bg-ground py-24 lg:py-28">
      <Container>
        <QualityList
          heading={
            <SectionHeading
              title="Checked at every stage"
              description="Our QC team checks materials and parts throughout production, not just at the end, so issues are caught early and every shipment meets agreed standards."
            />
          }
        />
      </Container>
    </section>
  );
}
