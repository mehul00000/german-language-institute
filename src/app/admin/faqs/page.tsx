"use client";

import { useQuery } from "convex/react";

type Row = { _id: string; question: string; answer: string; isPublished: boolean; order: number };

export default function FaqsPage() {
  const data = useQuery("faqs:listAll" as never, {} as never) as Row[] | undefined;

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
        Order decides placement on the site; only published rows show.
      </p>
      <table className="ruletable" style={{ marginTop: "var(--space-lg)" }}>
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Order</th>
            <th scope="col">Published</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((r) => (
            <tr key={r._id}>
              <td>{r.question}</td>
              <td>{r.order}</td>
              <td>{r.isPublished ? "yes" : "no"}</td>
            </tr>
          ))}
          {!data && (
            <tr>
              <td>Waiting for the connection</td>
              <td />
              <td />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
