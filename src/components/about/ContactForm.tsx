"use client";

import { useState, useTransition, useRef } from "react";
import { z } from "zod";
import { enquirySchema } from "@/lib/validations";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const SERVICE_OPTIONS = [
  "Mutual Funds / SIP",
  "Lump-Sum Investment",
  "Home Loan",
  "Personal Loan",
  "Gold Loan",
  "Vehicle Loan",
  "Fixed Deposit",
  "Insurance",
  "General Enquiry",
];

type FieldErrors = Partial<Record<string, string>>;

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const submitRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitRef.current || isPending) return;

    setFieldErrors({});
    setServerError(null);

    const formData = new FormData(e.currentTarget);
    const raw = {
      fullName: formData.get("fullName") as string,
      mobileNumber: formData.get("mobileNumber") as string,
      email: formData.get("email") as string,
      serviceInterested: formData.get("serviceInterested") as string,
      preferredContactMethod: formData.get("preferredContactMethod") as string,
      message: formData.get("message") as string,
      consentGiven: formData.get("consentGiven") === "on" ? true : undefined,
      website: formData.get("website") as string,
    };

    // Client-side validation
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      parsed.error.errors.forEach((err) => {
        const field = err.path[0]?.toString();
        if (field) errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    submitRef.current = true;
    startTransition(async () => {
      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setSuccess(true);
          formRef.current?.reset();
        } else {
          setServerError(json.error || "Submission failed. Please try again.");
          submitRef.current = false;
        }
      } catch {
        setServerError("A network error occurred. Please check your connection and try again.");
        submitRef.current = false;
      }
    });
  }

  if (success) {
    return (
      <section
        id="contact"
        className="section-padding bg-white"
        aria-labelledby="contact-heading"
      >
        <div className="container-max">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-5">
              <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-3">Enquiry Received!</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thank you for reaching out to Modi Services. We have received your
              enquiry and will contact you through your preferred method shortly.
            </p>
            <button
              onClick={() => { setSuccess(false); submitRef.current = false; }}
              className="btn-primary"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="section-padding bg-white"
      aria-labelledby="contact-form-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">Enquire Now</span>
          <h2 id="contact-form-heading" className="section-title mb-4">
            Send Us Your Enquiry
          </h2>
          <p className="section-subtitle">
            Fill in the form below and we will get back to you through your
            preferred contact method.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact enquiry form"
          >
            {/* Server error */}
            {serverError && (
              <div
                role="alert"
                className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2"
              >
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            )}

            {/* Honeypot (hidden from real users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website (leave blank)</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="form-label">
                  Full Name <span aria-hidden="true" className="text-red-500">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="form-input"
                  placeholder="Your full name"
                  aria-required="true"
                  aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                  aria-invalid={!!fieldErrors.fullName}
                />
                {fieldErrors.fullName && (
                  <p id="fullName-error" className="form-error" role="alert">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number <span aria-hidden="true" className="text-red-500">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="form-input"
                  placeholder="+91 XXXXX XXXXX"
                  aria-required="true"
                  aria-describedby={fieldErrors.mobileNumber ? "mobile-error" : undefined}
                  aria-invalid={!!fieldErrors.mobileNumber}
                />
                {fieldErrors.mobileNumber && (
                  <p id="mobile-error" className="form-error" role="alert">
                    {fieldErrors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                  <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="form-input"
                  placeholder="your@email.com"
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="form-error" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Service Interested */}
              <div>
                <label htmlFor="serviceInterested" className="form-label">
                  Service Interested In <span aria-hidden="true" className="text-red-500">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <select
                  id="serviceInterested"
                  name="serviceInterested"
                  required
                  className="form-input bg-white"
                  aria-required="true"
                  aria-describedby={fieldErrors.serviceInterested ? "service-error" : undefined}
                  aria-invalid={!!fieldErrors.serviceInterested}
                >
                  <option value="">Select a service...</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {fieldErrors.serviceInterested && (
                  <p id="service-error" className="form-error" role="alert">
                    {fieldErrors.serviceInterested}
                  </p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <fieldset>
                <legend className="form-label">
                  Preferred Contact Method <span aria-hidden="true" className="text-red-500">*</span>
                  <span className="sr-only">(required)</span>
                </legend>
                <div className="flex flex-wrap gap-4 mt-2">
                  {[
                    { value: "phone", label: "Phone Call" },
                    { value: "whatsapp", label: "WhatsApp" },
                    { value: "email", label: "Email" },
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={value}
                        className="accent-navy-700"
                        aria-label={label}
                      />
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.preferredContactMethod && (
                  <p className="form-error" role="alert">{fieldErrors.preferredContactMethod}</p>
                )}
              </fieldset>

              {/* Message */}
              <div>
                <label htmlFor="message" className="form-label">
                  Message
                  <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Tell us about your requirements or any questions you have..."
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  aria-invalid={!!fieldErrors.message}
                />
                {fieldErrors.message && (
                  <p id="message-error" className="form-error" role="alert">{fieldErrors.message}</p>
                )}
              </div>

              {/* Privacy consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentGiven"
                    required
                    className="mt-1 accent-navy-700"
                    aria-required="true"
                    aria-describedby={fieldErrors.consentGiven ? "consent-error" : undefined}
                    aria-invalid={!!fieldErrors.consentGiven}
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I acknowledge that Modi Services will use my submitted contact
                    details to respond to this enquiry. I have read and understood
                    the{" "}
                    <a href="/privacy" className="text-navy-700 underline hover:text-navy-900">
                      Privacy Policy
                    </a>
                    . <span aria-hidden="true" className="text-red-500">*</span>
                    <span className="sr-only">(required)</span>
                  </span>
                </label>
                {fieldErrors.consentGiven && (
                  <p id="consent-error" className="form-error" role="alert">{fieldErrors.consentGiven}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full py-4 text-base"
                aria-disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                We will not share your details with third parties without your
                consent. Contact details submitted here will only be used to
                respond to your enquiry.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
