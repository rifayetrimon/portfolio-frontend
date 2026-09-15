"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Reveal, { Stagger } from "@/components/ui/Reveal";

// ==================== EMAILJS CONFIG ====================
// Sign up at https://www.emailjs.com and fill in these values
const EMAILJS_SERVICE_ID = "service_zzjsgoe";
const EMAILJS_TEMPLATE_ID = "template_1at4w0u";
const EMAILJS_PUBLIC_KEY = "8IEilWdBoqIz9OyEp";

// ==================== TYPE DEFINITIONS ====================

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

// ==================== DATA ====================

const FORM_FIELDS: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "What is this about?",
    required: true,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell me more about your inquiry...",
    required: true,
  },
];

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: <Mail size={20} className="text-accent sm:w-6 sm:h-6" />,
    label: "Email",
    value: "rifayetrimon@gmail.com",
    href: "mailto:rifayetrimon@gmail.com",
  },
  {
    icon: <Phone size={20} className="text-accent sm:w-6 sm:h-6" />,
    label: "Phone",
    value: "+60 16853-8566",
    href: "tel:+60168538566",
  },
  {
    icon: <MapPin size={20} className="text-accent sm:w-6 sm:h-6" />,
    label: "Location",
    value: "Jati-2, USJ-1, Subang Jaya, Selangor, Malaysia",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    icon: <Github size={20} className="sm:w-6 sm:h-6" />,
    href: "https://github.com",
    color: "hover:text-foreground hover:border-foreground/40 hover:bg-surface",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} className="sm:w-6 sm:h-6" />,
    href: "https://www.linkedin.com/in/rifayet-uddin-ahmed-079b97181",
    color: "hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/10",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} className="sm:w-6 sm:h-6" />,
    href: "https://twitter.com",
    color: "hover:text-sky-500 hover:border-sky-500/40 hover:bg-sky-500/10",
  },
];

// ==================== COMPONENTS ====================

const ContactInfoCard: React.FC<{ info: ContactInfo }> = ({ info }) => {
  const content = (
    <div className="flex items-start gap-4">
      <div className="p-2.5 sm:p-3 rounded-lg bg-brand-tint border border-brand-edge flex-shrink-0">
        {info.icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">
          {info.label}
        </p>
        <p className="text-sm sm:text-base text-foreground font-semibold break-all sm:break-normal">
          {info.value}
        </p>
      </div>
    </div>
  );

  if (info.href) {
    return (
      <a
        href={info.href}
        className="p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-brand transition-all duration-300 group block"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card">
      {content}
    </div>
  );
};

const SocialLinkButton: React.FC<{ link: SocialLink }> = ({ link }) => {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 sm:p-4 rounded-lg border border-border bg-card text-muted transition-all duration-300 ${link.color} flex-1 sm:flex-none flex justify-center`}
      aria-label={link.name}
    >
      {link.icon}
    </a>
  );
};

const FormInput: React.FC<{
  field: FormField;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
}> = ({ field, value, onChange, error }) => {
  const baseClasses =
    "w-full px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background text-foreground placeholder-subtle focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all duration-300 text-base sm:text-sm";

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-muted">
        {field.label}
        {field.required && <span className="text-danger-ink ml-1">*</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          rows={4}
          className={baseClasses}
          required={field.required}
        />
      ) : (
        <input
          type={field.type}
          name={field.name}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          className={baseClasses}
          required={field.required}
        />
      )}
      {error && (
        <p className="text-danger-ink text-[10px] sm:text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    });
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: "",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(
        () => setFormState((prev) => ({ ...prev, isSuccess: false })),
        5000,
      );
    } catch {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage:
          "Failed to send message. Please try again or contact me directly via email.",
      });
    }
  };

  return (
    <section className="w-full flex items-center py-12 sm:py-20">
      {/* 
                Container is set to 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' 
                to match the Navbar exactly. This ensures left and right 
                alignment is consistent across all sections.
            */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <Stagger variant="up" className="mb-10 sm:mb-16 text-center sm:text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 mx-auto sm:mx-0"></div>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto sm:mx-0">
            Have a project in mind or just want to say hi? Feel free to reach
            out. I&apos;m always open to new opportunities and collaborations.
          </p>
        </Stagger>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Side: Contact Info & Socials */}
          <Reveal variant="left" delay={80} className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                Contact Information
              </h3>
              <Stagger variant="up" step={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {CONTACT_INFO.map((info, idx) => (
                  <ContactInfoCard key={idx} info={info} />
                ))}
              </Stagger>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                Social Profiles
              </h3>
              <div className="flex gap-3 sm:gap-4">
                {SOCIAL_LINKS.map((link, idx) => (
                  <SocialLinkButton key={idx} link={link} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Side: Contact Form */}
          <Reveal variant="right" className="order-1 lg:order-2">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <FormInput
                    field={FORM_FIELDS[0]}
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />
                  <FormInput
                    field={FORM_FIELDS[1]}
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                </div>
                <FormInput
                  field={FORM_FIELDS[2]}
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                />
                <FormInput
                  field={FORM_FIELDS[3]}
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                />

                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-brand text-white font-bold hover:bg-brand-strong disabled:bg-surface disabled:text-subtle disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_var(--brand-glow)] text-sm sm:text-base"
                >
                  {formState.isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {formState.isSuccess && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-success-tint border border-success-edge text-success-ink text-sm animate-fade-in">
                    <CheckCircle size={18} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {formState.isError && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-danger-tint border border-danger-edge text-danger-ink text-sm animate-fade-in">
                    <AlertCircle size={18} />
                    {formState.errorMessage}
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
