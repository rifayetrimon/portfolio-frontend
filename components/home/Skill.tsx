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

interface Skill {
    name: string;
    level: number; // 0-100
}

interface ColorScheme {
    bg: string;
    border: string;
    icon: string;
    accent: string;
}

interface SkillCategory {
    category: string;
    icon: LucideIcon;
    color: ColorKey;
    skills: Skill[];
}

type ColorKey = "indigo" | "purple" | "pink" | "cyan";

interface SkillStat {
    label: string;
    value: string;
    icon: LucideIcon;
    color: ColorKey;
}

interface ProficiencyLevel {
    range: string;
    label: string;
    color: string;
}

interface SkillBarProps {
    name: string;
    level: number;
}

interface SkillCategoryProps {
    category: string;
    icon: LucideIcon;
    color: ColorKey;
    skills: Skill[];
}

// ==================== DATA ====================

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

const COLOR_MAP: Record<ColorKey, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    cyan: "from-cyan-500 to-cyan-600",
};

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

const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
    { range: "90-100%", label: "Expert", color: "from-green-500 to-emerald-500" },
    { range: "80-89%", label: "Advanced", color: "from-blue-500 to-cyan-500" },
    { range: "70-79%", label: "Intermediate", color: "from-yellow-500 to-orange-500" },
    { range: "60-69%", label: "Beginner", color: "from-red-500 to-pink-500" },
];

// ==================== COMPONENTS ====================

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
    return (
        <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-300">{name}</span>
                <span className="text-[10px] sm:text-xs text-gray-500">{level}%</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${level}%` }}
                ></div>
            </div>
        </div>
    );
};

const SkillCategory: React.FC<SkillCategoryProps> = ({
    category,
    icon: Icon,
    color,
    skills,
}) => {
    const colors = COLOR_SCHEMES[color];

    return (
        <div
            className={`p-5 sm:p-6 rounded-2xl border ${colors.bg} ${colors.border} backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 group`}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px rgba(99, 102, 241, 0.15), inset 0 0 30px rgba(99, 102, 241, 0.05)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `none`;
            }}
        >
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${colors.accent} bg-opacity-20`}>
                    <Icon size={20} className={`${colors.icon} sm:w-6 sm:h-6`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {category}
                </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
                {skills.map((skill, idx) => (
                    <SkillBar key={idx} name={skill.name} level={skill.level} />
                ))}
            </div>
        </div>
    );
};

const SkillStatCard: React.FC<{ stat: SkillStat }> = ({ stat }) => {
    const Icon = stat.icon;
    const gradientColor = COLOR_MAP[stat.color];

    return (
        <div className="p-4 sm:p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30 hover:border-indigo-500/50 transition-all duration-300 text-center group">
            <div
                className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${gradientColor} mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
            >
                <Icon size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</p>
            <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
        </div>
    );
};

const ProficiencyLevelItem: React.FC<{ level: ProficiencyLevel }> = ({ level }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r ${level.color} flex-shrink-0`}></div>
            <div>
                <p className="text-xs sm:text-sm font-semibold text-white">{level.label}</p>
                <p className="text-[10px] sm:text-xs text-gray-400">{level.range}</p>
            </div>
        </div>
    );
};

// ==================== MAIN COMPONENT ====================

const Skills: React.FC = () => {
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
                        My <span className="text-indigo-500">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6 mx-auto sm:mx-0"></div>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto sm:mx-0">
                        A comprehensive overview of my technical expertise across frontend, backend, machine learning, and development tools. Each skill is rated based on my proficiency and hands-on experience.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
                    {SKILLS_STATS.map((stat, idx) => (
                        <SkillStatCard key={idx} stat={stat} />
                    ))}
                </div>

                {/* Proficiency Legend */}
                <div className="p-6 sm:p-8 rounded-2xl border border-gray-700/50 bg-gray-900/30">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center sm:text-left">Proficiency Scale</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {PROFICIENCY_LEVELS.map((level, idx) => (
                            <ProficiencyLevelItem key={idx} level={level} />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 sm:mt-16 text-center">
                    <p className="text-sm sm:text-base text-gray-400 mb-6">Want to see these skills in action?</p>
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/50 text-sm sm:text-base"
                    >
                        Explore My Projects
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
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
