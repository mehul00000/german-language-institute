import type { Metadata } from "next";
import Link from "next/link";
import { INSTITUTE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About the institute",
  description:
    "The German Language Institute in Kaithal: how it teaches, what it expects, and who it is for.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>A desk in Kaithal that takes German seriously.</h1>
          <p className="lead">
            The {INSTITUTE.name} teaches German the way a workshop teaches a trade: small batches,
            speaking first, the exam rehearsed until it is ordinary.
          </p>
        </div>
      </section>

      <section className="section band band--paper" aria-label="About the institute">
        <div className="container prose">
          <p className="dropcap">
            Most people who walk in have one file in mind: a university admission, a visa, a job
            interview in Germany. German is the paper that file needs, at a stated level, examined
            by people who do not know you. That is exactly how we teach it: as a craft with
            standards, not as an app with streaks.
          </p>
          <p>
            The institute sits on the Kaithal-Pundri-Karnal road, near Sector 18. Batches stay
            small enough that the teacher hears every student speak in every hour. Offline in the
            room, online on a call, or a hybrid for those who split the week between the two. The
            syllabus does not change between the three.
          </p>
          <p>
            We take the CEFR ladder seriously. A1 assumes nothing. B1, the level most work and
            study routes ask for, is where arguments and interviews are rehearsed. C1 is where
            lectures and contracts open without a dictionary. Each course rehearses the
            Goethe-style exam papers, all four skills, from the first weeks, so the real exam
            feels like a Tuesday.
          </p>
          <h2>What we expect of students</h2>
          <ul>
            <li>Attendance, because a language is caught, not filed.</li>
            <li>Speaking, badly at first, in every single hour.</li>
            <li>The homework, which is mostly listening and reading out loud.</li>
          </ul>
          <h2>What students may expect of us</h2>
          <ul>
            <li>A placement chat before the first batch, so nobody starts on the wrong rung.</li>
            <li>Fees and batch hours stated plainly, in writing, before anything is paid.</li>
            <li>A teacher who answers questions on WhatsApp between classes.</li>
          </ul>
          <p style={{ marginTop: "var(--space-xl)" }}>
            The next step is a conversation, not a form. Call{" "}
            <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
              {INSTITUTE.phoneDisplay}
            </a>{" "}
            or <Link className="linkline" href="/admission">send an enquiry</Link> and the desk
            will call you back.
          </p>
        </div>
      </section>
    </>
  );
}
