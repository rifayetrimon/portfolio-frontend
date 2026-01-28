"use client";

import React, { useState } from "react";
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

// ==================== TYPE DEFINITIONS ====================

/**
 * Represents a form input field
 */
interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "textarea";
    placeholder: string;
    required: boolean;
}

/**
 * Represents form data
 */
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Represents form submission state
 */
interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
}

/**
 * Represents contact information
 */
interface ContactInfo {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}

/**
 * Represents a social media link
 */
interface SocialLink {
    name: string;
    icon: React.ReactNode;
    href: string;
    color: string;
}

// ==================== DATA ====================

/**
 * Contact form fields configuration
 */
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

/**
 * Contact information
 */
const CONTACT_INFO: ContactInfo[] = [
    {
        icon: <Mail size={24} className="text-indigo-400" />,
        label: "Email",
        value: "your.email@example.com",
        href: "mailto:your.email@example.com",
    },
    {
        icon: <Phone size={24} className="text-indigo-400" />,
        label: "Phone",
        value: "+1 (XXX) XXX-XXXX",
        href: "tel:+1XXXXXXXXXX",
    },
    {
        icon: <MapPin size={24} className="text-indigo-400" />,
        label: "Location",
        value: "Your City, Country",
    },
];

/**
 * Social media links
 */
const SOCIAL_LINKS: SocialLink[] = [
    {
        name: "GitHub",
        icon: <Github size={24} />,
        href: "https://github.com",
        color: "hover:text-gray-400 hover:bg-gray-800",
    },
    {
        name: "LinkedIn",
        icon: <Linkedin size={24} />,
        href: "https://linkedin.com",
        color: "hover:text-blue-400 hover:bg-blue-900/30",
    },
    {
        name: "Twitter",
        icon: <Twitter size={24} />,
        href: "https://twitter.com",
        color: "hover:text-sky-400 hover:bg-sky-900/30",
    },
];

// ==================== COMPONENTS ====================

/**
 * ContactInfoCard Component
 * Displays a single contact information item
 */
const ContactInfoCard: React.FC<{ info: ContactInfo }> = ({ info }) => {
    const content = (
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                {info.icon}
            </div>
            <div>
                <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                <p className="text-white font-semibold">{info.value}</p>
            </div>
        </div>
    );

    if (info.href) {
        return (
            <a
                href={info.href}
                className="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 group"
            >
                {content}
            </a>
        );
    }

    return (
        <div className="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30">
            {content}
        </div>
    );
};

/**
 * SocialLinkButton Component
 * Displays a social media link button
 */
const SocialLinkButton: React.FC<{ link: SocialLink }> = ({ link }) => {
    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border border-gray-700/50 bg-gray-900/30 text-gray-300 transition-all duration-300 ${link.color}`}
            aria-label={link.name}
        >
            {link.icon}
        </a>
    );
};

/**
 * FormInput Component
 * Renders a form input field
 */
const FormInput: React.FC<{
    field: FormField;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
}> = ({ field, value, onChange, error }) => {
    const baseClasses =
        "w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300";

    if (field.type === "textarea") {
        return (
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-400">*</span>}
                </label>
                <textarea
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    rows={5}
                    className={baseClasses}
                    required={field.required}
                />
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>
        );
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {field.label}
                {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={field.type}
                name={field.name}
                value={value}
                onChange={onChange}
                placeholder={field.placeholder}
                className={baseClasses}
                required={field.required}
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
};

// ==================== MAIN COMPONENT ====================

/**
 * Contact Section Component
 * Displays contact form, contact information, and social links
 * FULL-WIDTH VERSION: No max-width constraint, stretches edge to edge
 */
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

    /**
     * Validate form data
     */
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form input change
     */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormState({
            isSubmitting: true,
            isSuccess: false,
            isError: false,
            errorMessage: "",
        });

        try {
            // Simulate API call - Replace with your actual backend endpoint
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Here you would typically send the form data to your backend
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

            setFormState({
                isSubmitting: false,
                isSuccess: true,
                isError: false,
                errorMessage: "",
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            // Clear success message after 5 seconds
            setTimeout(() => {
                setFormState((prev) => ({
                    ...prev,
                    isSuccess: false,
                }));
            }, 5000);
        } catch (error) {
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                errorMessage: "Failed to send message. Please try again.",
            });
        }
    };

    return (
        <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 w-full">
            {/* FULL-WIDTH CONTAINER - No max-width constraint */}
            <div className="w-full">
                {/* Section Header */}
                <div className="mb-16 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Get In <span className="text-indigo-500">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        I'm always interested in hearing about new projects and opportunities. Feel free to reach out through the contact form or connect with me on social media.
                    </p>
                </div>

                {/* Main Content Grid - FULL WIDTH */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 px-4 sm:px-6 lg:px-8">
                    {/* Left Column - Contact Information */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            {CONTACT_INFO.map((info, idx) => (
                                <ContactInfoCard key={idx} info={info} />
                            ))}

                            {/* Social Links */}
                            <div className="pt-6 border-t border-gray-700/50">
                                <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                                <div className="flex gap-3">
                                    {SOCIAL_LINKS.map((link, idx) => (
                                        <SocialLinkButton key={idx} link={link} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/30"
                        >
                            <div className="space-y-6">
                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {FORM_FIELDS.slice(0, 2).map((field) => (
                                        <FormInput
                                            key={field.name}
                                            field={field}
                                            value={formData[field.name as keyof FormData]}
                                            onChange={handleInputChange}
                                            error={errors[field.name]}
                                        />
                                    ))}
                                </div>

                                {/* Subject Field */}
                                <FormInput
                                    field={FORM_FIELDS[2]}
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    error={errors.subject}
                                />

                                {/* Message Field */}
                                <FormInput
                                    field={FORM_FIELDS[3]}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    error={errors.message}
                                />

                                {/* Success Message */}
                                {formState.isSuccess && (
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                                        <CheckCircle size={20} className="text-green-400" />
                                        <p className="text-green-300">
                                            Message sent successfully! I'll get back to you soon.
                                        </p>
                                    </div>
                                )}

                                {/* Error Message */}
                                {formState.isError && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                                        <AlertCircle size={20} className="text-red-400" />
                                        <p className="text-red-300">{formState.errorMessage}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={formState.isSubmitting}
                                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {formState.isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional CTA - Full Width */}
                <div className="text-center p-8 rounded-2xl border border-gray-700/50 bg-gray-900/30 mx-4 sm:mx-6 lg:mx-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Prefer to chat?</h3>
                    <p className="text-gray-400 mb-6">
                        Connect with me on LinkedIn or send me a direct message on Twitter. I'm always happy to discuss new opportunities and ideas.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 rounded-full border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 font-semibold"
                        >
                            Connect on LinkedIn
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 rounded-full border border-sky-500/50 text-sky-400 hover:bg-sky-500/10 transition-all duration-300 font-semibold"
                        >
                            Message on Twitter
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
