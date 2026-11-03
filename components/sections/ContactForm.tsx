"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/site";

type Status = "idle" | "submitting" | "success";
type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

// shadcn fields restyled for the charcoal contact panel; the border only appears on hover and focus.
const fieldClass =
  "h-auto rounded-none border-transparent bg-charcoal-900 px-4 py-3.5 text-body text-white placeholder:text-white/50 hover:border-white/30 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-rose-600/50 aria-invalid:border-rose-400 md:text-body";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(String(data.get("email") ?? "").trim()))
    errors.email = "Please enter a valid email address.";
  const phone = String(data.get("phone") ?? "").trim();
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = "Please enter a valid phone number.";
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
    // Honeypot: real visitors never see or fill this field, bots usually do.
    if (String(data.get("website") ?? "")) {
      form.reset();
      setStatus("success");
      return;
    }
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
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-white">
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
        <h3 className="mt-6 font-display text-sub font-bold uppercase text-white">
          Thank you for your enquiry
        </h3>
        <p className="mt-3 max-w-sm text-body text-white/80">
          We have received your details. A member of our team will get back to you soon.
        </p>
        <Button
          type="button"
          variant="link"
          onClick={() => setStatus("idle")}
          className="mt-8 h-auto p-0 text-body font-semibold text-rose-400"
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <div className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Field label="Full name" htmlFor="name" required error={errors.name}>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          className={fieldClass}
        />
      </Field>
      <Field label="Company" htmlFor="company">
        <Input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
          placeholder="Company name"
          className={fieldClass}
        />
      </Field>
      <Field label="Email" htmlFor="email" required error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          className={fieldClass}
        />
      </Field>
      <Field label="Phone" htmlFor="phone" error={errors.phone}>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={20}
          placeholder="Phone number"
          aria-invalid={Boolean(errors.phone)}
          className={fieldClass}
        />
      </Field>
      <Field label="Service of interest" htmlFor="service" className="sm:col-span-2">
        <Select name="service">
          <SelectTrigger
            id="service"
            className={`${fieldClass} w-full data-[size=default]:h-auto data-placeholder:text-white/50 [&_svg]:text-white/70`}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent position="popper" className="rounded-none">
            {services.map((service) => (
              <SelectItem key={service.id} value={service.title} className="rounded-none py-2.5 text-body">
                {service.title}
              </SelectItem>
            ))}
            <SelectItem value="General" className="rounded-none py-2.5 text-body">
              General enquiry
            </SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Message" htmlFor="message" required error={errors.message} className="sm:col-span-2">
        <Textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          placeholder="Tell us about your project, materials and quantities"
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} min-h-36 resize-none`}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="cta" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
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
      <Label htmlFor={htmlFor} className="mb-2 gap-1 text-body font-medium leading-normal text-white">
        {label}
        {required && <span className="text-rose-400">*</span>}
      </Label>
      {children}
      {error && (
        <p className="mt-2 text-small font-medium text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
