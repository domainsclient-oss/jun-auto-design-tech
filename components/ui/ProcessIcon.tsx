type ProcessIconProps = {
  id: string;
  className?: string;
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Line icons for each manufacturing process, keyed by process id. */
export function ProcessIcon({ id, className = "h-6 w-6" }: ProcessIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {id === "design-development" && (
        <>
          <path d="M4 20 15.5 8.5l-2-2L2 18v2h2Z" {...stroke} />
          <path d="m13.5 6.5 2-2 4 4-2 2" {...stroke} />
          <path d="M14 20h6" {...stroke} />
        </>
      )}
      {id === "perforation" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" {...stroke} />
          {[8, 12, 16].flatMap((cx) =>
            [8, 12, 16].map((cy) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1" fill="currentColor" />
            )),
          )}
        </>
      )}
      {id === "embossing" && (
        <>
          <path d="M12 3 21 12 12 21 3 12 12 3Z" {...stroke} />
          <path d="M12 8 16 12 12 16 8 12 12 8Z" {...stroke} />
        </>
      )}
      {id === "hot-melt-lamination" && (
        <>
          <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" {...stroke} />
          <path d="m3 12 9 4.5 9-4.5" {...stroke} />
          <path d="m3 16.5 9 4.5 9-4.5" {...stroke} />
        </>
      )}
      {id === "cutting" && (
        <>
          <circle cx="6" cy="6" r="2.5" {...stroke} />
          <circle cx="6" cy="18" r="2.5" {...stroke} />
          <path d="M8 7.5 20 17M8 16.5 20 7" {...stroke} />
        </>
      )}
    </svg>
  );
}
