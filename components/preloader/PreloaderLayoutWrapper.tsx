"use client";

import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

/**
 * Renders a simple, centered loading screen with a spinner.
 */
const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[999] transition-opacity duration-300">
    <div className="flex flex-col items-center space-y-4">
      <Loader size={48} className="animate-spin text-indigo-600" />
      <p className="text-xl font-medium text-gray-700 tracking-wider">
        Initializing Portfolio
      </p>
    </div>
  </div>
);

/**
 * Client component that manages the 2-second loading delay.
 */
const PreloaderLayoutWrapper: React.FC<PreloaderWrapperProps> = ({
  children,
}) => {
  // Start with loading set to true
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 2000 milliseconds (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loader after 2 seconds
    }, 2000);

    // Cleanup function to clear the timer if the component unmounts prematurely
    return () => clearTimeout(timer);
  }, []);

  // Conditionally render the loading screen or the main application content
  return <>{isLoading ? <LoadingScreen /> : children}</>;
};

export default PreloaderLayoutWrapper;
