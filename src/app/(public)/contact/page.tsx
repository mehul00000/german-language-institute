import type { Metadata } from "next";
import { INSTITUTE, whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact and address",
  description:
    "The German Language Institute in Kaithal: address on the Kaithal-Pundri-Karnal road, telephone and WhatsApp 08168 506171.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>The desk.</h1>
          <p className="lead">
            Come in, call, or WhatsApp. Questions about levels and batches are answered the same
            day the desk is open.
          </p>
        </div>
      </section>

      <section className="section band band--paper" aria-label="Contact details">
        <div className="container">
          <dl className="ruled desk__row" style={{ gridTemplateColumns: "minmax(0,4fr) minmax(0,8fr)", margin: 0 }}>
            <dt>Address</dt>
            <dd style={{ textAlign: "left" }}>{INSTITUTE.address}</dd>
          </dl>
          <dl className="ruled" style={{ marginTop: 0 }}>
            <div className="desk__row">
              <dt>Telephone</dt>
              <dd>
                <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
                  {INSTITUTE.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="desk__row">
              <dt>WhatsApp</dt>
              <dd>
                <a className="linkline" href={whatsappLink("Namaste. I have a question about the German courses.")}>
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
          <p className="caption" style={{ marginTop: "var(--space-lg)" }}>
            The building stands on the Kaithal-Pundri-Karnal road, near Sector 18, in Balaji
            Colony. Auto drivers know it as the road to Pundri.
          </p>
        </div>
      </section>
    </>
  );
}
