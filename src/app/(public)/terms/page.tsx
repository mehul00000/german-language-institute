import type { Metadata } from "next";
import { INSTITUTE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The plain terms of using the German Language Institute website and joining a course.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="pagehead band band--paper">
        <div className="container">
          <h1>Terms, plainly.</h1>
          <p className="lead">The few rules that govern this website and the courses.</p>
        </div>
      </section>
      <section className="section band band--paper">
        <div className="container prose">
          <p className="dropcap">
            This website belongs to the {INSTITUTE.name}, Kaithal. The information on it, including
            course descriptions, is kept current by the institute, but fees and batch hours are
            confirmed at the desk each term. Where the website and the desk disagree, the desk is
            right.
          </p>
          <h2>Enquiries</h2>
          <p>
            An admission enquiry is a request to be called back, not a confirmed seat. A seat is
            confirmed at the desk, in person or on the phone, when fees and batch are settled.
          </p>
          <h2>Fees</h2>
          <p>
            Course fees are stated in writing before anything is paid, and receipts are given for
            every payment. Refunds, where a batch has not started, follow the institute's policy
            stated at admission.
          </p>
          <h2>Conduct</h2>
          <p>
            Students are expected to attend and to let others speak. The institute may move a
            student between batches to fit levels, with notice.
          </p>
          <h2>The website</h2>
          <p>
            Photographs on this site that are not the institute's own are credited in the footer
            and used under their Creative Commons licences. Nothing on the site may be copied for
            another business's use.
          </p>
        </div>
      </section>
    </>
  );
}
