"use client";

import { Fragment, useEffect, useRef, useState, type ElementType } from "react";

type WordsRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay between words, in milliseconds. */
  step?: number;
};

/**
 * Sets a sentence word by word: each word rises and fades in, one after another, the first
 * time the sentence scrolls into view. Without script, or with reduced motion, it simply shows.
 */
export function WordsReveal({ text, as: Tag = "p", className = "", step = 45 }: WordsRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-top" aria-hidden>
            <span
              className={`words-reveal inline-block ${visible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * step}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
