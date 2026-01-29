"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Award, ArrowRight } from "lucide-react";

// ==================== TYPE DEFINITIONS ====================

/**
 * Represents a responsibility or achievement in a role
 */
interface Responsibility {
    title: string;
    description: string;
}

/**
 * Represents a single work experience entry
 */
interface ExperienceEntry {
    id: number;
    company: string;
    position: string;
    duration: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    responsibilities: Responsibility[];
    technologies: string[];
    achievements: string[];
    isCurrentRole: boolean;
}

/**
 * Props for ExperienceCard component
 */
interface ExperienceCardProps {
    experience: ExperienceEntry;
    isLast: boolean;
}

// ==================== DATA ====================

/**
 * Work experience data
 */
const EXPERIENCE_DATA: ExperienceEntry[] = [
    {
        id: 1,
        company: "Awfatech Global",
        position: "Software Developer",
        duration: "Sep 2023 - Present",
        startDate: "September 2023",
        endDate: "Present",
        location: "Remote / On-site",
        description:
            "As a Software Developer, I design and implement full-stack web applications and machine learning solutions that drive business value. I collaborate with cross-functional teams to deliver scalable, user-centric products.",
        responsibilities: [
            {
                title: "Full-Stack Development",
                description:
                    "Build and maintain production-grade web applications using Next.js, TypeScript, and PostgreSQL, ensuring high performance and code quality.",
            },
            {
                title: "Backend Architecture",
                description:
                    "Design and implement RESTful APIs using FastAPI and Python, handling complex business logic and data processing.",
            },
            {
                title: "Machine Learning Integration",
                description:
                    "Develop and deploy ML models for predictive analytics and feature engineering, integrating them into production systems.",
            },
            {
                title: "Code Review & Mentoring",
                description:
                    "Participate in code reviews, share best practices, and mentor junior developers to maintain code quality standards.",
            },
        ],
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "FastAPI",
            "Python",
            "PostgreSQL",
            "Machine Learning",
            "Gradio",
        ],
        achievements: [
            "Developed 5+ full-stack applications with 99.9% uptime",
            "Reduced API response time by 40% through optimization",
            "Deployed 3 ML models on Kaggle with interactive Gradio interfaces",
            "Mentored 2 junior developers, improving team productivity",
        ],
        isCurrentRole: true,
    },
];

// ==================== COMPONENTS ====================

/**
 * ExperienceCard Component
 * Displays detailed information about a work experience entry
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, isLast }) => {
    return (
        <div className="relative">
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-6 top-20 w-1 h-32 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            )}

            {/* Timeline Dot */}
            <div className="absolute left-0 top-0">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <Briefcase size={24} className="text-white" />
                    </div>
                    {experience.isCurrentRole && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse"></div>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="ml-24 pb-12">
                <div
                    className="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 group"
                    style={{
                        boxShadow: "0 0 20px rgba(99, 102, 241, 0), inset 0 0 20px rgba(99, 102, 241, 0)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 0 30px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 0 20px rgba(99, 102, 241, 0), inset 0 0 20px rgba(99, 102, 241, 0)";
                    }}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                    {experience.position}
                                </h3>
                                {experience.isCurrentRole && (
                                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold border border-green-500/30">
                                        Current
                                    </span>
                                )}
                            </div>
                            <p className="text-lg text-indigo-400 font-semibold">{experience.company}</p>
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-indigo-400" />
                            <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-indigo-400" />
                            <span>{experience.location}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{experience.description}</p>

                    {/* Responsibilities */}
                    <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Award size={18} className="text-indigo-400" />
                            Key Responsibilities
                        </h4>
                        <div className="space-y-3">
                            {experience.responsibilities.map((resp, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-white font-medium">{resp.title}</p>
                                        <p className="text-gray-400 text-sm">{resp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Award size={18} className="text-purple-400" />
                            Key Achievements
                        </h4>
                        <div className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <ArrowRight size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">{achievement}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/30 hover:border-indigo-500/60 transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==================== MAIN COMPONENT ====================

/**
 * Experience Section Component
 * Displays work experience with timeline design
 */
const Experience: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        My <span className="text-indigo-500">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        A timeline of my professional journey, showcasing my growth, responsibilities, and impact in building scalable solutions and driving business value.
                    </p>
                </div>

                {/* Experience Timeline */}
                <div className="relative">
                    {EXPERIENCE_DATA.map((experience, idx) => (
                        <ExperienceCard
                            key={experience.id}
                            experience={experience}
                            isLast={idx === EXPERIENCE_DATA.length - 1}
                        />
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            label: "Years of Experience",
                            value: "1+",
                            color: "from-indigo-500 to-indigo-600",
                        },
                        {
                            label: "Projects Delivered",
                            value: "5+",
                            color: "from-purple-500 to-purple-600",
                        },
                        {
                            label: "Technologies Mastered",
                            value: "15+",
                            color: "from-pink-500 to-pink-600",
                        },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 text-center group"
                        >
                            <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                {stat.value}
                            </p>
                            <p className="text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">Ready to work together?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/50"
                    >
                        Get In Touch
                        <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Experience;
