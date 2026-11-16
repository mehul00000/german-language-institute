"use client";

import { useQuery } from "convex/react";

/** Dashboard statistics, straight from Convex. String references keep the scaffold independent of generated code. */
export default function AdminDashboard() {
  const stats = useQuery("dashboard:getStats" as never, {} as never) as
    | {
        totalEnquiries: number;
        newEnquiries: number;
        contactedEnquiries: number;
        enrolledStudents: number;
        activeStudents: number;
        activeCourses: number;
      }
    | undefined;
  const recent = useQuery("dashboard:getRecentEnquiries" as never, { count: 8 } as never) as
    | Array<{ _id: string; name: string; phone: string; interestedLevel: string; status: string; createdAt: number }>
    | undefined;

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <div className="bento" style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}>
        {[
          ["Enquiries, total", stats?.totalEnquiries],
          ["New enquiries", stats?.newEnquiries],
          ["Contacted", stats?.contactedEnquiries],
          ["Students enrolled", stats?.enrolledStudents],
          ["Students active", stats?.activeStudents],
          ["Courses active", stats?.activeCourses],
        ].map(([label, value]) => (
          <div className="tile tile--well" key={label as string} style={{ minHeight: 0 }}>
            <p style={{ font: "300 var(--text-2xl)/1.1 var(--font-display)", fontVariantNumeric: "tabular-nums", color: "var(--color-ink)" }}>
              {value ?? "\u2013"}
            </p>
            <p className="tile__meta">{label}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "var(--space-2xl)", fontSize: "var(--text-xl)" }}>Recent enquiries</h2>
      <table className="ruletable" style={{ marginTop: "var(--space-lg)" }}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Level</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {(recent ?? []).map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.phone}</td>
              <td>{r.interestedLevel}</td>
              <td>{r.status.replace("_", " ")}</td>
            </tr>
          ))}
          {!recent && (
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
