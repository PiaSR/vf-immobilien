import React, { useState, useEffect, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";

// --- Props & Types ---
interface PropertyData {
  id?: string;
  title?: string;
  address?: string;
}

interface AgentContactFormProps {
  property?: PropertyData | null;
}

interface FormState {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  tandCs: boolean;
}

interface Errors {
  [key: string]: string;
}

// --- Configuration ---
const AGENT_SUCCESS_ID = "agent-form-success";
const AGENT_ERROR_ID = "agent-form-error";

// Zuordnung der Feldnamen zu deutschen Fehlermeldungen
const ERROR_MESSAGES = {
  firstName: "Ihr Name ist erforderlich.",
  email: {
    required: "E-Mail-Adresse ist erforderlich.",
    invalid:
      "Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@domain.at).",
  },
  phone: {
    required: "Telefonnummer ist erforderlich.",
    invalid:
      "Die Telefonnummer darf nur Ziffern und übliche Zeichen (+, -, Klammern) enthalten.",
  },
  message: "Eine Nachricht ist erforderlich.",
  tandCs: "Sie müssen den AGBs und Datenschutzbestimmungen zustimmen.",
};

// --- Validation Functions ---
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

// --- React Component ---
const AgentContactForm: React.FC<AgentContactFormProps> = ({
  property = {},
}) => {
  // State for form data, validation errors, and submission status
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    email: "",
    phone: "",
    message: "Ich interessiere mich für dieses Objekt.", // Default message
    tandCs: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [serverErrorDetail, setServerErrorDetail] = useState<string | null>(
    null
  );

  const formUrl = "/api/contactFormSend"; // Use the same action as before

  // --- Change Handler for controlled components ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear errors as user types/interacts
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // --- Validation Logic ---
  const validateForm = useCallback((data: FormState) => {
    const newErrors: Errors = {};
    let isValid = true;

    // First Name
    if (!data.firstName.trim()) {
      newErrors.firstName = ERROR_MESSAGES.firstName;
      isValid = false;
    }

    // Email
    if (!data.email.trim()) {
      newErrors.email = ERROR_MESSAGES.email.required;
      isValid = false;
    } else if (!isValidEmail(data.email.trim())) {
      newErrors.email = ERROR_MESSAGES.email.invalid;
      isValid = false;
    }

    // Phone
    if (!data.phone.trim()) {
      newErrors.phone = ERROR_MESSAGES.phone.required;
      isValid = false;
    } else if (!isValidPhone(data.phone.trim())) {
      newErrors.phone = ERROR_MESSAGES.phone.invalid;
      isValid = false;
    }

    // Message
    if (!data.message.trim()) {
      newErrors.message = ERROR_MESSAGES.message;
      isValid = false;
    }

    // Terms and Conditions
    if (!data.tandCs) {
      newErrors.tandCs = ERROR_MESSAGES.tandCs;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, []);

  // --- Submission Handler ---
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus("idle"); // Reset status on new submit
    setServerErrorDetail(null);

    if (!validateForm(formData)) {
      // Focus on the first invalid field
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(`agent-${firstErrorField}`)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new URLSearchParams();
      // Append form data
      data.append("first-name", formData.firstName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);
      data.append("TandCs", String(formData.tandCs));

      // Append hidden property data
      data.append("property-id", property.id ?? "");
      data.append("property-title", property.title ?? "");
      data.append("property-address", property.address ?? "");

      // Add context
      data.append("context", "Sidebar Agent Card");

      const response = await fetch(formUrl, {
        method: "POST",
        body: data.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        setSubmissionStatus("success");
        // Clear non-property related fields on success
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          message: "Ich interessiere mich für dieses Objekt.",
          tandCs: false,
        });
      } else {
        // Handle Server Errors (4xx, 5xx)
        let errorDetail = `Status ${response.status}`;
        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
          const errorBody = await response.json();
          errorDetail =
            errorBody.error || `Serverfehler (Status: ${response.status})`;
        }

        setServerErrorDetail(errorDetail);
        setSubmissionStatus("error");
      }
    } catch (error) {
      setServerErrorDetail(`Netzwerkfehler: ${(error as Error).message}`);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- JSX Rendering ---
  return (
    <form
      id="agent-contact-form"
      name="agent-contact-form"
      data-name="agent contact form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Hidden Fields for Property Data */}
      <input type="hidden" name="property-id" value={property.id ?? ""} />
      <input type="hidden" name="property-title" value={property.title ?? ""} />
      <input
        type="hidden"
        name="property-address"
        value={property.address ?? ""}
      />

      {/* First Name */}
      <div className="form-field-group">
        <label htmlFor="agent-first-name" className="visually-hidden">
          Ihr Name
        </label>
        <input
          className={`form-input ${errors.firstName ? "error" : ""}`}
          name="firstName"
          placeholder="Ihr Name"
          type="text"
          id="agent-first-name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <span
          id="error-agent-first-name"
          className="input-error-message"
          style={{ display: errors.firstName ? "block" : "none" }}
        >
          {errors.firstName}
        </span>
      </div>

      {/* Email */}
      <div className="form-field-group">
        <label htmlFor="agent-email-input" className="visually-hidden">
          Ihre Email
        </label>
        <input
          className={`form-input ${errors.email ? "error" : ""}`}
          name="email"
          placeholder="Ihre Email"
          type="email"
          id="agent-email-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span
          id="error-agent-email"
          className="input-error-message"
          style={{ display: errors.email ? "block" : "none" }}
        >
          {errors.email}
        </span>
      </div>

      {/* Phone */}
      <div className="form-field-group">
        <label htmlFor="agent-phone-input" className="visually-hidden">
          Telefonnummer
        </label>
        <input
          className={`form-input ${errors.phone ? "error" : ""}`}
          name="phone"
          placeholder="Ihre Telefonnummer"
          type="tel"
          id="agent-phone-input"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <span
          id="error-agent-phone"
          className="input-error-message"
          style={{ display: errors.phone ? "block" : "none" }}
        >
          {errors.phone}
        </span>
      </div>

      {/* Message */}
      <div className="form-field-group">
        <label htmlFor="agent-message" className="visually-hidden">
          Ihre Nachricht
        </label>
        <textarea
          id="agent-message"
          name="message"
          placeholder="Ich interessiere mich für dieses Objekt..."
          className={`form-textarea ${errors.message ? "error" : ""}`}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <span
          id="error-agent-message"
          className="input-error-message"
          style={{ display: errors.message ? "block" : "none" }}
        >
          {errors.message}
        </span>
      </div>

      {/* Terms and Conditions Checkbox */}
      <label className="form-checkbox-label" htmlFor="agent-TandCs">
        <input
          type="checkbox"
          name="tandCs"
          id="agent-TandCs"
          checked={formData.tandCs}
          onChange={handleChange}
          required
        />
        <span className="checkbox-custom-indicator"></span>
        <span className="checkbox-text">
          Ich habe die <a href="/agb">AGB</a> und{" "}
          <a href="/datenschutz">Datenschutzbestimmungen</a> gelesen und erkläre
          mich damit einverstanden.
        </span>
      </label>
      <div className="checkbox-error-wrapper">
        <span
          id="error-agent-TandCs"
          className="input-error-message"
          style={{ display: errors.tandCs ? "block" : "none" }}
        >
          {errors.tandCs}
        </span>
      </div>

      <div className="padding-bottom padding-small"></div>

      {/* Submission Button (Converted from Astro to HTML button) */}
      <button
        type="submit"
        className="button-element button-green button-small"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Anfrage senden..." : "Anfrage senden"}
      </button>

      {/* Success/Error Messages */}
      <div
        id={AGENT_SUCCESS_ID}
        className="form-success-message is-visible"
        style={{ display: submissionStatus === "success" ? "block" : "none" }}
      >
        <div>Danke für Ihre Anfrage! Wir werden uns bald bei Ihnen melden.</div>
      </div>

      <div
        id={AGENT_ERROR_ID}
        className="form-error-message is-visible"
        style={{ display: submissionStatus === "error" ? "block" : "none" }}
      >
        <div>
          Beim Absenden des Formulars ist ein Fehler aufgetreten. Bitte
          versuchen Sie es erneut.
          {serverErrorDetail && (
            <>
              <br />
              <br />
              <strong>Fehler-Details:</strong> {serverErrorDetail}
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default AgentContactForm;
