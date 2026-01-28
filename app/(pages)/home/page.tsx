"use client";

import Banner from "@/components/home/Banner";
import Navbar from "@/components/layout/navbar";
import About from "@/components/home/About";
import Projects from "@/components/home/Porjets";
import Skills from "@/components/home/Skill";
import Experience from "@/components/home/Experience";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section
          id="home"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <Banner />
        </section>

        <section
          id="about"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <About />
        </section>

        <section
          id="projects"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <Projects />
        </section>

        <section
          id="skills"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <Skills />
        </section>

        <section
          id="experience"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <Experience />
        </section>

        <section
          id="contact"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <Contact />
        </section>

      </main>
    </>
  );
}
