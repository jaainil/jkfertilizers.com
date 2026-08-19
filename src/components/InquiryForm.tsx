import { useState } from "react";
import { LoaderCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";

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
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!consent) {
      const msg = "Please check the consent box to allow us to contact you.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    setSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSucceeded(true);
        toast.success("Inquiry sent successfully! Our team will contact you shortly.");
      } else {
        const errorText =
          result?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          result?.error ||
          "Unable to send message. Please call our team directly at +91 9825045894.";
        setErrorMessage(errorText);
        toast.error(errorText);
      }
    } catch (err) {
      const fallbackMsg = "Network error. Please call our team directly at +91 9825045894 or email info@jkfertilizers.com.";
      setErrorMessage(fallbackMsg);
      toast.error(fallbackMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <div className={`rounded-2xl border border-border bg-surface-card p-6 shadow-card sm:rounded-3xl sm:p-8 text-center space-y-4 ${className}`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-heading type-card-title font-bold text-foreground">Thank You!</h3>
        <p className="type-body text-muted-foreground max-w-md mx-auto">
          Your inquiry has been submitted successfully to J K Fertilizers. Our team will contact you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setSucceeded(false);
            setErrorMessage("");
          }}
          className="mt-4 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      className={`rounded-2xl border border-border bg-surface-card p-5 shadow-card sm:rounded-3xl sm:p-6 lg:p-8 text-foreground ${className}`}
      onSubmit={handleSubmit}
      data-testid="inquiry-form"
    >
      <div className="space-y-2 sm:space-y-3">
        <div className="eyebrow" data-testid="inquiry-form-eyebrow">
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
            className="h-12 rounded-xl border-border bg-muted text-foreground"
            required
            data-testid="inquiry-form-name-input"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="company">Company</label>
          <Input
            id="company"
            name="company"
            placeholder="Company or brand"
            className="h-12 rounded-xl border-border bg-muted text-foreground"
            required
            data-testid="inquiry-form-company-input"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            className="h-12 rounded-xl border-border bg-muted text-foreground"
            required
            data-testid="inquiry-form-email-input"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="phone">Phone</label>
          <Input
            id="phone"
            name="phone"
            placeholder="Contact number"
            className="h-12 rounded-xl border-border bg-muted text-foreground"
            required
            data-testid="inquiry-form-phone-input"
          />
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
      </div>

      <div className="mt-3 space-y-1.5 sm:mt-4">
        <label className="text-sm font-medium text-foreground" htmlFor="message">Project details</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your product, expected volume, or partnership requirement."
          className="min-h-[120px] rounded-xl border-border bg-muted text-foreground sm:min-h-[140px]"
          required
          data-testid="inquiry-form-message-textarea"
        />
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
            if (e.target.checked) setErrorMessage("");
          }}
          className="mt-0.5 h-4 w-4 rounded border-primary text-primary cursor-pointer"
          data-testid="inquiry-form-consent-checkbox"
        />
        <span data-testid="inquiry-form-consent-text">
          I agree that the J K Fertilizers team may contact me by phone or email regarding this business inquiry.
        </span>
      </label>

      {errorMessage && (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-primary px-6 text-primary-foreground transition hover:bg-primary/90 sm:w-auto cursor-pointer"
          disabled={submitting}
          data-testid="inquiry-form-submit-button"
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </Button>
        <p className="type-body-sm text-muted-foreground" data-testid="inquiry-form-status-message">
          Priority response for product, manufacturing, and distribution inquiries.
        </p>
      </div>
    </form>
  );
};

