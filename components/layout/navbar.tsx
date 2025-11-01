"use client";

import React, { useState } from "react";
import { Download, ChevronDown, MessageSquare } from "lucide-react";

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
        <div className="absolute top-full mt-2 w-max rounded-lg bg-gray-800 p-2 text-xs text-white shadow-lg transition-opacity duration-300 z-50">
          {content}
        </div>
      )}
    </div>
  );
};

// --- Main Navigation Component ---

const Navbar = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md shadow-lg transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* LEFT: Logo/Brand Name */}
        <div className="flex-shrink-0">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-white"
          >
            Rifayet.dev
          </a>
        </div>

        {/* MIDDLE: Navigation Items with Glow Effect */}
        <div className="hidden md:flex flex-grow justify-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white hover:text-white transition-all duration-300 py-2 px-4 rounded-lg relative group"
              style={{
                transition: "all 0.3s ease",
              }}
            >
              <span className="relative z-10">{item.name}</span>

              {/* Bright glow effect on hover */}
              <span
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(99, 102, 241, 0.1)",
                  boxShadow:
                    "0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99, 102, 241, 0.3), inset 0 0 10px rgba(99, 102, 241, 0.2)",
                }}
              ></span>

              {/* Bottom indicator line */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </div>

        {/* RIGHT: Actions (Contact & Download CV) */}
        <div className="flex items-center space-x-4">
          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full text-white border border-gray-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-200"
            style={{
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(99, 102, 241, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <MessageSquare size={16} />
            Contact
          </a>

          {/* Download CV Icon with Tooltip and Glow */}
          <Tooltip content="Download CV (PDF)">
            <button
              onClick={() => console.log("CV Download initiated")}
              className="p-3 bg-white text-black rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Download Curriculum Vitae"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(99, 102, 241, 0.8), 0 0 50px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Download size={20} />
            </button>
          </Tooltip>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
