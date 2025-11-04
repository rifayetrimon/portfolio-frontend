"use client";

import Banner from "@/components/home/Banner";
import Navbar from "@/components/layout/navbar";
import About from "@/components/home/About";

export default function HomePage() {
  return (
    <>
      {/* Fixed Navbar - Only once */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        {/* Hero Section with Banner */}
        <section
          id="home"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <Banner />
        </section>

        {/* about me section */}
        <section
          id="about"
          className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center sm:min-h-[calc(100vh-4rem)]"
        >
          <About />
        </section>

        {/* Content wrapper with responsive padding */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Projects Section */}
          <section
            id="projects"
            className="min-h-screen py-12 sm:py-16 md:py-20"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl">
              Projects
            </h2>

            {/* Responsive grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {/* Project cards */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                  Project 1
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  Project description goes here
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                  Project 2
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  Project description goes here
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                  Project 3
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  Project description goes here
                </p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="min-h-screen py-12 sm:py-16 md:py-20">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl">
              Skills
            </h2>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:gap-6">
              {[
                "React",
                "TypeScript",
                "Next.js",
                "Tailwind CSS",
                "Node.js",
                "MongoDB",
                "Git",
                "Docker",
              ].map((skill) => (
                <div
                  key={skill}
                  className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center shadow-sm sm:p-4"
                >
                  <span className="text-sm font-medium text-gray-700 sm:text-base">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="min-h-screen py-12 sm:py-16 md:py-20"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl">
              Experience
            </h2>

            {/* Timeline */}
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  title: "Senior Developer",
                  company: "Tech Corp",
                  period: "2022 - Present",
                },
                {
                  title: "Full Stack Developer",
                  company: "Startup Inc",
                  period: "2020 - 2022",
                },
                {
                  title: "Junior Developer",
                  company: "Dev Agency",
                  period: "2018 - 2020",
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
                >
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 sm:text-xl">
                    {job.title}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-gray-600 sm:text-base">
                    {job.company}
                  </p>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {job.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="min-h-screen py-12 sm:py-16 md:py-20"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl md:text-4xl">
              Contact
            </h2>

            {/* Contact form */}
            <div className="mx-auto max-w-2xl">
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:px-6 sm:py-3 sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
