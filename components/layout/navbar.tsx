"use client";

import React, { useState } from "react";
import { Download, Menu, X, MessageSquare } from "lucide-react";
import Image from "next/image";

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
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
  ];

  return (
    <header className="fixed top-0 bg-black/90 left-0 right-0 z-50 backdrop-blur-md shadow-lg transition-colors duration-300">
      {/* 
          Added 'px-4 sm:px-6 lg:px-8' to the outer nav container 
          to match the alignment of the other sections (Banner, About, etc.)
      */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* LEFT: Logo/Brand Name */}
        <div className="flex-shrink-0">
          <a href="#home" className="flex items-center">
            <Image
              src="/logo/logo-light.svg"
              alt="Rifayet.dev Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </a>
        </div>

        {/* MIDDLE: Navigation Items (Desktop) */}
        <div className="hidden md:flex flex-grow justify-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white hover:text-white transition-all duration-300 py-2 px-4 rounded-lg relative group"
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

        {/* RIGHT: Actions */}
        <div className="flex items-center space-x-4">
          {/* Contact Button (Desktop) */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full text-white border border-gray-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-200"
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

          {/* Download CV Icon */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (Slide Down) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/95 border-t border-gray-800 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-all"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-800">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
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
