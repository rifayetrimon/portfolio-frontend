import type { Metadata } from "next";
// Removed imports for Geist and Geist_Mono as we are now using system fonts.
import "./globals.css";

// Note: SF Pro (San Francisco) is a system font. The best way to use it
// is to leverage the CSS font stack (via Tailwind's 'font-sans'), which
// automatically uses '-apple-system' on Apple devices, and provides reliable fallbacks.

export const metadata: Metadata = {
  title: "My Professional Portfolio", // Updated title for relevance
  description:
    "A modern developer portfolio showcasing key projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // The 'font-sans' class in Tailwind is designed to use the native system font
        // stack, which includes '-apple-system' (SF Pro) for Apple devices,
        // followed by other global system fonts.
        className={`font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
