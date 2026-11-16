"use client";

import { useQuery } from "convex/react";

type Row = { _id: string; studentName: string; courseLevel: string; rating: number; isPublished: boolean };

export default function TestimonialsPage() {
  const data = useQuery("testimonials:listAll" as never, {} as never) as Row[] | undefined;

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
        Only published reviews appear on the site. Ratings are integers from 1 to 5.
      </p>
      <table className="ruletable" style={{ marginTop: "var(--space-lg)" }}>
        <thead>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Level</th>
            <th scope="col">Rating</th>
            <th scope="col">Published</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((r) => (
            <tr key={r._id}>
              <td>{r.studentName}</td>
              <td>{r.courseLevel}</td>
              <td>{r.rating}</td>
              <td>{r.isPublished ? "yes" : "no"}</td>
            </tr>
          ))}
          {!data && (
            <tr>
              <td>Waiting for the connection</td>
              <td />
              <td />
              <td />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
