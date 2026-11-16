import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { INSTITUTE, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admission enquiry",
  description:
    "Send an admission enquiry to the German Language Institute in Kaithal. No account, no fee to ask; the desk calls back within a working day.",
  alternates: { canonical: "/admission" },
};

export default function AdmissionPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>Book a demo class.</h1>
          <p className="lead">
            Leave the details below; the desk calls back on your number, and the demo class follows
            from there.
          </p>
        </div>
      </section>

      <section className="section band band--paper" aria-label="Admission enquiry">
        <div className="container">
          <div className="desk">
            <div>
              <EnquiryForm />
            </div>
            <div>
              <h2 style={{ fontSize: "var(--text-xl)" }}>What happens next</h2>
              <ol className="steps" style={{ marginTop: "var(--space-lg)" }}>
                <li>
                  <h3>The desk calls</h3>
                  <p>Within a working day, on the number you left.</p>
                </li>
                <li>
                  <h3>A placement chat</h3>
                  <p>A few minutes of German, or none, to find your rung.</p>
                </li>
                <li>
                  <h3>A demo class</h3>
                  <p>You sit in a real batch, in the room or on the call.</p>
                </li>
              </ol>
              <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
                Prefer to talk now? Call{" "}
                <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
                  {INSTITUTE.phoneDisplay}
                </a>{" "}
                or{" "}
                <a
                  className="linkline"
                  href={whatsappLink("Namaste. I want to book a demo class at the institute.")}
                >
                  WhatsApp the desk
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
