"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/lib/site";

type Status = "idle" | "submitting" | "success";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-xl border border-charcoal-100 bg-charcoal-50 px-4 py-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-300 transition-colors focus:border-rose-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-600/10";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(String(data.get("email") ?? "").trim()))
    errors.email = "Please enter a valid email address.";
  if (String(data.get("message") ?? "").trim().length < 10)
    errors.message = "Please tell us a little more about your requirement.";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // TODO: send `data` to the company's enquiry endpoint (email service, CRM or API route).
    await new Promise((resolve) => setTimeout(resolve, 700));
    form.reset();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden>
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-charcoal-900">
          Thank you for your enquiry
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal-500">
          We have received your details. A member of our team will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-rose-600 hover:text-rose-700"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name" htmlFor="name" required error={errors.name}>
        <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" className={inputClass} />
      </Field>
      <Field label="Company" htmlFor="company">
        <input id="company" name="company" type="text" autoComplete="organization" placeholder="Company name" className={inputClass} />
      </Field>
      <Field label="Email" htmlFor="email" required error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputClass} />
      </Field>
      <Field label="Phone" htmlFor="phone">
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone number" className={inputClass} />
      </Field>
      <Field label="Service of Interest" htmlFor="service" className="sm:col-span-2">
        <select id="service" name="service" defaultValue="" className={`${inputClass} appearance-none`}>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="General">General enquiry</option>
        </select>
      </Field>
      <Field label="Message" htmlFor="message" required error={errors.message} className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project, materials and quantities"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition-all duration-300 hover:bg-rose-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ label, htmlFor, required, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-charcoal-800">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs font-medium text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
