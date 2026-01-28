"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import {
    Code2,
    Database,
    Brain,
    Zap,
    Layers,
} from "lucide-react";

// ==================== TYPE DEFINITIONS ====================

/**
 * Represents a single skill with its name and proficiency level
 */
interface Skill {
    name: string;
    level: number; // 0-100
}

/**
 * Represents a color scheme for skill categories
 */
interface ColorScheme {
    bg: string;
    border: string;
    icon: string;
    accent: string;
}

/**
 * Represents a color palette mapping
 */
interface ColorPalette {
    [key: string]: ColorScheme;
}

/**
 * Represents a skill category with its icon and skills
 */
interface SkillCategory {
    category: string;
    icon: LucideIcon;
    color: ColorKey;
    skills: Skill[];
}

/**
 * Type for valid color keys
 */
type ColorKey = "indigo" | "purple" | "pink" | "cyan";

/**
 * Represents a summary statistic
 */
interface SkillStat {
    label: string;
    value: string;
    icon: LucideIcon;
    color: ColorKey;
}

/**
 * Represents a proficiency level in the legend
 */
interface ProficiencyLevel {
    range: string;
    label: string;
    color: string;
}

/**
 * Props for SkillBar component
 */
interface SkillBarProps {
    name: string;
    level: number;
}

/**
 * Props for SkillCategory component
 */
interface SkillCategoryProps {
    category: string;
    icon: LucideIcon;
    color: ColorKey;
    skills: Skill[];
}

// ==================== DATA ====================

/**
 * Color schemes for different skill categories
 */
const COLOR_SCHEMES: Record<ColorKey, ColorScheme> = {
    indigo: {
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/30",
        icon: "text-indigo-400",
        accent: "from-indigo-500 to-indigo-600",
    },
    purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        icon: "text-purple-400",
        accent: "from-purple-500 to-purple-600",
    },
    pink: {
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        icon: "text-pink-400",
        accent: "from-pink-500 to-pink-600",
    },
    cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        icon: "text-cyan-400",
        accent: "from-cyan-500 to-cyan-600",
    },
};

/**
 * Gradient color mappings for stats
 */
const COLOR_MAP: Record<ColorKey, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    cyan: "from-cyan-500 to-cyan-600",
};

/**
 * Skills data organized by category
 */
const SKILLS_DATA: SkillCategory[] = [
    {
        category: "Frontend Development",
        icon: Code2,
        color: "indigo",
        skills: [
            { name: "Next.js", level: 95 },
            { name: "React", level: 94 },
            { name: "TypeScript", level: 92 },
            { name: "Tailwind CSS", level: 96 },
            { name: "JavaScript", level: 95 },
            { name: "HTML/CSS", level: 98 },
        ],
    },
    {
        category: "Backend Development",
        icon: Database,
        color: "purple",
        skills: [
            { name: "Python", level: 93 },
            { name: "FastAPI", level: 91 },
            { name: "PostgreSQL", level: 89 },
            { name: "Node.js", level: 87 },
            { name: "REST APIs", level: 94 },
            { name: "Database Design", level: 90 },
        ],
    },
    {
        category: "Machine Learning",
        icon: Brain,
        color: "pink",
        skills: [
            { name: "Feature Engineering", level: 92 },
            { name: "Model Development", level: 90 },
            { name: "Scikit-learn", level: 91 },
            { name: "TensorFlow", level: 85 },
            { name: "Data Analysis", level: 93 },
            { name: "Gradio", level: 88 },
        ],
    },
    {
        category: "Tools & Technologies",
        icon: Zap,
        color: "cyan",
        skills: [
            { name: "Git & GitHub", level: 94 },
            { name: "Docker", level: 82 },
            { name: "Kaggle", level: 89 },
            { name: "VS Code", level: 96 },
            { name: "Linux", level: 85 },
            { name: "Pandas & NumPy", level: 92 },
        ],
    },
];

/**
 * Skills summary statistics
 */
