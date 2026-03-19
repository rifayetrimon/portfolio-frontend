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

// WhatsApp SVG icon (official logo)
const WhatsAppIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    icon: <Mail size={20} className="text-indigo-400 sm:w-6 sm:h-6" />,
    label: "Email",
    value: "rifayetrimom@gmail.com",
    href: "mailto:rifayetrimom@gmail.com",
  },
  {
    icon: <Phone size={20} className="text-indigo-400 sm:w-6 sm:h-6" />,
    label: "Phone",
    value: "+60 16853-8566",
    href: "tel:+60168538566",
  },
  {
    icon: <MapPin size={20} className="text-indigo-400 sm:w-6 sm:h-6" />,
    label: "Location",
    value: "Jati-2, USJ-1, Subang Jaya, Selangor, Malaysia",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    icon: <Github size={20} className="sm:w-6 sm:h-6" />,
    href: "https://github.com",
    color: "hover:text-gray-400 hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} className="sm:w-6 sm:h-6" />,
    href: "https://www.linkedin.com/in/rifayet-uddin-ahmed-079b97181",
    color: "hover:text-blue-400 hover:bg-blue-900/30",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} className="sm:w-6 sm:h-6" />,
    href: "https://twitter.com",
    color: "hover:text-sky-400 hover:bg-sky-900/30",
  },
  {
    name: "WhatsApp",
    icon: <WhatsAppIcon size={20} className="sm:w-6 sm:h-6" />,
    href: "https://wa.me/8801622109042?text=Hi%20Rifayet%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!",
    color: "hover:text-green-400 hover:bg-green-900/30",
  },
];

// ==================== COMPONENTS ====================

const ContactInfoCard: React.FC<{ info: ContactInfo }> = ({ info }) => {
  const content = (
    <div className="flex items-start gap-4">
      <div className="p-2.5 sm:p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">
        {info.icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
          {info.label}
        </p>
        <p className="text-sm sm:text-base text-white font-semibold break-all sm:break-normal">
          {info.value}
        </p>
      </div>
    </div>
  );

  if (info.href) {
    return (
      <a
        href={info.href}
        className="p-5 sm:p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 group block"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30">
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
      className={`p-3 sm:p-4 rounded-lg border border-gray-700/50 bg-gray-900/30 text-gray-300 transition-all duration-300 ${link.color} flex-1 sm:flex-none flex justify-center`}
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
    "w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-700 bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 text-sm sm:text-base";

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-gray-300">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
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
        <p className="text-red-400 text-[10px] sm:text-xs mt-1">{error}</p>
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
        <div className="mb-10 sm:mb-16 text-center sm:text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get In <span className="text-indigo-500">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 mx-auto sm:mx-0"></div>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto sm:mx-0">
            Have a project in mind or just want to say hi? Feel free to reach
            out. I&apos;m always open to new opportunities and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Side: Contact Info & Socials */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {CONTACT_INFO.map((info, idx) => (
                  <ContactInfoCard key={idx} info={info} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Social Profiles
              </h3>
              <div className="flex gap-3 sm:gap-4">
                {SOCIAL_LINKS.map((link, idx) => (
                  <SocialLinkButton key={idx} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-700/50 bg-gray-900/30 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
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
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 text-sm sm:text-base"
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
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-fade-in">
                    <CheckCircle size={18} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {formState.isError && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                    <AlertCircle size={18} />
                    {formState.errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
