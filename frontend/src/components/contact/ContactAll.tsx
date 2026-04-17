"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

import type { ContactHeroContent } from "@/features/marketing/contact/types";
import { useSiteSettings } from "@/features/core/providers";
import { submitContactMessage } from "@/features/messaging/api";
import { CONTACT_MESSAGE_PRESETS } from "@/features/messaging/presets";

type FormState = "idle" | "submitting" | "success" | "error";

type ContactAllProps = {
  heroContent: ContactHeroContent | null;
};

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "facebook") {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  if (icon === "google-business") {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 11.636v2.91h4.091c-.164.982-.764 1.814-1.636 2.373v1.964h2.646c1.55-1.427 2.444-3.532 2.444-6.019 0-.573-.05-1.123-.145-1.655H12z" />
        <path d="M12 20c2.209 0 4.064-.727 5.419-1.964l-2.646-1.964c-.727.487-1.655.782-2.773.782-2.123 0-3.923-1.432-4.564-3.355H4.7v2.023A8.18 8.18 0 0012 20z" />
        <path d="M7.436 13.499A4.93 4.93 0 017.182 12c0-.518.091-1.018.254-1.499V8.478H4.7A8.18 8.18 0 003.818 12c0 1.318.314 2.568.882 3.522l2.736-2.023z" />
        <path d="M12 7.145c1.2 0 2.273.414 3.123 1.227l2.341-2.341C16.059 4.723 14.204 4 12 4A8.18 8.18 0 004.7 8.478l2.736 2.023C8.077 8.577 9.877 7.145 12 7.145z" />
      </svg>
    );
  }

  return null;
}

