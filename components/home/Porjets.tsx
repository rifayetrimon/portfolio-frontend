"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Sparkles, Database, Brain, Globe } from "lucide-react";

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Full-Stack":
            return <Globe size={16} />;
        case "Machine Learning":
            return <Brain size={16} />;
        default:
            return <Sparkles size={16} />;
    }
};

// Helper function to get category color classes
const getCategoryColor = (category: string) => {
    switch (category) {
        case "Full-Stack":
            return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
        case "Machine Learning":
            return "bg-purple-500/20 text-purple-300 border-purple-500/30";
        default:
            return "bg-pink-500/20 text-pink-300 border-pink-500/30";
    }
};

// Projects data
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with real-time inventory management, payment integration, and advanced filtering capabilities.",
        category: "Full-Stack",
        technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Stripe"],
        image: "🛍️",
        highlights: ["Real-time Updates", "Payment Gateway", "Admin Dashboard"],
        links: {
            github: "https://github.com",
            live: "https://example.com"
        }
    },
    {
        id: 2,
        title: "Sentiment Analysis Model",
        description: "Machine learning model for analyzing customer sentiment from text data. Deployed on Kaggle with an interactive Gradio interface for real-time predictions.",
        category: "Machine Learning",
        technologies: ["Python", "Scikit-learn", "NLP", "Gradio", "Pandas"],
        image: "🧠",
        highlights: ["Feature Engineering", "Model Optimization", "Interactive Demo"],
        links: {
            kaggle: "https://kaggle.com",
            gradio: "https://huggingface.co/spaces"
        }
    },
    {
        id: 3,
        title: "Task Management Application",
        description: "Collaborative task management tool with real-time synchronization, user authentication, and team workspace features.",
        category: "Full-Stack",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io"],
        image: "✓",
        highlights: ["Real-time Collaboration", "User Auth", "Responsive Design"],
        links: {
            github: "https://github.com",
            live: "https://example.com"
        }
    },
    {
        id: 4,
        title: "House Price Prediction",
        description: "Advanced regression model for predicting house prices using feature engineering and ensemble methods. Includes comprehensive data analysis and model evaluation.",
        category: "Machine Learning",
        technologies: ["Python", "XGBoost", "Feature Engineering", "Matplotlib", "Kaggle"],
        image: "🏠",
        highlights: ["Ensemble Methods", "Data Analysis", "Kaggle Deployment"],
        links: {
            kaggle: "https://kaggle.com",
            gradio: "https://huggingface.co/spaces"
        }
    },
    {
        id: 5,
        title: "Content Management System",
        description: "Scalable CMS built with modern web technologies, featuring a powerful admin panel, SEO optimization, and multi-language support.",
        category: "Full-Stack",
        technologies: ["Next.js", "PostgreSQL", "FastAPI", "TypeScript", "Redis"],
        image: "📝",
        highlights: ["SEO Optimized", "Multi-language", "Admin Panel"],
        links: {
            github: "https://github.com",
            live: "https://example.com"
        }
    },
    {
        id: 6,
        title: "Image Classification Model",
        description: "Deep learning model for image classification using CNN architecture. Trained on custom dataset with data augmentation and deployed with Gradio interface.",
        category: "Machine Learning",
        technologies: ["Python", "TensorFlow", "CNN", "Gradio", "NumPy"],
        image: "🖼️",
        highlights: ["Deep Learning", "Data Augmentation", "Interactive UI"],
        links: {
            kaggle: "https://kaggle.com",
            gradio: "https://huggingface.co/spaces"
        }
    }
];

const categories = ["All", "Full-Stack", "Machine Learning"];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projectsData
        : projectsData.filter(project => project.category === activeCategory);

    return (
        <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        My <span className="text-indigo-500">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        A collection of full-stack applications and machine learning models showcasing my expertise in building scalable solutions and intelligent systems.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                                : "border border-gray-700 text-gray-300 hover:border-indigo-500 hover:text-indigo-300"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative h-full rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
                            style={{
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0), inset 0 0 20px rgba(99, 102, 241, 0)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 0 30px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0), inset 0 0 20px rgba(99, 102, 241, 0)";
                            }}
                        >
                            {/* Project Header with Icon */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{project.image}</div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getCategoryColor(project.category)}`}>
                                        {getCategoryIcon(project.category)}
                                        {project.category}
                                    </span>
                                </div>

                                {/* Project Title */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>

                                {/* Project Description */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {/* Highlights */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.highlights.map((highlight, idx) => (
                                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="px-6 pb-4 border-t border-gray-700/50">
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="px-6 py-4 border-t border-gray-700/50 flex gap-3">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-300 font-semibold text-sm"
                                    >
                                        <Github size={16} />
                                        GitHub
                                    </a>
                                )}
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold text-sm"
                                    >
                                        <ExternalLink size={16} />
                                        Live
                                    </a>
                                )}
                                {project.links.kaggle && (
                                    <a
                                        href={project.links.kaggle}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold text-sm"
                                    >
                                        <Database size={16} />
                                        Kaggle
                                    </a>
                                )}
                                {project.links.gradio && (
                                    <a
                                        href={project.links.gradio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-pink-600 hover:text-white transition-all duration-300 font-semibold text-sm"
                                    >
                                        <Sparkles size={16} />
                                        Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-400 text-lg">No projects found in this category.</p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">Interested in seeing more of my work?</p>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/50"
                    >
                        <Github size={20} />
                        Visit My GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
