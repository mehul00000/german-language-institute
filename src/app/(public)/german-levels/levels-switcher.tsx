"use client";

import { useState } from "react";
import { COURSES } from "@/lib/data/courses";

const STAINS = ["stain--1", "stain--2", "stain--3", "stain--4", "stain--5"];

/** The choice as strips: the five CEFR levels hang from an ink rail; the chosen one drops to its wall label. */
export function LevelsSwitcher() {
  const [chosen, setChosen] = useState(0);
  const course = COURSES[chosen];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setChosen((c) => (e.key === "ArrowRight" ? (c + 1) % COURSES.length : (c + COURSES.length - 1) % COURSES.length));
  };

  return (
    <div className="switcher">
      <div className="switcher__rail" role="tablist" aria-label="German levels" onKeyDown={onKey}>
        {COURSES.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            role="tab"
            id={`tab-${c.level}`}
            aria-selected={i === chosen}
            aria-controls={`panel-${c.level}`}
            tabIndex={i === chosen ? 0 : -1}
            className={`fan__item ${STAINS[i]}`}
            style={{ border: 0, padding: "var(--space-sm) 0 var(--space-lg)", font: "inherit" }}
            onClick={() => setChosen(i)}
          >
            <span className="fan__level">{c.level}</span>
            <span className="fan__name">
              {c.name
                .replace(`${c.level} `, "")
                .replace("Upper Intermediate", "Upper int.")
                .toLowerCase()}
            </span>
          </button>
        ))}
      </div>
      <section
        role="tabpanel"
        id={`panel-${course.level}`}
        aria-labelledby={`tab-${course.level}`}
        className="tile tile--stock walllabel"
      >
        <h3>{course.name}</h3>
        <p>{course.focus}</p>
        <ul className="walllabel__list">
          <li>
            <b>Assumes</b>
            <span>{course.eligibility}</span>
          </li>
          <li>
            <b>Where</b>
            <span>{course.modes.join(", ").toLowerCase()}</span>
          </li>
          <li>
            <b>Fees</b>
            <span>Set each term, at the desk</span>
          </li>
        </ul>
        <p style={{ marginTop: "var(--space-lg)" }}>
          <a className="linkline" href={`/courses/${course.slug}`}>
            The {course.level} course, in full
          </a>
        </p>
      </section>
    </div>
  );
}
