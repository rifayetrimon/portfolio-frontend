import { Code2, Briefcase, Award } from "lucide-react";

export default function AboutSection() {
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
            About <span className="text-indigo-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto sm:mx-0"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Journey & Introduction */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-6">
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I'm a passionate software developer with a strong foundation in full-stack web development and machine learning. My journey into programming began in <span className="text-indigo-400 font-semibold">2020</span>, driven by curiosity and a desire to solve real-world problems through elegant code.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Since <span className="text-indigo-400 font-semibold">September 2023</span>, I've been working as a professional developer at my current organization, where I continue to grow my expertise and contribute to meaningful projects. I specialize in building scalable web applications and implementing machine learning solutions that create tangible value.
              </p>
            </div>

            {/* Professional Highlights */}
            <div className="space-y-6 sm:space-y-4 pt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">What I Do</h3>
              <div className="space-y-5 sm:space-y-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-500/20 border border-indigo-500/40">
                      <Code2 size={20} className="text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Full-Stack Development</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Building modern web applications with Next.js, TypeScript, and PostgreSQL. I focus on creating responsive, performant interfaces paired with robust backend systems.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500/20 border border-purple-500/40">
                      <Award size={20} className="text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Machine Learning & AI</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Developing and deploying ML models with expertise in feature engineering, model creation, and optimization. I've deployed several models on Kaggle using Gradio for interactive demonstrations.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-500/20 border border-indigo-500/40">
                      <Briefcase size={20} className="text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">End-to-End Solutions</h4>
                    <p className="text-gray-400 text-sm sm:text-base">From concept to deployment, I deliver complete solutions combining frontend excellence, backend reliability, and intelligent ML features to solve complex business challenges.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Skills Card */}
            <div
              className="p-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.02] backdrop-blur-sm h-full lg:h-auto"
              style={{
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.05), inset 0 0 20px rgba(99, 102, 241, 0.02)",
              }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Tech Stack</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium border border-indigo-500/30">
                      Next.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium border border-indigo-500/30">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium border border-indigo-500/30">
                      React
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium border border-purple-500/30">
                      Python
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium border border-purple-500/30">
                      FastAPI
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium border border-purple-500/30">
                      PostgreSQL
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">ML & Data</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium border border-pink-500/30">
                      Machine Learning
                    </span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs sm:text-sm font-medium border border-pink-500/30">
                      Gradio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div
              className="p-6 rounded-2xl border border-purple-500/10 bg-purple-500/[0.02] backdrop-blur-sm h-full lg:h-auto"
              style={{
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.05), inset 0 0 20px rgba(139, 92, 246, 0.02)",
              }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Journey</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-l-2 border-indigo-500 pl-4">
                  <p className="text-xs text-gray-400">Programming Started</p>
                  <p className="text-xl sm:text-2xl font-bold text-indigo-400">2020</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <p className="text-xs text-gray-400">Professional Role</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-400">Sep 2023</p>
                </div>
                <div className="border-l-2 border-pink-500 pl-4">
                  <p className="text-xs text-gray-400">Experience</p>
                  <p className="text-xl sm:text-2xl font-bold text-pink-400">2.5 Years +</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
