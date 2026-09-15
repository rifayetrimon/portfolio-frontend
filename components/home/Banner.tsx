"use client";

import Image from "next/image";
import { Download, ArrowRight, ChevronDown } from "lucide-react";
import { RESUME } from "@/lib/site";
import Reveal, { Stagger } from "@/components/ui/Reveal";

export default function Banner() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // 4rem = 64px
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="flex w-full items-center pb-28 pt-20 sm:pb-20 sm:pt-28 lg:py-20">
      {/*
          Standardized container 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          to match the Navbar exactly.
          pt-24 on mobile ensures the content starts below the fixed Navbar.
      */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: Stack items (flex-col-reverse), Desktop: Grid */}
        <div className="flex flex-col-reverse items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
          {/* LEFT COLUMN - Text Content */}
          <Stagger variant="up" step={110} className="space-y-5 text-center sm:space-y-6 lg:text-left">
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-base font-medium text-accent sm:text-lg">
                Hi there! 👋
              </p>
              <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                This is <span className="text-accent">Rifayet</span>
              </h1>
              <h2 className="text-xl font-semibold text-muted sm:text-3xl lg:text-4xl">
                Software Developer
              </h2>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-xl text-base text-muted sm:text-lg lg:mx-0">
              Passionate about creating elegant solutions and building amazing
              web experiences. Specializing in modern web technologies and
              user-centric design.
            </p>

            {/* Buttons */}
            <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row sm:gap-4 lg:justify-start">
              <button
                onClick={() => handleScrollTo("projects")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-strong hover:shadow-[0_0_25px_var(--brand-glow)] sm:hover:scale-105"
              >
                View Projects
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <a
                href={RESUME.href}
                download={RESUME.downloadName}
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 text-base font-semibold text-foreground transition-all duration-300 hover:border-brand hover:bg-brand-tint hover:shadow-[0_0_20px_var(--brand-glow)]"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>
          </Stagger>

          {/* RIGHT COLUMN - Image with Oval Background */}
          <Reveal variant="blur" delay={120} duration={1100} className="mb-4 flex w-full justify-center sm:mb-8 lg:mb-0 lg:justify-end">
            <div className="relative">
              {/* Glowing Oval Background */}
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-3xl dark:opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, var(--brand-glow) 0%, var(--violet-edge) 50%, transparent 70%)",
                  transform: "scale(1.1)",
                }}
              ></div>

              {/* Oval Border Container */}
              <div className="relative h-60 w-48 overflow-hidden rounded-full border-2 border-brand-edge bg-brand-tint shadow-[0_0_60px_var(--brand-glow)] sm:h-[28rem] sm:w-80 lg:h-[32rem] lg:w-96">
                {/* Profile Image */}
                <Image
                  src="/banner/banner-img-black.png"
                  alt="Rifayet - Software Developer"
                  fill
                  // Without sizes, Next ships the full-width source to phones.
                  sizes="(max-width: 640px) 12rem, (max-width: 1024px) 20rem, 24rem"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -right-4 -top-4 h-16 w-16 animate-pulse rounded-full bg-brand-tint blur-2xl sm:h-24 sm:w-24"></div>
              <div
                className="absolute -bottom-4 -left-4 h-20 w-20 animate-pulse rounded-full bg-violet-tint blur-2xl sm:h-32 sm:w-32"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue — hidden once there's no room for it on short screens. */}
        <Reveal delay={600} className="mt-10 hidden justify-center lg:flex">
          <button
            onClick={() => handleScrollTo("about")}
            className="group flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
            aria-label="Scroll to the About section"
          >
            Scroll
            <ChevronDown size={18} className="animate-scroll-cue" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
