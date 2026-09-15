"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Menu, X, MessageSquare } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Logo from "@/components/layout/Logo";
import { RESUME } from "@/lib/site";

// --- Internal Tooltip Component ---
interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        // Anchored to the right edge so it can't run off-screen on narrow viewports.
        <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 hidden w-max rounded-lg bg-foreground px-2 py-1.5 text-xs text-background shadow-lg sm:block">
          {content}
        </div>
      )}
    </div>
  );
};

// --- Main Navigation Component ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
  ];

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Close the mobile menu when the viewport grows past the md breakpoint,
  // otherwise the body scroll lock survives into the desktop layout.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 64; // 4rem = 64px
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-header shadow-sm backdrop-blur-md transition-colors duration-300">
      {/*
          Added 'px-4 sm:px-6 lg:px-8' to the outer nav container
          to match the alignment of the other sections (Banner, About, etc.)
      */}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: Logo/Brand Name */}
        <div className="flex-shrink-0">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center"
            aria-label="Rifayet.dev \u2014 back to top"
          >
            {/* Light: logo-plain.svg's paths, inlined and painted black. */}
            <Logo className="h-7 w-auto text-black sm:h-8 dark:hidden" />
            {/* Dark: the original asset, whose baked-in glow is the intended look
                there. Its viewBox carries 22px of shadow padding around the same
                402.68x70.2 art, so it needs a taller box to render at the same
                visual size as the inline mark (28px art -> 39.2px, 32 -> 44.8). */}
            <Image
              src="/logo/logo-light.svg"
              alt=""
              aria-hidden="true"
              width={451}
              height={119}
              className="hidden h-[2.45rem] w-auto sm:h-[2.8rem] dark:block"
              priority
            />
          </a>
        </div>

        {/* MIDDLE: Navigation Items (Desktop) */}
        <div className="hidden flex-grow justify-center space-x-6 md:flex lg:space-x-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted transition-all duration-300 hover:text-foreground lg:px-4"
            >
              <span className="relative z-10">{item.name}</span>

              {/* Bright glow effect on hover */}
              <span className="absolute inset-0 rounded-lg bg-brand-tint opacity-0 shadow-[0_0_20px_var(--brand-glow)] transition-opacity duration-300 group-hover:opacity-100"></span>

              {/* Bottom indicator line */}
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          ))}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contact Button (Desktop) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:border-brand hover:bg-brand-tint hover:shadow-[0_0_15px_var(--brand-glow)] lg:inline-flex"
          >
            <MessageSquare size={16} />
            Contact
          </a>

          <ThemeToggle />

          {/* Download CV Icon */}
          <Tooltip content="Download CV (PDF)">
            <a
              href={RESUME.href}
              download={RESUME.downloadName}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-all duration-300 hover:bg-brand-strong hover:shadow-[0_0_25px_var(--brand-glow)] active:scale-95"
              aria-label="Download CV (PDF)"
            >
              <Download size={18} />
            </a>
          </Tooltip>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:text-accent md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (Slide Down) */}
      <div
        id="mobile-menu"
        // `invisible` when closed keeps the links out of the tab order; max-h alone
        // left them focusable behind a zero-height container.
        className={`overflow-hidden border-t border-border bg-background transition-[max-height,opacity,visibility] duration-300 ease-in-out md:hidden ${
          isOpen
            ? "visible max-h-[80vh] overflow-y-auto opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              tabIndex={isOpen ? undefined : -1}
              className="block rounded-lg px-4 py-3 text-base font-medium text-muted transition-all hover:bg-brand-tint hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
          <div className="border-t border-border pt-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              tabIndex={isOpen ? undefined : -1}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-base font-semibold text-white transition-all hover:bg-brand-strong"
            >
              <MessageSquare size={18} />
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