export default function ContactAll({ heroContent }: ContactAllProps) {
  const siteSettings = useSiteSettings();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const eyebrow = heroContent?.eyebrow || "Get in touch";
  const title = heroContent?.title || "Let's talk about your lawn";
  const subtitle =
    heroContent?.subtitle ||
    "Free quotes, no pressure. We typically respond within one business day.";
  const heroImageUrl = heroContent?.heroImageUrl || "/lawn.png";

  const phone = siteSettings.phone || "(000) 000-0000";
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHref = phoneDigits ? `tel:+1${phoneDigits}` : "tel:+10000000000";

  const emailAddress = siteSettings.email || "hello@saltcreeklandscaping.com";
  const emailHref = `mailto:${emailAddress}`;

  const serviceArea = siteSettings.serviceArea || "Bloomington, Indiana";

  function formatTimeTo12Hour(time: string) {
    const [rawHours, rawMinutes] = time.split(":");
    const hours24 = Number(rawHours);
    const minutes = rawMinutes ?? "00";

    if (Number.isNaN(hours24)) return time;

    const suffix = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;

    return `${hours12}:${minutes} ${suffix}`;
  }

  const hours = siteSettings.businessHours.map((hour) => ({
    days: hour.label,
    time:
      hour.isClosed || !hour.openTime || !hour.closeTime
        ? "Closed"
        : `${formatTimeTo12Hour(hour.openTime)} - ${formatTimeTo12Hour(
            hour.closeTime
          )}`,
  }));

  const social = [
    ...(siteSettings.facebookUrl
      ? [{ label: "Facebook", href: siteSettings.facebookUrl, icon: "facebook" }]
      : []),
    ...(siteSettings.instagramUrl
      ? [
          {
            label: "Instagram",
            href: siteSettings.instagramUrl,
            icon: "instagram",
          },
        ]
      : []),
    ...(siteSettings.googleBusinessUrl
      ? [
          {
            label: "Google Business",
            href: siteSettings.googleBusinessUrl,
            icon: "google-business",
          },
        ]
      : []),
  ];

  const handlePreset = (preset: (typeof CONTACT_MESSAGE_PRESETS)[number]) => {
    setSubject(preset.subject);
    setMessage(preset.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage("Please fill out all required fields.");
      setFormState("error");
      return;
    }

    setErrorMessage("");
    setFormState("submitting");

    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phoneInput.trim(),
        subject: subject.trim(),
        message: message.trim(),
        hp,
      });

      setFormState("success");
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhoneInput("");
    setSubject("");
    setMessage("");
    setHp("");
    setErrorMessage("");
    setFormState("idle");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-highlight"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-left text-4xl font-bold tracking-tight text-text-inverse md:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 max-w-2xl text-left text-sm leading-7 text-text-inverse/80 sm:text-base"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="h-[3px] w-full bg-white" />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16 xl:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center rounded-[1.75rem] border border-primary/15 px-8 py-20 text-center"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>

                    <h2 className="text-2xl font-bold text-primary">
                      Message sent!
                    </h2>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-text/70">
                      Thanks for reaching out, {name.split(" ")[0]}. We&apos;ll
                      get back to you within one business day.
                    </p>

                    <button
                      onClick={handleReset}
                      className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-text-inverse transition hover:opacity-90"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="mb-1 text-2xl font-bold text-primary">
                      Send us a message
                    </h2>

                    <p className="mb-8 text-sm text-text/70">
                      Fill in the form below or use one of the quick prompts to
                      get started.
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {CONTACT_MESSAGE_PRESETS.map((preset) => {
                        const isActive =
                          subject === preset.subject &&
                          message === preset.message;

                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => handlePreset(preset)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                              isActive
                                ? "border-primary bg-primary text-text-inverse"
                                : "border-primary/20 bg-primary/5 text-primary"
                            }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      noValidate
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="name"
                            className="text-xs font-semibold uppercase tracking-wider text-primary"
                          >
                            Full name <span className="text-red-400">*</span>
                          </label>

                          <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Smith"
                            className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:ring-2"
                            style={
                              {
                                "--tw-ring-color":
                                  "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                              } as React.CSSProperties
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="email"
                            className="text-xs font-semibold uppercase tracking-wider text-primary"
                          >
                            Email address <span className="text-red-400">*</span>
                          </label>

                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@example.com"
                            className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:ring-2"
                            style={
                              {
                                "--tw-ring-color":
                                  "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="phone-input"
                            className="text-xs font-semibold uppercase tracking-wider text-primary"
                          >
                            Phone number{" "}
                            <span className="text-text/45 normal-case">
                              (optional)
                            </span>
                          </label>

                          <input
                            id="phone-input"
                            type="tel"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            placeholder="(812) 555-1234"
                            className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:ring-2"
                            style={
                              {
                                "--tw-ring-color":
                                  "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                              } as React.CSSProperties
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="subject"
                            className="text-xs font-semibold uppercase tracking-wider text-primary"
                          >
                            Subject <span className="text-red-400">*</span>
                          </label>

                          <input
                            id="subject"
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="How can we help?"
                            className="rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:ring-2"
                            style={
                              {
                                "--tw-ring-color":
                                  "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>

                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="hp">Leave this field empty</label>
                        <input
                          id="hp"
                          name="hp"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={hp}
                          onChange={(e) => setHp(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="message"
                          className="text-xs font-semibold uppercase tracking-wider text-primary"
                        >
                          Message <span className="text-red-400">*</span>
                        </label>

                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your property or what you're looking for…"
                          className="resize-none rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:ring-2"
                          style={
                            {
                              "--tw-ring-color":
                                "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                            } as React.CSSProperties
                          }
                        />
                      </div>

                      {formState === "error" && errorMessage ? (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                      ) : null}

                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="mt-1 flex items-center justify-center gap-2 self-start rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-text-inverse transition hover:opacity-90 disabled:opacity-60"
                      >
                        {formState === "submitting" ? (
                          <>
                            <svg
                              className="h-4 w-4 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-[1.5rem] border border-primary/10 p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  Contact details
                </p>

                <div className="flex flex-col gap-4">
                  <a
                    href={phoneHref}
                    className="group flex items-center gap-3.5 transition hover:opacity-80"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-text/45">
                        Phone
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={emailHref}
                    className="group flex items-center gap-3.5 transition hover:opacity-80"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-text/45">
                        Email
                      </p>
                      <p className="break-all text-sm font-semibold text-primary">
                        {emailAddress}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-text/45">
                        Service area
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {serviceArea}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-primary/10 p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                    Business hours
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {hours.map(({ days, time }) => (
                    <div
                      key={days}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm text-text/70">{days}</span>
                      <span
                        className={`text-sm font-medium ${
                          time === "Closed" ? "text-secondary" : "text-primary"
                        }`}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-primary/10 p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  Follow us
                </p>

                <div className="flex flex-col gap-3">
                  {social.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-primary/15 px-4 py-3 text-primary transition hover:opacity-80"
                    >
                      <SocialIcon icon={icon} />
                      <span className="text-sm font-semibold">{label}</span>
                      <svg
                        className="ml-auto h-3.5 w-3.5 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <p className="px-1 text-xs leading-6 text-text/45">
                We aim to respond to all messages within one business day. For
                urgent requests please call us directly.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}