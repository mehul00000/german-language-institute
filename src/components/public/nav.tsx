"use client";

import Link from "next/link";
import { useState } from "react";
import { INSTITUTE } from "@/lib/constants";

const LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/german-levels", label: "Levels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link className="nav__mark" href="/" aria-label={`${INSTITUTE.name}, home`}>
          {INSTITUTE.name}
        </Link>
        <div className="nav__end">
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link className="btn nav__cta" href="/admission">
            Book a demo class
          </Link>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav__menu" id="nav-menu" aria-label="Site">
          <div className="container">
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admission" onClick={() => setOpen(false)}>
                  Admission
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
