"use client";

import { useQuery } from "convex/react";

type Row = {
  _id: string;
  name: string;
  phone: string;
  courseFees: number;
  paymentStatus: string;
  status: string;
  admissionDate: number;
};

export default function StudentsPage() {
  const data = useQuery("students:list" as never, { page: 0, pageSize: 20 } as never) as
    | { rows: Row[]; total: number }
    | undefined;

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
        {data ? `${data.total} students` : "Waiting for the connection"}
      </p>
      <table className="ruletable" style={{ marginTop: "var(--space-lg)" }}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Fees</th>
            <th scope="col">Payment</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {(data?.rows ?? []).map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.phone}</td>
              <td>{r.courseFees.toLocaleString("en-IN")}</td>
              <td>{r.paymentStatus}</td>
              <td>{r.status}</td>
            </tr>
          ))}
          {data && data.rows.length === 0 && (
            <tr>
              <td>No students yet.</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          )}
        </tbody>
      </table>
      <p className="caption" style={{ marginTop: "var(--space-md)" }}>
        A student is created by converting an enquiry, in the enquiries list, or by an admin here
        once the Convex deployment is connected.
      </p>
    </div>
  );
}
