"use client";

import { useQuery, useMutation } from "convex/react";

type Row = {
  _id: string;
  name: string;
  slug: string;
  level: string;
  fees: number;
  duration: string;
  isActive: boolean;
};

export default function AdminCoursesPage() {
  const data = useQuery("courses:listAll" as never, {} as never) as Row[] | undefined;
  const toggle = useMutation("courses:toggleStatus" as never);

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
        Publishing, unpublishing and fees live here once the deployment is connected.
      </p>
      <table className="ruletable" style={{ marginTop: "var(--space-lg)" }}>
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Level</th>
            <th scope="col">Fees</th>
            <th scope="col">Published</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.level}</td>
              <td>{r.fees.toLocaleString("en-IN")}</td>
              <td>
                <button
                  className="btn btn--quiet"
                  type="button"
                  style={{ minHeight: "44px" }}
                  onClick={() => toggle({ id: r._id } as never)}
                >
                  {r.isActive ? "Unpublish" : "Publish"}
                </button>
              </td>
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
