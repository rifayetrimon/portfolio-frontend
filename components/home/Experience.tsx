"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Award, ArrowRight } from "lucide-react";

// ==================== TYPE DEFINITIONS ====================

interface Responsibility {
    title: string;
    description: string;
}

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

interface ExperienceCardProps {
    experience: ExperienceEntry;
    isLast: boolean;
}

// ==================== DATA ====================

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

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, isLast }) => {
    return (
        <div className="relative">
            {/* Timeline Line - Hidden on mobile, shown on sm+ */}
            {!isLast && (
                <div className="hidden sm:block absolute left-6 top-20 w-1 h-32 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
            )}

            {/* Timeline Dot - Positioned differently on mobile */}
            <div className="sm:absolute left-0 top-0 mb-4 sm:mb-0">
                <div className="relative inline-block sm:block">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <Briefcase size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    {experience.isCurrentRole && (
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-green-500 border-2 border-white animate-pulse"></div>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="sm:ml-24 pb-12">
                <div
                    className="p-5 sm:p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 group"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                            "0 0 30px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
                                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                    {experience.position}
                                </h3>
                                {experience.isCurrentRole && (
                                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-[10px] sm:text-xs font-semibold border border-green-500/30">
                                        Current
                                    </span>
                                )}
                            </div>
                            <p className="text-base sm:text-lg text-indigo-400 font-semibold">{experience.company}</p>
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-5 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Calendar size={14} className="text-indigo-400 sm:w-4 sm:h-4" />
                            <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <MapPin size={14} className="text-indigo-400 sm:w-4 sm:h-4" />
                            <span>{experience.location}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">{experience.description}</p>

                    {/* Responsibilities */}
                    <div className="mb-6">
                        <h4 className="text-white text-sm sm:text-base font-semibold mb-4 flex items-center gap-2">
                            <Award size={18} className="text-indigo-400" />
                            Key Responsibilities
                        </h4>
                        <div className="space-y-4 sm:space-y-3">
                            {experience.responsibilities.map((resp, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-white text-sm sm:text-base font-medium">{resp.title}</p>
                                        <p className="text-gray-400 text-xs sm:text-sm">{resp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                        <h4 className="text-white text-sm sm:text-base font-semibold mb-4 flex items-center gap-2">
                            <Award size={18} className="text-purple-400" />
                            Key Achievements
                        </h4>
                        <div className="space-y-3 sm:space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <ArrowRight size={14} className="text-purple-400 mt-1 flex-shrink-0 sm:w-4 sm:h-4" />
                                    <p className="text-gray-300 text-xs sm:text-sm">{achievement}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h4 className="text-white text-sm sm:text-base font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {experience.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] sm:text-sm font-medium border border-indigo-500/30 hover:border-indigo-500/60 transition-all"
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

const Experience: React.FC = () => {
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
                        My <span className="text-indigo-500">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 mx-auto sm:mx-0"></div>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto sm:mx-0">
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
                <div className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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
                            className="p-5 sm:p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 text-center group"
                        >
                            <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                                {stat.value}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 sm:mt-16 text-center">
                    <p className="text-sm sm:text-base text-gray-400 mb-6">Ready to work together?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/50 text-sm sm:text-base"
                    >
                        Get In Touch
                        <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Experience;
