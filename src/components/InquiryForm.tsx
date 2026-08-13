import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { LoaderCircle, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

interface InquiryFormProps {
  title?: string;
  description?: string;
  className?: string;
  submitLabel?: string;
  formId?: string;
}

export const InquiryForm = ({
  title = "Start your B2B inquiry",
  description = "Tell us what you need and our team will reply within 24 hours.",
  className = "",
  submitLabel = "Send inquiry",
  formId = "mjybrvgp",
}: InquiryFormProps) => {
  const [state, handleSubmit] = useForm(formId);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Inquiry sent successfully! Our team will contact you shortly.");
    }
  }, [state.succeeded]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!consent) {
      e.preventDefault();
      const msg = "Please confirm that our team may contact you about your inquiry.";
      setConsentError(msg);
      toast.error(msg);
      return;
    }
    setConsentError("");
    handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <div className={`rounded-2xl border border-border bg-surface-card p-6 shadow-[0_20px_60px_rgba(16,24,40,0.08)] sm:rounded-[28px] sm:p-8 text-center space-y-4 ${className}`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">Thank You!</h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Your inquiry has been submitted successfully to J K Fertilizers. Our team will contact you within 24 hours.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      className={`rounded-2xl border border-border bg-surface-card p-5 shadow-[0_20px_60px_rgba(16,24,40,0.08)] sm:rounded-[28px] sm:p-6 lg:p-8 ${className}`}
      onSubmit={onSubmit}
      data-testid="inquiry-form"
    >
      <div className="space-y-2 sm:space-y-3">
        <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-primary" data-testid="inquiry-form-eyebrow">
          B2B Lead Form
        </div>
        <h3 className="font-heading type-card-title font-bold text-foreground" data-testid="inquiry-form-title">
          {title}
        </h3>
        <p className="type-body text-muted-foreground" data-testid="inquiry-form-description">
          {description}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Your full name"
            className="h-12 rounded-xl border-border bg-muted"
            required
            data-testid="inquiry-form-name-input"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-destructive mt-1" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="company">Company</label>
          <Input
            id="company"
            name="company"
            placeholder="Company or brand"
            className="h-12 rounded-xl border-border bg-muted"
            required
            data-testid="inquiry-form-company-input"
          />
          <ValidationError prefix="Company" field="company" errors={state.errors} className="text-xs text-destructive mt-1" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            className="h-12 rounded-xl border-border bg-muted"
            required
            data-testid="inquiry-form-email-input"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-destructive mt-1" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="phone">Phone</label>
          <Input
            id="phone"
            name="phone"
            placeholder="Contact number"
            className="h-12 rounded-xl border-border bg-muted"
            required
            data-testid="inquiry-form-phone-input"
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-xs text-destructive mt-1" />
        </div>
      </div>

      <div className="mt-3 space-y-1.5 sm:mt-4">
        <label className="text-sm font-medium text-foreground" htmlFor="interest">Inquiry type</label>
        <select
          id="interest"
          name="interest"
          defaultValue="Distributor / B2B partnership"
          className="h-12 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          data-testid="inquiry-form-interest-select"
        >
          <option>Distributor / B2B partnership</option>
          <option>Custom formulation requirement</option>
          <option>Contract manufacturing</option>
          <option>Packaging / private label support</option>
          <option>Plant visit / capability discussion</option>
        </select>
        <ValidationError prefix="Interest" field="interest" errors={state.errors} className="text-xs text-destructive mt-1" />
      </div>

      <div className="mt-3 space-y-1.5 sm:mt-4">
        <label className="text-sm font-medium text-foreground" htmlFor="message">Project details</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your product, expected volume, or partnership requirement."
          className="min-h-[120px] rounded-xl border-border bg-muted sm:min-h-[140px]"
          required
          data-testid="inquiry-form-message-textarea"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-destructive mt-1" />
      </div>

      <label
        className="mt-3 flex items-start gap-3 rounded-xl border border-border bg-muted p-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:rounded-2xl sm:p-4 cursor-pointer"
        data-testid="inquiry-form-consent-wrapper"
      >
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (e.target.checked) setConsentError("");
          }}
          className="mt-0.5 h-4 w-4 rounded border-primary text-primary"
          data-testid="inquiry-form-consent-checkbox"
        />
        <span data-testid="inquiry-form-consent-text">
          I agree that the J K Fertilizers team may contact me by phone or email regarding this business inquiry.
        </span>
      </label>
      {consentError && (
        <p className="mt-1 text-xs text-destructive">{consentError}</p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-primary px-6 text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          disabled={state.submitting}
          data-testid="inquiry-form-submit-button"
        >
          {state.submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground sm:text-sm" data-testid="inquiry-form-status-message">
          Priority response for product, manufacturing, and distribution inquiries.
        </p>
      </div>
    </form>
  );
};

