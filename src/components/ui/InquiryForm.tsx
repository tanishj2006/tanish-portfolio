"use client";
// src/components/ui/InquiryForm.tsx
//
// Editorial inquiry form: mono labels, hairline underlines, no boxes.
//
// Submission has two paths and no silent failure mode:
//
//   NEXT_PUBLIC_FORM_ENDPOINT set  -> POST JSON to it. Works as-is with a
//     Formspree form URL. For Web3Forms, also set NEXT_PUBLIC_WEB3FORMS_KEY
//     and it is sent as `access_key`, which is what that API expects.
//   nothing set                    -> compose a mailto: and hand off to the
//     reader's mail client, telling them that is what is happening.
//
// A Server Action was the other option, but it needs a mail provider and an
// API key on the server; this keeps the site fully static and deployable with
// no secrets, and upgrades to a real endpoint by setting one env var.
//
// Zero CLS: every field reserves a fixed-height row for its error message, so
// a message appearing cannot push the rest of the form down.

import { useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { inquiry, outro } from "@/lib/content";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Fields = { name: string; email: string; type: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const EMPTY: Fields = { name: "", email: "", type: "", message: "" };

// Deliberately permissive. A stricter pattern rejects valid addresses
// (new TLDs, plus-addressing, quoted locals) and the real check is whether
// the reply lands, not whether a regex approves.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Tell me who you are.";
  if (!EMAIL.test(f.email.trim())) e.email = "A reachable email address.";
  if (!f.type) e.type = "Pick the closest one.";
  if (f.message.trim().length < 10) e.message = "A sentence or two, at least.";
  return e;
}

export default function InquiryForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Don't flag fields before the reader has tried to send: inline errors on
  // first blur read as nagging.
  const [submitted, setSubmitted] = useState(false);
  const uid = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);

  const set = (key: keyof Fields) => (value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (submitted) setErrors(validate(next));
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first problem so a keyboard or screen-reader user
      // is not left guessing why nothing happened.
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      const subject = `[${fields.type}] ${fields.name}`;
      const body = `${fields.message}\n\n— ${fields.name} <${fields.email}>`;
      window.location.href = `mailto:${outro.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(
          WEB3FORMS_KEY ? { ...fields, access_key: WEB3FORMS_KEY } : fields,
        ),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setFields(EMPTY);
      setSubmitted(false);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[22rem] flex-col justify-center gap-4 border border-rule-strong p-8">
        <span className="flex items-center gap-3 eyebrow text-signal">
          <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {inquiry.success}
        </span>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="self-start eyebrow text-ash transition-colors duration-[--duration-swift] ease-swift hover:text-chalk"
        >
          [SEND ANOTHER]
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7">
      <Field
        id={`${uid}-name`}
        index="01"
        label="YOUR NAME"
        value={fields.name}
        onChange={set("name")}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        id={`${uid}-email`}
        index="02"
        label="YOUR EMAIL"
        type="email"
        value={fields.email}
        onChange={set("email")}
        error={errors.email}
        autoComplete="email"
      />

      <FieldShell id={`${uid}-type`} index="03" label="INQUIRY TYPE" error={errors.type}>
        <select
          id={`${uid}-type`}
          value={fields.type}
          onChange={(e) => set("type")(e.target.value)}
          aria-invalid={errors.type ? true : undefined}
          aria-describedby={errors.type ? `${uid}-type-err` : undefined}
          className="w-full appearance-none rounded-none border-0 border-b border-rule bg-transparent py-2.5 font-sans text-lead text-chalk transition-colors duration-[--duration-swift] ease-swift outline-none focus:border-chalk"
        >
          <option value="" className="bg-void">
            SELECT —
          </option>
          {inquiry.types.map((t) => (
            <option key={t} value={t} className="bg-void">
              {t}
            </option>
          ))}
        </select>
      </FieldShell>

      <FieldShell
        id={`${uid}-message`}
        index="04"
        label="MESSAGE / BRIEF"
        error={errors.message}
      >
        <textarea
          id={`${uid}-message`}
          rows={4}
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-message-err` : undefined}
          className="w-full resize-none rounded-none border-0 border-b border-rule bg-transparent py-2.5 font-sans text-lead text-chalk transition-colors duration-[--duration-swift] ease-swift outline-none focus:border-chalk"
        />
      </FieldShell>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 border border-rule-strong px-6 py-3.5 eyebrow text-chalk transition-colors duration-[--duration-swift] ease-swift hover:invert-surface disabled:opacity-50"
        >
          {status === "sending" ? "SENDING" : "SEND INQUIRY"}
          <ArrowRight
            className="size-3.5 transition-transform duration-[--duration-swift] ease-editorial group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>

        {/* Always rendered so the status line reserves its own space and is a
            stable live region, rather than appearing and shifting the form. */}
        <p
          ref={statusRef}
          role="status"
          aria-live="polite"
          className="min-h-[1rem] flex-1 eyebrow text-ash"
        >
          {status === "mailto" && inquiry.mailtoNote}
          {status === "error" && "COULD NOT SEND — EMAIL ME DIRECTLY INSTEAD."}
        </p>
      </div>
    </form>
  );
}

/** Label + control + a permanently reserved error row. */
function FieldShell({
  id,
  index,
  label,
  error,
  children,
}: {
  id: string;
  index: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="flex items-baseline gap-2 pb-1 eyebrow">
        <span className="numeric text-ash">[{index}]</span>
        <span className="text-slate">{label}</span>
      </label>
      {children}
      {/* Always present and tall enough to hold one line, so an error
          appearing cannot move anything below it.
          box-sizing is border-box globally, so min-height has to cover the
          padding too: 13px text x 1.5 leading = 19.5px, + 6px padding-top =
          25.5px, rounded to 26px. The first attempt reserved 18px — less than
          one line once padding was counted — and each of the four rows grew
          7.5px on error, moving the submit button 30px down. */}
      <p
        id={`${id}-err`}
        className="min-h-[1.625rem] pt-1.5 text-caption text-signal"
        role={error ? "alert" : undefined}
      >
        {error}
      </p>
    </div>
  );
}

function Field({
  id,
  index,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  index: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <FieldShell id={id} index={index} label={label} error={error}>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        // Hairline underline only. The border colour is the whole focus
        // treatment: --color-rule -> --color-chalk, a paint-only change, so
        // focusing a field cannot move the layout by a pixel.
        className="w-full rounded-none border-0 border-b border-rule bg-transparent py-2.5 font-sans text-lead text-chalk transition-colors duration-[--duration-swift] ease-swift outline-none focus:border-chalk"
      />
    </FieldShell>
  );
}
