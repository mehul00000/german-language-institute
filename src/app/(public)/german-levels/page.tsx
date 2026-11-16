import type { Metadata } from "next";
import { LevelsSwitcher } from "./levels-switcher";

export const metadata: Metadata = {
  title: "The German levels, A1 to C1",
  description:
    "What A1, A2, B1, B2 and C1 German actually mean, and which rung to start on, at the German Language Institute in Kaithal.",
  alternates: { canonical: "/german-levels" },
};

export default function GermanLevelsPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>Five rungs, plainly put.</h1>
          <p className="lead">
            The CEFR ladder runs A1 to C1. Pick a strip and the wall label tells you what it
            assumes and where it leaves you.
          </p>
        </div>
      </section>

      <section className="section band band--paper" aria-label="The levels">
        <div className="container">
          <LevelsSwitcher />
        </div>
      </section>
    </>
  );
}
