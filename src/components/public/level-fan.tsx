import Link from "next/link";
import { COURSES } from "@/lib/data/courses";

/**
 * The signature: the five CEFR levels as cotton sample strips fanned
 * from a rivet, each strip a real link to its course. The stain wicks
 * up from the pointed tip; the name is printed small and vertical.
 */
const STAINS = ["stain--1", "stain--2", "stain--3", "stain--4", "stain--5"];

export function LevelFan() {
  return (
    <div className="fan" aria-label="The five levels, A1 to C1">
      {COURSES.map((c, i) => (
        <Link
          key={c.slug}
          className={`fan__item ${STAINS[i]}`}
          href={`/courses/${c.slug}`}
          style={{ ["--stain" as string]: undefined }}
          aria-label={`${c.level}, ${c.name.replace(`${c.level} `, "").toLowerCase()}`}
        >
          <span className="fan__level">{c.level}</span>
          <span className="fan__name">
            {c.name
              .replace(`${c.level} `, "")
              .replace("Upper Intermediate", "Upper int.")
              .toLowerCase()}
          </span>
        </Link>
      ))}
    </div>
  );
}
