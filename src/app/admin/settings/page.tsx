"use client";

import { useQuery } from "convex/react";

type Settings = {
  _id: string;
  instituteName: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  email?: string;
  aboutText?: string;
};

export default function SettingsPage() {
  const settings = useQuery("siteSettings:get" as never, {} as never) as Settings | undefined;

  return (
    <div style={{ paddingTop: "var(--space-lg)" }}>
      <dl className="ruled" style={{ margin: 0 }}>
        {settings ? (
          <>
            <div className="desk__row">
              <dt>Institute</dt>
              <dd style={{ textAlign: "left" }}>{settings.instituteName}</dd>
            </div>
            <div className="desk__row">
              <dt>Phone</dt>
              <dd style={{ textAlign: "left" }}>{settings.phone}</dd>
            </div>
            <div className="desk__row">
              <dt>WhatsApp</dt>
              <dd style={{ textAlign: "left" }}>{settings.whatsappNumber}</dd>
            </div>
            <div className="desk__row">
              <dt>Address</dt>
              <dd style={{ textAlign: "left" }}>{settings.address}</dd>
            </div>
          </>
        ) : (
          <div className="desk__row">
            <dt>Settings</dt>
            <dd style={{ textAlign: "left" }}>Waiting for the connection. Update once Convex is live.</dd>
          </div>
        )}
      </dl>
      <p className="caption" style={{ marginTop: "var(--space-md)" }}>
        Editing runs through <code>siteSettings:update</code>, admin role only.
      </p>
    </div>
  );
}
