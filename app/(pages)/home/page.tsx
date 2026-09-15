"use client";

import Banner from "@/components/home/Banner";
import Navbar from "@/components/layout/navbar";
import About from "@/components/home/About";
import Projects from "@/components/home/Porjets";
import Skills from "@/components/home/Skill";
import Experience from "@/components/home/Experience";
import Contact from "@/components/home/Contact";
import WhatsAppWidget from "@/components/home/WhatsAppWidget";
import AICallWidget from "@/components/home/AICallWidget";

// On phones the sections size to their content — forcing a viewport height there
// only padded short sections with dead space. From `sm` up they fill the screen
// again, measured in `svh` so the layout doesn't jump as mobile browser chrome
// collapses on scroll (plain `vh` did).
const SECTION =
  "flex items-center justify-center sm:min-h-[calc(100svh-4rem)]";

// The floating chat/call buttons overlap the bottom of the last section.
const LAST_SECTION = `${SECTION} pb-28 sm:pb-20`;

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section id="home" className={SECTION}>
          <Banner />
        </section>

        <section id="about" className={SECTION}>
          <About />
        </section>

        <section id="projects" className={SECTION}>
          <Projects />
        </section>

        <section id="skills" className={SECTION}>
          <Skills />
        </section>

        <section id="experience" className={SECTION}>
          <Experience />
        </section>

        <section id="contact" className={LAST_SECTION}>
          <Contact />
        </section>
      </main>

      <WhatsAppWidget />
      <AICallWidget />
    </>
  );
}
