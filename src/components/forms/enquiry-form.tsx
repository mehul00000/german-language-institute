"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { enquirySchema, type EnquiryInput } from "@/lib/validations/enquiry";
import { LEVELS, MODES } from "@/lib/constants";
import { submitEnquiry } from "@/app/actions/enquiry";

const LEVEL_OPTIONS = [
  { value: "A1", label: "A1, beginner" },
  { value: "A2", label: "A2, elementary" },
  { value: "B1", label: "B1, intermediate" },
  { value: "B2", label: "B2, upper int." },
  { value: "C1", label: "C1, advanced" },
] as const;

const MODE_OPTIONS = [
  { value: "Offline", label: "At the institute" },
  { value: "Online", label: "Online" },
  { value: "Hybrid", label: "A mix of both" },
] as const;

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<{ tone: "ok" | "error" | "plain"; text: string }>({
    tone: "plain",
    text: "The institute calls every enquiry back on the number you leave.",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { email: "", education: "", message: "", preferredContactTime: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const res = await submitEnquiry(values);
    if (res.ok && res.connected) {
      setStatus({ tone: "ok", text: res.message });
    } else {
      setStatus({ tone: res.connected ? "error" : "plain", text: res.message });
    }
  });

  return (
    <form className="card--enquiry" data-endpoint="action:submitEnquiry" noValidate onSubmit={onSubmit}>
      <p className="card__press">
        Admission enquiry
        <small>
          No account, no fee to ask. The desk answers within a working day.
        </small>
      </p>

      <label className="field">
        <span className="field__label">
          Student name <span className="req">(required)</span>
        </span>
        <input
          className="field__input"
          type="text"
          autoComplete="name"
          {...register("name")}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby="enq-name-help"
        />
        <span className="field__help" id="enq-name-help" data-tone={errors.name ? "error" : undefined} aria-live="polite">
          {errors.name?.message ?? ""}
        </span>
      </label>

      <label className="field">
        <span className="field__label">
          Phone number <span className="req">(required)</span>
        </span>
        <input
          className="field__input num"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="Ten digits"
          {...register("phone")}
          aria-invalid={errors.phone ? "true" : undefined}
          aria-describedby="enq-phone-help"
        />
        <span className="field__help" id="enq-phone-help" data-tone={errors.phone ? "error" : undefined} aria-live="polite">
          {errors.phone?.message ?? ""}
        </span>
      </label>

      {!compact && (
        <label className="field">
          <span className="field__label">Email address, if you use one</span>
          <input
            className="field__input"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby="enq-email-help"
          />
          <span className="field__help" id="enq-email-help" data-tone={errors.email ? "error" : undefined} aria-live="polite">
            {errors.email?.message ?? ""}
          </span>
        </label>
      )}

      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field__label">
          Interested level <span className="req">(required)</span>
        </legend>
        <div className="chips" role="radiogroup" aria-label="Interested level">
          {LEVEL_OPTIONS.map((o, i) => (
            <span className="chip" key={o.value}>
              <input
                type="radio"
                id={`lvl-${o.value}-${compact ? "c" : "f"}`}
                value={o.value}
                defaultChecked={i === 0}
                {...register("interestedLevel")}
              />
              <label htmlFor={`lvl-${o.value}-${compact ? "c" : "f"}`}>{o.label}</label>
            </span>
          ))}
        </div>
        <span className="field__help" data-tone={errors.interestedLevel ? "error" : undefined} aria-live="polite">
          {errors.interestedLevel?.message ?? ""}
        </span>
      </fieldset>

      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field__label">
          Learning mode <span className="req">(required)</span>
        </legend>
        <div className="chips" role="radiogroup" aria-label="Learning mode">
          {MODE_OPTIONS.map((o, i) => (
            <span className="chip" key={o.value}>
              <input
                type="radio"
                id={`mode-${o.value}-${compact ? "c" : "f"}`}
                value={o.value}
                defaultChecked={i === 0}
                {...register("learningMode")}
              />
              <label htmlFor={`mode-${o.value}-${compact ? "c" : "f"}`}>{o.label}</label>
            </span>
          ))}
        </div>
        <span className="field__help" data-tone={errors.learningMode ? "error" : undefined} aria-live="polite">
          {errors.learningMode?.message ?? ""}
        </span>
      </fieldset>

      <div className="form__foot">
        <button className="btn btn--solid" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Sending" : "Send the enquiry"}
        </button>
        <p className="form__status" data-tone={status.tone === "ok" ? "ok" : status.tone === "error" ? "error" : undefined} aria-live="polite">
          {status.text}
        </p>
      </div>
    </form>
  );
}
