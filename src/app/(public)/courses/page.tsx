import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/lib/data/courses";
import { INSTITUTE, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "German courses",
  description:
    "German courses at the institute in Kaithal: A1 beginner to C1 advanced, offline and online, with fees set each term at the desk.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>Five courses, one ladder.</h1>
          <p className="lead">
            From the alphabet in A1 to lectures and contracts in C1. Fees and batch hours are set
            each term; the desk holds the list.
          </p>
        </div>
      </section>

      <section className="section band band--paper" aria-label="All courses">
        <div className="container">
          <table className="ruletable">
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">The course</th>
                <th scope="col">You leave with</th>
                <th scope="col">Where</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => (
                <tr key={c.slug}>
                  <td>{c.level}</td>
                  <td>
                    <Link className="linkline" href={`/courses/${c.slug}`}>
                      {c.name}
                    </Link>
                    <br />
                    {c.focus}
                  </td>
                  <td>{`Ready for the ${c.level} exam.`}</td>
                  <td>{c.modes.join(", ").toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
            Not sure which rung is yours? Sit the placement chat, or{" "}
            <a className="linkline" href={whatsappLink("Namaste. Which German level suits me?")}>
              ask on WhatsApp
            </a>
            , or call{" "}
            <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
              {INSTITUTE.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
