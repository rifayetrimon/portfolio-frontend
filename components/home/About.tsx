import { Code2, Briefcase, Award, type LucideIcon } from "lucide-react";
import Reveal, { Stagger } from "@/components/ui/Reveal";
import { CAREER_START, CODING_SINCE, yearsSince } from "@/lib/site";

// ==================== TYPES ====================

type Tone = "brand" | "violet" | "rose";

interface Capability {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  description: string;
}

interface StackGroup {
  label: string;
  tone: Tone;
  items: string[];
}

interface Milestone {
  label: string;
  value: string;
  tone: Tone;
}

// ==================== TONE MAP ====================

// Whole class strings so Tailwind can see them when it scans the source.
const TONE: Record<Tone, { tint: string; edge: string; ink: string }> = {
  brand: { tint: "bg-brand-tint", edge: "border-brand-edge", ink: "text-accent" },
  violet: { tint: "bg-violet-tint", edge: "border-violet-edge", ink: "text-violet-ink" },
  rose: { tint: "bg-rose-tint", edge: "border-rose-edge", ink: "text-rose-ink" },
};

// ==================== DATA ====================

const CAPABILITIES: Capability[] = [
  {
    icon: Code2,
    tone: "brand",
    title: "Full-Stack Development",
    description:
      "Building modern web applications with Next.js, TypeScript, and PostgreSQL. I focus on creating responsive, performant interfaces paired with robust backend systems.",
  },
  {
    icon: Award,
    tone: "violet",
    title: "Machine Learning & AI",
    description:
      "Developing and deploying ML models with expertise in feature engineering, model creation, and optimization. I've deployed several models on Kaggle using Gradio for interactive demonstrations.",
  },
  {
    icon: Briefcase,
    tone: "brand",
    title: "End-to-End Solutions",
    description:
      "From concept to deployment, I deliver complete solutions combining frontend excellence, backend reliability, and intelligent ML features to solve complex business challenges.",
  },
];

const STACK: StackGroup[] = [
  { label: "Frontend", tone: "brand", items: ["Next.js", "TypeScript", "React"] },
  { label: "Backend", tone: "violet", items: ["Python", "FastAPI", "PostgreSQL"] },
  { label: "ML & Data", tone: "rose", items: ["Machine Learning", "Gradio", "Deep Learning"] },
];

// ==================== PIECES ====================

const CapabilityCard: React.FC<{ item: Capability }> = ({ item }) => {
  const { icon: Icon, tone, title, description } = item;
  const t = TONE[tone];

  return (
    <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-brand sm:p-6">
      <div
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${t.tint} ${t.edge}`}
      >
        <Icon size={20} className={t.ink} />
      </div>
      <div className="min-w-0">
        <h4 className="mb-1 font-semibold text-foreground">{title}</h4>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const MilestoneRow: React.FC<{ item: Milestone }> = ({ item }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-0 last:pb-0">
    <span className="text-xs uppercase tracking-wider text-muted">
      {item.label}
    </span>
    <span className={`text-lg font-bold sm:text-xl ${TONE[item.tone].ink}`}>
      {item.value}
    </span>
  </div>
);

// ==================== SECTION ====================

export default function AboutSection() {
  // Derived rather than hardcoded: the two places that stated this previously
  // disagreed with each other ("2.5 Years +" here vs "1+" in the Experience
  // section) and both had gone stale against the start date quoted on the page.
  const years = yearsSince(CAREER_START);

  const milestones: Milestone[] = [
    { label: "Writing code since", value: String(CODING_SINCE), tone: "brand" },
    { label: "Professional since", value: "Sep 2023", tone: "violet" },
    { label: "Experience", value: `${years}+ years`, tone: "rose" },
  ];

  return (
    <section className="flex w-full items-center py-12 sm:py-20">
      {/*
          Container is set to 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          to match the Navbar exactly. This ensures left and right
          alignment is consistent across all sections.
      */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-16 sm:text-left">
          <Reveal as="h2" className="mb-4 text-3xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            About <span className="text-accent">Me</span>
          </Reveal>
          <Reveal
            variant="rule"
            delay={180}
            className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 sm:mx-0"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Left: narrative + what I do */}
          <div className="space-y-8 lg:col-span-2">
            <Stagger variant="up" className="space-y-4">
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                I&apos;m a passionate software developer with a strong
                foundation in full-stack web development and machine learning.
                My journey into programming began in{" "}
                <span className="font-semibold text-accent">{CODING_SINCE}</span>
                , driven by curiosity and a desire to solve real-world problems
                through elegant code.
              </p>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                Since{" "}
                <span className="font-semibold text-accent">September 2023</span>
                , I&apos;ve been working as a professional developer at my
                current organization, where I continue to grow my expertise and
                contribute to meaningful projects. I specialize in building
                scalable web applications and implementing machine learning
                solutions that create tangible value.
              </p>
            </Stagger>

            <div className="space-y-4">
              <Reveal>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  What I Do
                </h3>
              </Reveal>
              <Stagger variant="left" step={110} className="space-y-4">
                {CAPABILITIES.map((item) => (
                  <CapabilityCard key={item.title} item={item} />
                ))}
              </Stagger>
            </div>
          </div>

          {/* Right: stack + milestones */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
            <Reveal variant="right" delay={120} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-5 text-lg font-bold text-foreground sm:text-xl">
                  Tech Stack
                </h3>
                <div className="space-y-4">
                  {STACK.map((group) => (
                    <div key={group.label}>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full border px-3 py-1 text-xs font-medium sm:text-sm ${TONE[group.tone].tint} ${TONE[group.tone].edge} ${TONE[group.tone].ink}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={260} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-3 text-lg font-bold text-foreground sm:text-xl">
                  Journey
                </h3>
                <div>
                  {milestones.map((item) => (
                    <MilestoneRow key={item.label} item={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
