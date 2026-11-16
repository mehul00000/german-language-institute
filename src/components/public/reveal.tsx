"use client";

import { useEffect } from "react";

/**
 * The one reveal: elements tagged [data-reveal] fade in as they enter
 * view. With scripting off the CSS never hides them, so the page is
 * visible regardless (gate 62).
 */
export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
