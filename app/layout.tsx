import type { Metadata, Viewport } from "next";
import "./globals.css";

// Note: SF Pro (San Francisco) is a system font. The best way to use it
// is to leverage the CSS font stack (via Tailwind's 'font-sans'), which
// automatically uses '-apple-system' on Apple devices, and provides reliable fallbacks.

export const metadata: Metadata = {
  title: "Rifayet",
  description:
    "A modern developer portfolio showcasing key projects and skills.",
  icons: {
    icon: "/logo/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Runs before first paint so the page never flashes the wrong theme. A stored
// choice wins; otherwise we follow the OS setting.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
  // Arms the scroll-reveal styles. Without scripts the class never lands and
  // every [data-reveal] block stays plainly visible.
  document.documentElement.classList.add("has-js");
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        // The 'font-sans' class in Tailwind is designed to use the native system font
        // stack, which includes '-apple-system' (SF Pro) for Apple devices,
        // followed by other global system fonts.
        className={`font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
