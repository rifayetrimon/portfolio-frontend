"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Sparkles,
  Database,
  Brain,
  Globe,
} from "lucide-react";
import { Stagger } from "@/components/ui/Reveal";

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
      return "bg-brand-tint text-brand-ink border-brand-edge";
    case "Machine Learning":
      return "bg-violet-tint text-violet-ink border-violet-edge";
    default:
      return "bg-rose-tint text-rose-ink border-rose-edge";
  }
};

// Projects data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, payment integration, and advanced filtering capabilities.",
    category: "Full-Stack",
    technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Stripe"],
    image: "🛍️",
    highlights: ["Real-time Updates", "Payment Gateway", "Admin Dashboard"],
    links: {
      github: "https://github.com/rifayetrimon/Stowa_dashboard/tree/master",
      live: "https://stowaaecom.netlify.app/",
    },
  },
  {
    id: 2,
    title: "Sentiment Analysis Model",
    description:
      "Machine learning model for analyzing customer sentiment from text data. Deployed on Kaggle with an interactive Gradio interface for real-time predictions.",
    category: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "NLP", "Gradio", "Pandas"],
    image: "🧠",
    highlights: [
      "Feature Engineering",
      "Model Optimization",
      "Interactive Demo",
    ],
    links: {
      kaggle: "https://kaggle.com",
      gradio: "https://huggingface.co/spaces",
    },
  },
  {
    id: 3,
    title: "Task Management Application",
    description:
      "Collaborative task management tool with real-time synchronization, user authentication, and team workspace features.",
    category: "Full-Stack",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io"],
    image: "✓",
    highlights: ["Real-time Collaboration", "User Auth", "Responsive Design"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
  },
  {
    id: 4,
    title: "House Price Prediction",
    description:
      "Advanced regression model for predicting house prices using feature engineering and ensemble methods. Includes comprehensive data analysis and model evaluation.",
    category: "Machine Learning",
    technologies: [
      "Python",
      "XGBoost",
      "Feature Engineering",
      "Matplotlib",
      "Kaggle",
    ],
    image: "🏠",
    highlights: ["Ensemble Methods", "Data Analysis", "Kaggle Deployment"],
    links: {
      kaggle: "https://kaggle.com",
      gradio: "https://huggingface.co/spaces",
    },
  },
  {
    id: 5,
    title: "Content Management System",
    description:
      "Scalable CMS built with modern web technologies, featuring a powerful admin panel, SEO optimization, and multi-language support.",
    category: "Full-Stack",
    technologies: ["Next.js", "PostgreSQL", "FastAPI", "TypeScript", "Redis"],
    image: "📝",
    highlights: ["SEO Optimized", "Multi-language", "Admin Panel"],
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
  },
  {
    id: 6,
    title: "Image Classification Model",
    description:
      "Deep learning model for image classification using CNN architecture. Trained on custom dataset with data augmentation and deployed with Gradio interface.",
    category: "Machine Learning",
    technologies: ["Python", "TensorFlow", "CNN", "Gradio", "NumPy"],
    image: "🖼️",
    highlights: ["Deep Learning", "Data Augmentation", "Interactive UI"],
    links: {
      kaggle: "https://kaggle.com",
      gradio: "https://huggingface.co/spaces",
    },
  },
];

const categories = ["All", "Full-Stack", "Machine Learning"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

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
            My <span className="text-accent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 mx-auto sm:mx-0"></div>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto sm:mx-0">
            A collection of full-stack applications and machine learning models
            showcasing my expertise in building scalable solutions and
            intelligent systems.
          </p>
        </Stagger>

        {/* Category Filter */}
        <Stagger variant="pop" step={70} className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12 justify-center sm:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-brand text-white shadow-lg shadow-[0_0_25px_var(--brand-glow)]"
                  : "border border-border text-muted hover:border-brand hover:text-brand-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </Stagger>

        {/* Projects Grid */}
        <Stagger
          variant="pop"
          step={90}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative h-full flex flex-col rounded-2xl border border-border bg-card hover:border-brand transition-all duration-300 overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Project Header with Icon */}
              <div className="p-5 sm:p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl sm:text-5xl">{project.image}</div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border flex items-center gap-1 ${getCategoryColor(project.category)}`}
                  >
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-brand-tint text-brand-ink border border-brand-edge"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="px-5 sm:px-6 pb-4 mt-auto">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4 border-t border-border">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-surface text-muted border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="px-5 sm:px-6 py-4 border-t border-border flex gap-2 sm:gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-surface text-muted hover:bg-brand hover:text-white transition-all duration-300 font-semibold text-xs sm:text-sm"
                  >
                    <Github size={14} className="sm:w-4 sm:h-4" />
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-strong transition-all duration-300 font-semibold text-xs sm:text-sm"
                  >
                    <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                    Live
                  </a>
                )}
                {project.links.kaggle && (
                  <a
                    href={project.links.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-surface text-muted hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold text-xs sm:text-sm"
                  >
                    <Database size={14} className="sm:w-4 sm:h-4" />
                    Kaggle
                  </a>
                )}
                {project.links.gradio && (
                  <a
                    href={project.links.gradio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-strong transition-all duration-300 font-semibold text-xs sm:text-sm"
                  >
                    <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