const SKILLS_STATS: SkillStat[] = [
    {
        label: "Languages",
        value: "6+",
        icon: Code2,
        color: "indigo",
    },
    {
        label: "Frameworks",
        value: "8+",
        icon: Layers,
        color: "purple",
    },
    {
        label: "Databases",
        value: "3+",
        icon: Database,
        color: "pink",
    },
    {
        label: "Tools",
        value: "10+",
        icon: Zap,
        color: "cyan",
    },
];

/**
 * Proficiency levels for the legend
 */
const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
    { range: "90-100%", label: "Expert", color: "from-green-500 to-emerald-500" },
    { range: "80-89%", label: "Advanced", color: "from-blue-500 to-cyan-500" },
    { range: "70-79%", label: "Intermediate", color: "from-yellow-500 to-orange-500" },
    { range: "60-69%", label: "Beginner", color: "from-red-500 to-pink-500" },
];

// ==================== COMPONENTS ====================

/**
 * SkillBar Component
 * Displays a single skill with a progress bar
 */
const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-xs text-gray-500">{level}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${level}%` }}
                ></div>
            </div>
        </div>
    );
};

/**
 * SkillCategory Component
 * Displays a category of skills with its icon and color scheme
 */
const SkillCategory: React.FC<SkillCategoryProps> = ({
    category,
    icon: Icon,
    color,
    skills,
}) => {
    const colors = COLOR_SCHEMES[color];

    return (
        <div
            className={`p-6 rounded-2xl border ${colors.bg} ${colors.border} backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 group`}
            style={{
                boxShadow: `0 0 20px rgba(99, 102, 241, 0), inset 0 0 20px rgba(99, 102, 241, 0)`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px rgba(99, 102, 241, 0.15), inset 0 0 30px rgba(99, 102, 241, 0.05)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px rgba(99, 102, 241, 0), inset 0 0 20px rgba(99, 102, 241, 0)`;
            }}
        >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.accent} bg-opacity-20`}>
                    <Icon size={24} className={colors.icon} />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {category}
                </h3>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
                {skills.map((skill, idx) => (
                    <SkillBar key={idx} name={skill.name} level={skill.level} />
                ))}
            </div>
        </div>
    );
};

/**
 * SkillStatCard Component
 * Displays a summary statistic card
 */
const SkillStatCard: React.FC<{ stat: SkillStat }> = ({ stat }) => {
    const Icon = stat.icon;
    const gradientColor = COLOR_MAP[stat.color];

    return (
        <div className="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 text-center group">
            <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${gradientColor} mb-4 group-hover:scale-110 transition-transform`}
            >
                <Icon size={24} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
        </div>
    );
};

/**
 * ProficiencyLevelItem Component
 * Displays a single proficiency level in the legend
 */
const ProficiencyLevelItem: React.FC<{ level: ProficiencyLevel }> = ({ level }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${level.color}`}></div>
            <div>
                <p className="text-sm font-semibold text-white">{level.label}</p>
                <p className="text-xs text-gray-400">{level.range}</p>
            </div>
        </div>
    );
};

// ==================== MAIN COMPONENT ====================

/**
 * Skills Section Component
 * Main component that displays all skills, statistics, and proficiency legend
 */
const Skills: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        My <span className="text-indigo-500">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        A comprehensive overview of my technical expertise across frontend, backend, machine learning, and development tools. Each skill is rated based on my proficiency and hands-on experience.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {SKILLS_DATA.map((skillCategory, idx) => (
                        <SkillCategory
                            key={idx}
                            category={skillCategory.category}
                            icon={skillCategory.icon}
                            color={skillCategory.color}
                            skills={skillCategory.skills}
                        />
                    ))}
                </div>

                {/* Skills Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {SKILLS_STATS.map((stat, idx) => (
                        <SkillStatCard key={idx} stat={stat} />
                    ))}
                </div>

                {/* Proficiency Legend */}
                <div className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/30">
                    <h3 className="text-xl font-bold text-white mb-6">Proficiency Scale</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {PROFICIENCY_LEVELS.map((level, idx) => (
                            <ProficiencyLevelItem key={idx} level={level} />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">Want to see these skills in action?</p>
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/50"
                    >
                        Explore My Projects
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Skills;
