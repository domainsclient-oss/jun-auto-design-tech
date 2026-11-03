"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/site";

export function Header() {
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <Container className="flex h-20 items-center justify-between">
        <Logo tone="dark" />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative text-body font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-rose-600 after:transition-transform after:duration-300 hover:text-rose-700 hover:after:scale-x-100 ${
                      isActive ? "text-rose-700 after:scale-x-100" : "text-charcoal-900 after:scale-x-0"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button asChild className="hidden h-auto px-6 py-3 text-body font-semibold xl:inline-flex">
          <a href="#contact">Send an enquiry</a>
        </Button>

        {/* Phone and tablet menu: a shadcn Sheet sliding in from the right. */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="h-auto px-3 py-2 text-body font-semibold text-charcoal-900 xl:hidden">
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="gap-0 bg-white p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md xl:hidden">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Jump to a section of the page</SheetDescription>
            <div className="flex h-20 items-center pl-4 pr-14 sm:pl-8">
              <Logo tone="dark" />
            </div>
            <div className="flex flex-1 flex-col justify-between px-4 pb-8 pt-6 sm:px-8">
              <ul className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="block font-display text-sub font-semibold uppercase text-charcoal-900 transition-[color,transform] duration-200 hover:translate-x-1 hover:text-rose-700"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <SheetClose asChild>
                <Button asChild size="cta" className="mt-10 w-full">
                  <a href="#contact">Send an enquiry</a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
