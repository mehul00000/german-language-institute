import type { Metadata } from "next";
import { INSTITUTE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How the German Language Institute in Kaithal handles enquiry and student details.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>Privacy policy.</h1>
          <p className="lead">What the institute keeps, why, and who sees it.</p>
        </div>
      </section>
      <section className="section band band--paper">
        <div className="container prose">
          <p className="dropcap">
            When you send an admission enquiry, the institute keeps the name, phone number, email
            if you gave one, and the level and mode you chose. The single use of these details is
            to call you back about admission. They are not sold, shared or used for anything else.
          </p>
          <h2>Who sees the details</h2>
          <p>
            Only the institute staff who handle admissions. Enquiries sit in the institute's own
            records, behind the staff login, and internal notes about an enquiry are never shown
            publicly.
          </p>
          <h2>How long details are kept</h2>
          <p>
            For as long as the enquiry or admission is live, and a reasonable term after. Say the
            word, on the phone or in person, and an enquiry is deleted from the records.
          </p>
          <h2>Students</h2>
          <p>
            Enrolled student records, including fees paid, are kept private. The website shows no
            student lists, and no student photograph or review is published without the student's
            say-so.
          </p>
          <h2>Questions</h2>
          <p>
            Ask at the desk, call{" "}
            <a className="linkline" href={`tel:${INSTITUTE.phoneTel}`}>
              {INSTITUTE.phoneDisplay}
            </a>
            , or write to {INSTITUTE.address}.
          </p>
        </div>
      </section>
    </>
  );
}
