"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, MapPin, MessageSquareText, Package, Phone, Send, User } from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const MAX = { name: 60, city: 60, message: 500 };
const OTHER = "Other / Custom requirement";

/** Strips control characters and collapses whitespace on single-line fields. */
const oneLine = (v) => v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
/** Keeps line breaks in the message but drops other control characters. */
const multiLine = (v) => v.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim();

/** Accepts 10-digit Indian mobiles, with optional +91 / 91 / 0 prefix. */
function normalizePhone(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

function validate(v) {
  const errors = {};
  if (oneLine(v.name).length < 2) errors.name = "Please enter your name.";
  if (!normalizePhone(v.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (multiLine(v.message).length < 5) errors.message = "Please tell us a little about your requirement.";
  return errors;
}

const inputCls =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-[15px] text-ink placeholder:text-neutral-400 transition focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-brand";

const iconCls = "pointer-events-none absolute left-4 size-[18px] text-neutral-400 transition-colors peer-focus:text-brand";

function Field({ id, label, required, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: "", phone: "", product: "", city: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState(null);

  const set = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const aria = (key) => ({
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current?.elements[firstBad]?.focus();
      return;
    }

    const lines = [
      `Hello ${siteConfig.name}, I'd like to get in touch.`,
      "",
      `Name: ${oneLine(values.name).slice(0, MAX.name)}`,
      `Phone: ${normalizePhone(values.phone)}`,
    ];
    if (values.product) lines.push(`Product: ${values.product}`);
    const city = oneLine(values.city).slice(0, MAX.city);
    if (city) lines.push(`Location: ${city}`);
    lines.push("", `Message: ${multiLine(values.message).slice(0, MAX.message)}`);

    const url = whatsappLink(lines.join("\n"));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl bg-white p-5 shadow-[0_24px_60px_-20px_rgba(17,24,39,0.35)] ring-1 ring-black/5 sm:p-8"
    >
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
        Send Us a Message
      </h2>
      <p className="mt-2 text-[15px] text-ink/70 sm:text-base">
        Fill out the form below and we&apos;ll get back to you shortly.
      </p>

      <div className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field id="name" label="Your Name" required error={errors.name}>
          <div className="relative flex items-center">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={MAX.name}
              placeholder="e.g. Rahul Sharma"
              value={values.name}
              onChange={set("name")}
              className={cn(inputCls, "peer")}
              {...aria("name")}
            />
            <User className={iconCls} aria-hidden />
          </div>
        </Field>

        <Field id="phone" label="Mobile Number" required error={errors.phone}>
          <div className="relative flex items-center">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={16}
              placeholder="98765 43210"
              value={values.phone}
              onChange={set("phone")}
              className={cn(inputCls, "peer pl-[5.5rem]")}
              {...aria("phone")}
            />
            <Phone className={iconCls} aria-hidden />
            <span className="pointer-events-none absolute left-11 border-r border-neutral-200 pr-2.5 text-[15px] font-semibold text-ink/70">
              +91
            </span>
          </div>
        </Field>

        <Field id="product" label="Product Interest" error={errors.product}>
          <div className="relative flex items-center">
            <select
              id="product"
              name="product"
              value={values.product}
              onChange={set("product")}
              className={cn(inputCls, "peer appearance-none pr-11", !values.product && "text-neutral-400")}
              {...aria("product")}
            >
              <option value="">Select a Product</option>
              {products.map((p) => (
                <option key={p.slug} value={p.name} className="text-ink">
                  {p.name}
                </option>
              ))}
              <option value={OTHER} className="text-ink">
                {OTHER}
              </option>
            </select>
            <Package className={iconCls} aria-hidden />
            <ChevronDown className="pointer-events-none absolute right-4 size-5 text-neutral-500" aria-hidden />
          </div>
        </Field>

        <Field id="city" label="City / Location">
          <div className="relative flex items-center">
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              maxLength={MAX.city}
              placeholder="Where is the site?"
              value={values.city}
              onChange={set("city")}
              className={cn(inputCls, "peer")}
            />
            <MapPin className={iconCls} aria-hidden />
          </div>
        </Field>

        <Field id="message" label="Your Message" required error={errors.message} className="sm:col-span-2">
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={MAX.message}
              placeholder="Tell us about your requirements…"
              value={values.message}
              onChange={set("message")}
              className={cn(inputCls, "peer resize-y")}
              {...aria("message")}
            />
            <MessageSquareText className={cn(iconCls, "top-3.5")} aria-hidden />
          </div>
          <p className="mt-1.5 text-right text-xs font-medium text-ink/45" aria-hidden>
            {values.message.length}/{MAX.message}
          </p>
        </Field>
      </div>

      <button
        type="submit"
        className="group mt-4 flex w-fit items-center justify-center gap-2.5 rounded-xl bg-brand px-8 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-10px_rgba(217,40,31,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Send className="size-5" aria-hidden /> Send Message
        <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </button>

      <div aria-live="polite" className="mt-3">
        {sentUrl ? (
          <div className="fade-up flex items-start gap-3 rounded-2xl bg-green-50 p-4 ring-1 ring-green-200" style={{ "--d": "0ms" }}>
            <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green-600" aria-hidden />
            <p className="text-[15px] leading-snug text-green-900">
              <strong className="font-bold">Almost done!</strong> WhatsApp should open in a new tab with your
              message ready – just press Send there.{" "}
              <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
                Didn&apos;t open? Click here.
              </a>
            </p>
          </div>
        ) : (
          <p className="text-sm text-ink/55">
            This opens WhatsApp with your message ready to send. Nothing is stored on our website.
          </p>
        )}
      </div>
    </form>
  );
}
