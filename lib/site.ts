/**
 * Central content for the one-page site.
 *
 * Only verified company information goes here. Empty (null) fields are
 * hidden or shown as "Available on request" in the UI.
 */

export const siteConfig = {
  name: "Jun Auto Design Tech",
  legalName: "Jun Auto Design Tech India Private Limited",
  shortName: "JADT",
  tagline: "Automotive Interior Design & Post Processing",
} as const;

/** Toggle optional sections. Set `about` to true to show the About section and its menu link. */
export const sectionVisibility: { about: boolean } = {
  about: false,
};

const allNavLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "ISO", href: "#iso" },
  { label: "Processes", href: "#processes" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
] as const;

export const navLinks = allNavLinks.filter(
  (link) => link.href !== "#about" || sectionVisibility.about,
);

export type ContactDetails = {
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
};

export const contactDetails: ContactDetails = {
  address:
    "No G133, SF No. 149/1, SIPCOT Industrial Park,\nVallam, Sriperumbadur, Kunnam,\nKancheepuram, Tamil Nadu - 631 604.",
  // TODO: placeholder number, replace with the real phone number before launch.
  phone: "1234567890",
  email: "contact@jundesigntech.in",
  hours: null,
};

export type IsoDetails = {
  /** e.g. "ISO 9001:2015", exactly as printed on the certificate. */
  standard: string | null;
  certificateNumber: string | null;
  certifyingBody: string | null;
  scope: string | null;
  validFrom: string | null;
  validUntil: string | null;
  /** Badge/emblem shown at the top of the certificate card. */
  badgeImage: string | null;
  /** Certificate scan in /public, e.g. "/certificates/iso-certificate.jpg". */
  certificateImage: string | null;
  /** Optional PDF of the certificate in /public, e.g. "/certificates/iso-certificate.pdf". */
  certificatePdf: string | null;
  /**
   * True while the fields below are placeholder data for development.
   * While true, the card heading avoids claiming "<standard> Certified".
   * Set to false only after replacing every field with the real certificate details.
   */
  isSample: boolean;
};

// SAMPLE DATA for development only. These are NOT the company's actual certification details.
export const isoDetails: IsoDetails = {
  isSample: true,
  standard: "ISO 9001:2015",
  certificateNumber: "ISO-SAMPLE-2026",
  certifyingBody: "Sample Certification Body",
  scope: "Automotive Interior Material Processing",
  validFrom: null,
  validUntil: null,
  badgeImage: "/certificates/ISO.png",
  certificateImage: null,
  certificatePdf: null,
};

export const services = [
  {
    id: "design-tech",
    title: "Design Tech",
    summary:
      "From concept to production-ready data. We translate interior design intent into precise, manufacturable patterns and specifications.",
    points: [
      "Interior trim & surface design development",
      "Pattern engineering and digital templates",
      "Material and texture selection support",
      "Prototype sampling and design validation",
    ],
    image: "/images/service-design.jpg",
    imageAlt: "Engineer reviewing 3D CAD models on a workstation",
  },
  {
    id: "post-processing",
    title: "Post Processing",
    summary:
      "Specialised finishing operations that add function, comfort and premium character to automotive interior materials.",
    points: [
      "Perforation for breathability and style",
      "Embossing for texture and brand identity",
      "Hot melt lamination of multi-layer materials",
      "Precision cutting to exact specifications",
    ],
    image: "/images/service-post.jpg",
    imageAlt: "Leather being guided through an industrial stitching machine",
  },
] as const;

export const processes = [
  {
    id: "design-development",
    verb: "Design",
    title: "Design Development",
    shortTitle: "Design",
    caption: "Patterns & specifications",
    description:
      "Every project begins with careful study of the customer's design intent. Our team develops patterns, layouts and technical specifications that balance aesthetics, function and manufacturability.",
    highlights: ["Requirement study", "Pattern development", "Sample approval"],
    image: "/images/process-design.jpg",
    imageAlt: "Engineer working on technical drawings at a desk",
  },
  {
    id: "perforation",
    verb: "Perforate",
    title: "Perforation Process",
    shortTitle: "Perforation",
    caption: "Breathable hole patterns",
    description:
      "Controlled perforation creates uniform hole patterns in leather, synthetic leather and fabrics, improving breathability for seat surfaces while adding a refined, premium look.",
    highlights: ["Uniform hole patterns", "Breathable surfaces", "Custom layouts"],
    image: "/images/process-perforation.jpg",
    imageAlt: "Close-up of a perforated leather car seat with contrast stitching",
  },
  {
    id: "embossing",
    verb: "Emboss",
    title: "Embossing Process",
    shortTitle: "Embossing",
    caption: "Textures, patterns & logos",
    description:
      "Using heat and pressure, embossing imprints textures, patterns and logos into interior materials, delivering distinctive surface character with consistent depth and definition.",
    highlights: ["Texture & pattern imprinting", "Logo embossing", "Consistent depth"],
    image: "/images/process-embossing.jpg",
    imageAlt: "Car seat with an embossed geometric pattern on tan leather",
  },
  {
    id: "hot-melt-lamination",
    verb: "Laminate",
    title: "Hot Melt Lamination",
    shortTitle: "Lamination",
    caption: "Multi-layer bonding",
    description:
      "Hot melt adhesive lamination bonds face materials with foam, scrim or backing layers, creating durable, multi-layer composites ready for trimming and assembly.",
    highlights: ["Multi-layer bonding", "Solvent-free adhesive", "Strong, even adhesion"],
    image: "/images/process-lamination.jpg",
    imageAlt: "Industrial textile machinery running on a production floor",
  },
  {
    id: "cutting",
    verb: "Cut",
    title: "Cutting Process",
    shortTitle: "Cutting",
    caption: "Precision to pattern",
    description:
      "Processed materials are cut to precise shapes and dimensions according to approved patterns, ensuring accurate fit and minimal waste for downstream assembly.",
    highlights: ["Pattern-accurate cutting", "Optimised nesting", "Clean, precise edges"],
    image: "/images/process-cutting-table.jpg",
    imageAlt: "Cutter cutting dark material along a marked pattern on a cutting table",
  },
] as const;

export const qualitySteps = [
  {
    title: "Incoming Material Inspection",
    image: "/images/process-embossing.jpg",
    imageAlt: "Close-up of a finished leather surface ready for inspection",
    description:
      "Raw materials are checked for specification, colour, thickness and visual defects before they enter production.",
  },
  {
    title: "In-Process Checks",
    image: "/images/process-lamination.jpg",
    imageAlt: "Production machinery running on the shop floor",
    description:
      "Operators and inspectors verify process parameters and output at each stage: perforation, embossing, lamination and cutting.",
  },
  {
    title: "Final Inspection",
    image: "/images/qc-inspection.jpg",
    imageAlt: "Team member presenting finished material panels",
    description:
      "Finished parts are inspected for dimensions, appearance and finish against approved samples and customer standards.",
  },
  {
    title: "Traceability & Documentation",
    image: "/images/service-design.jpg",
    imageAlt: "Engineer reviewing records on a workstation",
    description:
      "Inspection records are maintained so every batch can be traced, reviewed and continuously improved.",
  },
] as const;

