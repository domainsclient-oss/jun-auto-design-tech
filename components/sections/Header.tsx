"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/lib/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Highlight the link of the section in view; the hero is observed so nothing stays lit at the top.
  useEffect(() => {
    const sections = ["#top", ...navLinks.map((link) => link.href)]
      .map((selector) => document.querySelector<HTMLElement>(selector))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the phone menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-white"
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo tone="dark" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`text-body font-medium transition-colors duration-200 hover:text-rose-700 ${
                      isActive ? "text-rose-700" : "text-charcoal-900"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden bg-rose-700 px-6 py-3 text-body font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-rose-800 active:scale-[0.97] lg:inline-flex"
        >
          Send an enquiry
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="text-body font-semibold text-charcoal-900 lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100svh-5rem)] overflow-y-auto bg-white lg:hidden"
      >
        <Container className="flex h-full flex-col justify-between py-8">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-display text-sub font-bold uppercase text-charcoal-900 transition-colors hover:text-rose-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-10 flex w-full items-center justify-center bg-rose-700 px-6 py-4 text-body font-semibold text-white"
          >
            Send an enquiry
          </a>
        </Container>
      </div>
    </header>
  );
}
