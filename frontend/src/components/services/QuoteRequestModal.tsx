"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, Info, X } from "lucide-react";

import { submitQuoteRequest } from "@/features/messaging/api";
import { useServiceCategories } from "@/features/services/useServiceCategories";

type FormState = "idle" | "submitting" | "success" | "error";

type QuoteRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialServiceCategoryId?: string;
};

export default function QuoteRequestModal({
  isOpen,
  onClose,
  initialServiceCategoryId,
}: QuoteRequestModalProps) {
  const serviceCategories = useServiceCategories();
  const [isMounted, setIsMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceCategoryId, setServiceCategoryId] = useState(
    initialServiceCategoryId ?? ""
  );
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showIncludedItems, setShowIncludedItems] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setServiceCategoryId(initialServiceCategoryId ?? "");
    setShowIncludedItems(false);
  }, [isOpen, initialServiceCategoryId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const selectedCategory = useMemo(
    () =>
      serviceCategories.find((category) => category.id === serviceCategoryId) ??
      null,
    [serviceCategories, serviceCategoryId]
  );

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setServiceCategoryId(initialServiceCategoryId ?? "");
    setMessage("");
    setHp("");
    setErrorMessage("");
    setFormState("idle");
    setShowIncludedItems(false);
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => {
      handleReset();
    }, 180);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill out all required fields.");
      setFormState("error");
      return;
    }

    setErrorMessage("");
    setFormState("submitting");

    try {
      await submitQuoteRequest({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service_category: serviceCategoryId || undefined,
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

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/55 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Request a quote"
        >
          <div className="flex h-full items-center justify-center px-4 py-8 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border bg-white shadow-[0_30px_120px_rgba(0,0,0,0.30)]"
              style={{
                borderColor: "color-mix(in srgb, var(--color-primary) 10%, white)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,38,107,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(173,161,140,0.10),transparent_28%)]" />

              <button
                type="button"
                onClick={handleClose}
                className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-primary) 12%, white)",
                  background: "rgba(255,255,255,0.92)",
                  color: "var(--color-primary)",
                }}
                aria-label="Close quote request form"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative max-h-[90vh] overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                    >
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>

                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                        Quote request sent
                      </p>

                      <h2 className="text-3xl font-bold text-primary">
                        Thanks, {name.split(" ")[0] || "there"}.
                      </h2>

                      <p className="mt-4 max-w-md text-sm leading-7 text-text/70">
                        We received your request and will reach out within one
                        business day.
                      </p>

                      <button
                        type="button"
                        onClick={handleClose}
                        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-text-inverse transition hover:opacity-90"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-highlight">
                        Get started
                      </p>

                      <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                        Request a quote
                      </h2>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-text/70">
                        Tell us a little about what you need and we’ll follow up
                        with a quote. No pressure.
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-col gap-5"
                        noValidate
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="flex flex-col gap-1.5">
                            <label
                              htmlFor="quote-name"
                              className="text-xs font-semibold uppercase tracking-wider text-primary"
                            >
                              Full name <span className="text-red-400">*</span>
                            </label>

                            <input
                              id="quote-name"
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
                              htmlFor="quote-email"
                              className="text-xs font-semibold uppercase tracking-wider text-primary"
                            >
                              Email address <span className="text-red-400">*</span>
                            </label>

                            <input
                              id="quote-email"
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
                              htmlFor="quote-phone"
                              className="text-xs font-semibold uppercase tracking-wider text-primary"
                            >
                              Phone number{" "}
                              <span className="text-text/45 normal-case">
                                (optional)
                              </span>
                            </label>

                            <input
                              id="quote-phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
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
                              htmlFor="quote-service-category"
                              className="text-xs font-semibold uppercase tracking-wider text-primary"
                            >
                              Service category
                            </label>

                            <div className="relative flex items-center gap-2">
                              <select
                                id="quote-service-category"
                                value={serviceCategoryId}
                                onChange={(e) =>
                                  setServiceCategoryId(e.target.value)
                                }
                                className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-text outline-none transition focus:ring-2"
                                style={
                                  {
                                    "--tw-ring-color":
                                      "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                                  } as React.CSSProperties
                                }
                              >
                                <option value="">Not sure / choose later</option>
                                {serviceCategories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.title}
                                  </option>
                                ))}
                              </select>

                              {selectedCategory?.includedItems?.length ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowIncludedItems((prev) => !prev)
                                  }
                                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition hover:bg-primary/10"
                                  aria-label="Show included service items"
                                >
                                  <Info className="h-4 w-4" />
                                </button>
                              ) : null}
                            </div>

                            <AnimatePresence>
                              {showIncludedItems &&
                              selectedCategory?.includedItems?.length ? (
                                <motion.div
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  className="mt-2 rounded-xl border border-primary/10 bg-primary/5 p-4"
                                >
                                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                                    May Include
                                  </p>
                                  <ul className="space-y-1 text-sm text-text/80">
                                    {selectedCategory.includedItems.map((item) => (
                                      <li key={item.id}>• {item.name}</li>
                                    ))}
                                  </ul>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="hidden" aria-hidden="true">
                          <label htmlFor="quote-hp">Leave this field empty</label>
                          <input
                            id="quote-hp"
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
                            htmlFor="quote-message"
                            className="text-xs font-semibold uppercase tracking-wider text-primary"
                          >
                            Project details <span className="text-red-400">*</span>
                          </label>

                          <textarea
                            id="quote-message"
                            required
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us what you're looking for, the type of property, timing, or anything else helpful..."
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

                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            disabled={formState === "submitting"}
                            className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-text-inverse transition hover:opacity-80 hover:cursor-pointer disabled:opacity-60"
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
                              "Request Quote"
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-full border border-primary/20 bg-white px-8 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary/5 hover:cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}