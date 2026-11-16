"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { INSTITUTE } from "@/lib/constants";

/**
 * The draw's sticky booking bar: it rises once the hero has passed,
 * and stays out of the way until then.
 */
export function BookBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), {
      rootMargin: "-20% 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`bookbar${shown ? " is-in" : ""}`}>
      <div className="container bookbar__inner">
        <p className="bookbar__note">New batches each term. Ask at the desk for the next date.</p>
        <div className="bookbar__end">
          <a className="btn btn--quiet" href={`tel:${INSTITUTE.phoneTel}`}>
            Call {INSTITUTE.phoneDisplay}
          </a>
          <Link className="btn btn--solid" href="/admission">
            Book a demo class
          </Link>
        </div>
      </div>
    </div>
  );
}
