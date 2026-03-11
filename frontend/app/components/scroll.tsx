"use client";

import React, { useRef, useLayoutEffect } from "react";
import Lenis from "lenis";

export function ScrollStackItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`scroll-stack-card relative w-full min-h-70 md:min-h-80 my-8 p-10 rounded-3xl shadow-lg bg-black text-white will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export default function ScrollStack({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cards = containerRef.current?.querySelectorAll(
      ".scroll-stack-card"
    ) as NodeListOf<HTMLElement>;

    if (!cards || cards.length === 0) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    const update = (scrollY: number) => {
      const vh = window.innerHeight;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + scrollY;

        const start = cardTop - vh * 0.7;
        const end = cardTop;

        let progress = (scrollY - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));

        const scale = 1 - progress * (0.03 * (cards.length - i));
        const translateY = progress * 30 * i;

        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.zIndex = `${100 - i}`;
      });
    };

    lenis.on("scroll", ({ scroll }) => {
      update(scroll);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="max-w-4xl mx-auto space-y-40 pb-20 px-6">
        {children}
      </div>
    </div>
  );
}


