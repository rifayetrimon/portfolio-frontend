import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile: Stack items (flex-col-reverse), Desktop: Grid */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-indigo-600 font-medium">
                Hi there! 👋
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                This is <span className="text-indigo-500">Rifayet</span>
              </h1>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-gray-300">
                Software Developer
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
              Passionate about creating elegant solutions and building amazing
              web experiences. Specializing in modern web technologies and
              user-centric design.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <button className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50">
                View Projects
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-full border-2 border-gray-700 text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(99, 102, 241, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Download size={20} />
                Download CV
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Image with Oval Background */}
          <div className="flex justify-center lg:justify-end w-full mb-8 lg:mb-0">
            <div className="relative">
              {/* Glowing Oval Background */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)",
                  transform: "scale(1.1)",
                }}
              ></div>

              {/* Oval Border Container */}
              {/* Responsive sizes: Mobile(w-56 h-72), Tablet(w-80 h-[28rem]), Desktop(w-96 h-[32rem]) */}
              <div
                className="relative w-56 h-72 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem] rounded-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
                  border: "2px solid rgba(99, 102, 241, 0.15)",
                  boxShadow:
                    "0 0 60px rgba(99, 102, 241, 0.15), inset 0 0 60px rgba(99, 102, 241, 0.05)",
                }}
              >
                {/* Profile Image */}
                <Image
                  src="/banner/banner-img-black.png"
                  alt="Rifayet - Software Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-indigo-500/20 blur-2xl animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-purple-500/20 blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
