import Link from "next/link";
import { AirCanvas } from "@/components/public/air-canvas";
import { LevelFan } from "@/components/public/level-fan";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { COURSES } from "@/lib/data/courses";
import { INSTITUTE, whatsappLink } from "@/lib/constants";

export const metadata = {
  title: `${INSTITUTE.name}, Kaithal | German courses A1 to C1`,
  description:
    "German courses from A1 to C1 in Kaithal, Haryana: small batches, offline and online, taught as a craft. Book a demo class or send an admission enquiry.",
};

const ROOM_IMG = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/1280px-Statsbiblioteket_l%C3%A6sesalen-2.jpg",
  srcSet:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/960px-Statsbiblioteket_l%C3%A6sesalen-2.jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/1280px-Statsbiblioteket_l%C3%A6sesalen-2.jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/1920px-Statsbiblioteket_l%C3%A6sesalen-2.jpg 1920w",
  width: 5165,
  height: 3820,
};

const STREET_IMG = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg/960px-M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg",
  srcSet:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg/768px-M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg 768w, https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg/960px-M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg/1280px-M%C3%BCnster%2C_Prinzipalmarkt%2C_Arkaden_--_2021_--_8931-3.jpg 1280w",
  width: 4466,
  height: 5955,
};

const FAQ = [
  {
    q: "I have never learned a language.",
    a: "A1 assumes nothing. The alphabet and the sounds are the first week, and the first sentence comes with them.",
  },
  {
    q: "Which level am I?",
    a: "Sit the placement chat when you come in. It takes minutes, and it decides your first batch, not the brochure.",
  },
  {
    q: "Offline or online?",
    a: "Both, and a hybrid between them. The syllabus does not change; only the room does.",
  },
  {
    q: "When does the next batch start?",
    a: "New batches open each term. Ask the desk for the next date, and the placement chat holds your rung.",
  },
];

