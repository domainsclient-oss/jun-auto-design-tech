import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline-light" | "outline-dark";
  className?: string;
};

const variants = {
  primary:
    "bg-rose-600 text-white shadow-lg shadow-rose-600/25 hover:bg-rose-700 hover:shadow-rose-700/30",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/10",
  "outline-dark":
    "border border-charcoal-900/15 text-charcoal-900 hover:border-rose-600 hover:text-rose-600",
} as const;

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
