"use client";

import { useQuery, useMutation } from "convex/react";
import { useState } from "react";

type Row = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  interestedLevel: string;
  learningMode: string;
  status: string;
  notes?: string;
  createdAt: number;
};

const STATUSES = ["new", "contacted", "follow_up", "interested", "enrolled", "not_interested", "closed"];

export default function EnquiriesPage() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const data = useQuery(
    "enquiries:list" as never,
    {
      status: status || undefined,
      search: search || undefined,
      page: 0,
      pageSize: 20,
    } as never,
  ) as { rows: Row[]; total: number } | undefined;

  const updateStatus = useMutation("enquiries:updateStatus" as never);
  const exportRows = useQuery("enquiries:exportData" as never, {} as never) as
    | Array<Record<string, string>>
    | undefined;

  const downloadCsv = () => {
    if (!exportRows?.length) return;
    const head = Object.keys(exportRows[0]).join(",");
    const body = exportRows
      .map((r) => Object.values(r).map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([`${head}\n${body}`], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)", alignItems: "center" }}>
        <input
          className="field__input"
          style={{ maxWidth: "16rem" }}
          placeholder="Name or phone"
          aria-label="Search enquiries"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="field__input"
          style={{ maxWidth: "12rem", minHeight: "48px" }}
          aria-label="Filter by status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        <button className="btn" type="button" onClick={downloadCsv}>
          Export CSV
        </button>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
          {data ? `${data.total} enquiries` : "Waiting for the connection"}
        </p>
      </div>

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
          {(data?.rows ?? []).map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.phone}</td>
              <td>{r.interestedLevel}</td>
              <td>
                <select
                  aria-label={`Status for ${r.name}`}
                  className="field__input"
                  style={{ minHeight: "44px", minWidth: "10rem" }}
                  value={r.status}
                  onChange={(e) => updateStatus({ id: r._id, status: e.target.value } as never)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {data && data.rows.length === 0 && (
            <tr>
              <td>No enquiries match.</td>
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
