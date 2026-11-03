"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Solid header once the user scrolls past the top of the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    // The hero ("#top") is observed too, so no link stays highlighted when back at the top.
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

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo tone={solid ? "dark" : "light"} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      solid
                        ? isActive
                          ? "text-rose-600"
                          : "text-charcoal-700 hover:text-rose-600"
                        : isActive
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-rose-600 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-colors duration-300 hover:bg-rose-700 lg:inline-flex"
        >
          Send Enquiry
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
            solid ? "text-charcoal-900 hover:bg-charcoal-50" : "text-white hover:bg-white/10"
          }`}
        >
          <span className="sr-only">Menu</span>
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-charcoal-100 bg-white transition-[max-height,opacity] duration-500 lg:hidden ${
          menuOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <Container className="py-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-charcoal-100 py-4 font-display text-lg font-medium text-charcoal-900 transition-colors hover:text-rose-600"
                >
                  {link.label}
                  <span className="text-rose-600" aria-hidden>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-rose-600 px-6 py-3.5 text-sm font-semibold text-white"
          >
            Send Enquiry
          </a>
        </Container>
      </div>
    </header>
  );
}
