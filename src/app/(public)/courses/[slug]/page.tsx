import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, courseBySlug } from "@/lib/data/courses";
import { INSTITUTE, whatsappLink } from "@/lib/constants";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.name} German course`,
    description: `${course.description} Fees and batch hours are set each term at the desk in Kaithal.`,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

export default async function CoursePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();

  const others = COURSES.filter((c) => c.slug !== course.slug);

  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>{course.name}.</h1>
          <p className="lead">{course.description}</p>
        </div>
      </section>

      <section className="section band band--paper" aria-label={`${course.name} details`}>
        <div className="container">
          <div className="desk">
            <div>
              <h2 style={{ fontSize: "var(--text-xl)" }}>The course covers</h2>
              <ul className="tile__list ruled" style={{ marginTop: "var(--space-lg)" }}>
                {course.curriculum.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <dl className="ruled" style={{ margin: 0 }}>
              <div className="desk__row">
                <dt>Eligibility</dt>
                <dd>{course.eligibility}</dd>
              </div>
              <div className="desk__row">
                <dt>Where</dt>
                <dd>{course.modes.join(", ").toLowerCase()}</dd>
              </div>
              <div className="desk__row">
                <dt>Fees and hours</dt>
                <dd>
                  Set each term.{" "}
                  <a
                    className="linkline"
                    href={whatsappLink(`Namaste. I want the fees and next batch for the ${course.level} course.`)}
                  >
                    Ask on WhatsApp
                  </a>
                </dd>
              </div>
              <div className="desk__row">
                <dt>Telephone</dt>
                <dd>
                  <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
                    {INSTITUTE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="desk__row">
                <dt>Book a demo</dt>
                <dd>
                  <Link className="linkline" href="/admission">
                    The enquiry form
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--tight band band--paper" aria-label="The other courses">
        <div className="container">
          <h2>The rest of the ladder.</h2>
          <div className="ruled" style={{ marginTop: "var(--space-2xl)" }}>
            {others.map((c) => (
              <div className="row" key={c.slug}>
                <h3>
                  <Link className="linkline" href={`/courses/${c.slug}`}>
                    {c.name}
                  </Link>
                </h3>
                <p>{c.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
