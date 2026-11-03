export type ContactIconType = "Address" | "Phone" | "Email" | "Working Hours";

type ContactIconProps = {
  type: ContactIconType;
  className?: string;
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Line icons for contact details (address, phone, email, hours). */
export function ContactIcon({ type, className = "h-5 w-5" }: ContactIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {type === "Address" && (
        <>
          <path d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z" {...stroke} />
          <circle cx="12" cy="9.5" r="2.5" {...stroke} />
        </>
      )}
      {type === "Phone" && (
        <path
          d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4Z"
          {...stroke}
        />
      )}
      {type === "Email" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" {...stroke} />
        </>
      )}
      {type === "Working Hours" && (
        <>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M12 7v5l3 2" {...stroke} />
        </>
      )}
    </svg>
  );
}
