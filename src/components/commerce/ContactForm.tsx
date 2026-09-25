"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Please tell us your name.";
    const email = String(data.get("email"));
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (String(data.get("message")).trim().length < 10)
      next.message = "Give us a little more detail (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bull/15 text-bull">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold">Message received</h2>
        <p className="mt-2 text-sm text-mist">
          This demo does not send email yet. Connect a form provider or API
          route to deliver messages to the team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <h2 className="text-2xl font-bold">Send a message</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name} autoComplete="name" />
        <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
      </div>
      <Field label="WhatsApp number (optional)" name="phone" type="tel" autoComplete="tel" />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink/80">Which robot are you interested in?</span>
        <select
          name="robot"
          className="w-full rounded-2xl border border-line bg-paper-2 px-4 py-3 text-sm outline-none transition focus:border-brand/60"
          defaultValue="undecided"
        >
          <option value="undecided">Not sure yet</option>
          <option value="aggressive">Aggressive EA</option>
          <option value="vip">VIP Semi-Automated EA</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink/80">Message</span>
        <textarea
          name="message"
          rows={5}
          className={`w-full rounded-2xl border bg-paper-2 px-4 py-3 text-sm outline-none transition focus:border-brand/60 ${
            errors.message ? "border-bear/60" : "border-line"
          }`}
        />
        {errors.message && <span className="mt-1 block text-xs text-bear">{errors.message}</span>}
      </label>
      <Button type="submit" className="w-full sm:w-auto">Send message</Button>
    </form>
  );
}