export default function HomePage() {
  return (
    <>
      <AirCanvas />
      <>
        {/* The Ledge: air above, the head resting at its base, the levels fanned beside it */}
        <section className="hero band band--open" id="hero" aria-label="German Language Institute, Kaithal">
          <div className="hero__air" aria-hidden="true" />
          <div className="hero__base">
            <div className="container hero__grid">
              <div>
                <h1 className="hero__head" data-reveal style={{ ["--i" as string]: 0 }}>
                  German, taught as a craft.
                </h1>
                <p className="lead hero__lead" data-reveal style={{ ["--i" as string]: 1 }}>
                  Small batches from A1 to C1, offline and online, in Kaithal.
                </p>
                <div className="hero__actions" data-reveal style={{ ["--i" as string]: 2 }}>
                  <Link className="btn btn--solid" href="/admission">
                    Book a demo class
                  </Link>
                  <a className="linkline" href={whatsappLink("Namaste. I want to ask about German courses at the institute.")}>
                    WhatsApp the desk
                  </a>
                </div>
              </div>
              <div data-reveal style={{ ["--i" as string]: 1 }}>
                <LevelFan />
              </div>
            </div>
          </div>
        </section>

        {/* The institute, in tiles */}
        <section className="section band band--paper" aria-label="The institute in brief">
          <div className="container">
            <div className="head-split">
              <h2>The institute, in brief.</h2>
              <p className="lead">One desk in Kaithal, five rungs, two ways to sit.</p>
            </div>
            <div className="bento">
              <figure
                className="tile tile--photo photo photo--mat span-8"
                data-slot="room-1"
                data-alt="The institute classroom in daylight; this stand-in shows a study hall with wooden galleries"
                style={{ padding: "var(--space-md)", paddingBottom: "var(--space-2xl)", margin: 0 }}
              >
                <img
                  src={ROOM_IMG.src}
                  srcSet={ROOM_IMG.srcSet}
                  sizes="(min-width: 60rem) 50vw, 100vw"
                  width={ROOM_IMG.width}
                  height={ROOM_IMG.height}
                  alt="A study hall with wooden galleries and rows of desks"
                  style={{ objectPosition: "50% 45%" }}
                  loading="lazy"
                />
              </figure>
              <figure
                className="tile tile--photo photo span-4"
                data-slot="street-1"
                data-alt="A German street arcade; the streets the language opens"
                style={{ margin: 0 }}
              >
                <img
                  src={STREET_IMG.src}
                  srcSet={STREET_IMG.srcSet}
                  sizes="(min-width: 60rem) 25vw, 100vw"
                  width={STREET_IMG.width}
                  height={STREET_IMG.height}
                  alt="A vaulted stone arcade with hanging lamps, Münster"
                  loading="lazy"
                />
                <figcaption className="caption" data-keep>
                  Prinzipalmarkt, Münster.
                </figcaption>
              </figure>

              <div className="tile tile--stock span-4">
                <h3>The ladder</h3>
                <ul className="tile__list">
                  {COURSES.map((c) => (
                    <li key={c.slug}>
                      <Link className="linkline" href={`/courses/${c.slug}`}>
                        {c.level}
                      </Link>
                      <b>{c.name.replace(`${c.level} `, "")}</b>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tile tile--well span-4">
                <h3>Three ways to sit</h3>
                <p>
                  At the institute, at home on a call, or a hybrid of both. The syllabus does not
                  move; only the room does.
                </p>
                <p className="tile__meta">
                  Offline in Kaithal, online anywhere, hybrid for the town.
                </p>
              </div>

              <div className="tile tile--stock span-4">
                <h3>The desk, today</h3>
                <ul className="tile__list">
                  <li>
                    <b>Telephone</b>
                    <span>
                      <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
                        {INSTITUTE.phoneDisplay}
                      </a>
                    </span>
                  </li>
                  <li>
                    <b>WhatsApp</b>
                    <span>
                      <a className="linkline" href={whatsappLink("Namaste. I have a question about the courses.")}>
                        The same number
                      </a>
                    </span>
                  </li>
                  <li>
                    <b>Where</b>
                    <span>
                      <Link className="linkline" href="/contact">
                        Pundri Road, Kaithal
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The courses, as a ruled catalogue */}
        <section className="section band band--paper" aria-label="The five courses">
          <div className="container">
            <div className="head-split">
              <h2>Five levels, one ladder.</h2>
              <p className="lead">Fees and batch hours are set each term; the desk holds the list.</p>
            </div>
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
                        {c.focus}
                      </Link>
                    </td>
                    <td>{`Ready for the ${c.level} exam.`}</td>
                    <td>{c.modes.join(", ").toLowerCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="caption" style={{ marginTop: "var(--space-md)" }}>
              <Link className="linkline" href="/courses">
                Each course, in full
              </Link>
            </p>
          </div>
        </section>

        {/* Why German */}
        <section className="section band band--paper" aria-label="Why German">
          <div className="container">
            <h2>Why German.</h2>
            <div className="ruled" style={{ marginTop: "var(--space-2xl)" }}>
              {[
                {
                  t: "For the university",
                  l: "Public German universities charge little tuition, and most undergraduate courses run in German.",
                },
                {
                  t: "For the work file",
                  l: "Nursing, engineering and hospitality routes to Germany ask for a stated level of German.",
                },
                {
                  t: "For the paper",
                  l: "Every course rehearses the Goethe-style exam, all four skills, from the first weeks.",
                },
                {
                  t: "For the ear",
                  l: "English and German share the bones; the ladder starts closer than you expect.",
                },
              ].map((r) => (
                <div className="row" key={r.t}>
                  <h3>{r.t}</h3>
                  <p>{r.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How a term runs */}
        <section className="section section--tight band band--paper-2" aria-label="How a term runs">
          <div className="container">
            <h2>How a term runs.</h2>
            <ol className="steps" style={{ marginTop: "var(--space-2xl)", maxWidth: "60rem" }}>
              <li>
                <h3>A placement chat</h3>
                <p>Come in, talk for a few minutes, and start on the rung that fits.</p>
              </li>
              <li>
                <h3>A small batch</h3>
                <p>The teacher knows your name, and hears it every hour.</p>
              </li>
              <li>
                <h3>Speaking first</h3>
                <p>Grammar arrives to serve the sentence, never the other way round.</p>
              </li>
              <li>
                <h3>The exam, rehearsed</h3>
                <p>Model papers, all four skills, until the real one feels ordinary.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Asked at the desk, with the enquiry card */}
        <section className="section band band--paper" aria-label="Questions and admission enquiry">
          <div className="container">
            <div className="head-split">
              <h2>Asked at the desk.</h2>
              <p className="lead">Everything else, the desk answers on the phone.</p>
            </div>
            <div className="desk">
              <div className="faq">
                {FAQ.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p className="faq__a">{f.a}</p>
                  </details>
                ))}
              </div>
              <div>
                <EnquiryForm compact />
              </div>
            </div>
          </div>
        </section>

        {/* The desk: hours, address */}
        <section className="section section--loose band band--open" aria-label="Hours and address">
          <div className="container">
            <h2>The desk.</h2>
            <div className="desk" style={{ marginTop: "var(--space-2xl)" }}>
              <dl className="ruled" style={{ margin: 0 }}>
                <div className="desk__row">
                  <dt>Address</dt>
                  <dd>{INSTITUTE.address}</dd>
                </div>
                <div className="desk__row">
                  <dt>Telephone</dt>
                  <dd>
                    <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
                      {INSTITUTE.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
              <dl className="ruled" style={{ margin: 0 }}>
                <div className="desk__row">
                  <dt>WhatsApp</dt>
                  <dd>
                    <a className="linkline" href={whatsappLink("Namaste. I want to book a demo class.")}>
                      {INSTITUTE.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="desk__row">
                  <dt>Hours</dt>
                  <dd>
                    <span className="fill" data-fill="hours">
                      desk hours to be announced
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
