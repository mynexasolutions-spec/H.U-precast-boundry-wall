import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Headset } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { faqs } from "@/data/about";
import { whatsappLink } from "@/lib/whatsapp";

/** Short FAQ list + "Need Help?" card, side by side. */
export default function ContactFaq() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
      {/* FAQ */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-1.5 text-[15px] text-ink/65 sm:text-base">Find answers to common questions</p>
          </div>
          <Link
            href="/about#faq"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-[0_6px_18px_rgba(20,24,35,0.12)] ring-1 ring-black/10 transition-all hover:-translate-y-0.5 hover:text-brand hover:ring-brand/40"
          >
            View All FAQs <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {faqs.slice(0, 3).map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl bg-white shadow-[0_4px_16px_rgba(20,24,35,0.07)] ring-1 ring-black/5 transition-shadow open:shadow-[0_10px_28px_rgba(20,24,35,0.12)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-ink marker:hidden sm:text-base [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown className="size-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-5 pb-4 text-[15px] leading-relaxed text-ink/70">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Need help */}
      <div className="relative isolate flex min-h-[15rem] flex-col justify-center overflow-hidden rounded-3xl bg-[#111827] p-7 text-white shadow-[0_24px_60px_-20px_rgba(17,24,39,0.6)] sm:p-9">
        <Image
          src="/images/banners/cta.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="-z-20 object-cover object-right opacity-70"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-[#111827] via-[#111827]/85 to-[#111827]/30" />

        <div className="flex items-center gap-5">
          <span className="grid size-20 shrink-0 place-items-center rounded-full bg-brand/15 text-brand ring-2 ring-brand/60 sm:size-24">
            <Headset className="size-10 sm:size-12" strokeWidth={1.6} aria-hidden />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Need Help?</h3>
            <p className="mt-1.5 text-[15px] text-white/85 sm:text-base">Our team is ready to assist you.</p>
          </div>
        </div>

        <a
          href={whatsappLink("Hi, I need some help.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_26px_-10px_rgba(217,40,31,0.8)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          <WhatsAppIcon className="size-5" /> Contact Support <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
