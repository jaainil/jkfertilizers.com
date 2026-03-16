import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: "Distributor / B2B partnership",
  message: "",
  consent: false,
};

export const InquiryForm = ({
  title = "Start your B2B inquiry",
  description = "Tell us what you need and our team will reply within 24 hours.",
  className = "",
  submitLabel = "Send inquiry",
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    if (!formData.consent) {
      const message = "Please confirm that our team may contact you about your inquiry.";
      setStatusMessage(message);
      toast.error(message);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData(initialForm);
      const message = "Inquiry sent successfully. Our team will contact you shortly.";
      setStatusMessage(message);
      toast.success(message);
    } catch {
      const message = "Something went wrong while sending your inquiry.";
      setStatusMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={`rounded-2xl border border-border bg-surface-card p-5 shadow-[0_20px_60px_rgba(16,24,40,0.08)] sm:rounded-[28px] sm:p-6 lg:p-8 ${className}`}
      onSubmit={handleSubmit}
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
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="h-12 rounded-xl border-border bg-muted"
            required
            data-testid="inquiry-form-name-input"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="company">Company</label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company or brand"
            className="h-12 rounded-xl border-border bg-muted"
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
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="h-12 rounded-xl border-border bg-muted"
            required
            data-testid="inquiry-form-email-input"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="phone">Phone</label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Contact number"
            className="h-12 rounded-xl border-border bg-muted"
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
          value={formData.interest}
          onChange={handleChange}
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
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your product, expected volume, or partnership requirement."
          className="min-h-[120px] rounded-xl border-border bg-muted sm:min-h-[140px]"
          required
          data-testid="inquiry-form-message-textarea"
        />
      </div>

      <label
        className="mt-3 flex items-start gap-3 rounded-xl border border-border bg-muted p-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:rounded-2xl sm:p-4"
        data-testid="inquiry-form-consent-wrapper"
      >
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border-primary text-primary"
          data-testid="inquiry-form-consent-checkbox"
        />
        <span data-testid="inquiry-form-consent-text">
          I agree that the Adit Biorganic team may contact me by phone or email regarding this business inquiry.
        </span>
      </label>

      {/* FIX 9.5: w-full on mobile, w-auto on sm */}
      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-primary px-6 text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          disabled={isSubmitting}
          data-testid="inquiry-form-submit-button"
        >
          {isSubmitting ? (
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
          {statusMessage || "Priority response for product, manufacturing, and distribution inquiries."}
        </p>
      </div>
    </form>
  );
};
