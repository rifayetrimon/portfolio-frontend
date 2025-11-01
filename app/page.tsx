"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

/**
 * Renders a simple, centered loading screen with a custom style.
 */
const LoadingScreen: React.FC = () => (
  // Fixed inset for full screen coverage, high z-index, and clean background
  <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 z-[999] transition-opacity duration-300">
    <div className="flex flex-col items-center space-y-4">
      <Loader size={48} className="animate-spin text-indigo-600" />
      <p className="text-xl font-medium text-gray-700 tracking-wider">
        Initializing Portfolio
      </p>
    </div>
  </div>
);

/**
 * The Root Page component, which acts as the initial preloader and redirect.
 */
export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const REDIRECT_DELAY_MS = 2000; // 2 seconds

  useEffect(() => {
    // Start the timer to hide the loader and redirect
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push("/home");
    }, REDIRECT_DELAY_MS);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [router]);

  // Show the loading screen while the timer runs
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Once loading is false, the redirect has been initiated, so we return null.
  return null;
}
