import Link from "next/link";
import { INSTITUTE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="colophon">
      <div className="container">
        <p className="colophon__mark">{INSTITUTE.name}</p>
        <p className="colophon__body">
          {INSTITUTE.address}. Telephone{" "}
          <a href={`tel:${INSTITUTE.phoneTel}`}>{INSTITUTE.phoneDisplay}</a>, WhatsApp the same
          number. German courses from A1 to C1, offline and online, for Kaithal and the towns
          around it.
          <br />
          Photographs:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Statsbiblioteket_l%C3%A6sesalen-2.jpg">
            Villy Fink Isaksen
          </a>{" "}
          (CC BY-SA 4.0),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:M%C3%BCnster,_Prinzipalmarkt,_Arkaden_--_2021_--_8931-3.jpg">
            Dietmar Rabich
          </a>{" "}
          (CC BY-SA 4.0),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Esztergom_by_night_01_-_Simor_J%C3%A1nos_utca.jpg">
            Pudelek
          </a>{" "}
          (CC BY-SA 4.0), via Wikimedia Commons.
        </p>
        <ul className="colophon__links">
          <li>
            <Link href="/courses">Courses</Link>
          </li>
          <li>
            <Link href="/german-levels">German levels</Link>
          </li>
          <li>
            <Link href="/admission">Admission</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Privacy policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
        </ul>
        <p className="colophon__legal">© {new Date().getFullYear()} {INSTITUTE.name}, Kaithal.</p>
      </div>
    </footer>
  );
}
