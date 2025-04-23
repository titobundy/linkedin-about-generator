import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn About Generator",
  description: "Create personalized LinkedIn About sections with AI-generated content in multiple languages",
  keywords: ["LinkedIn", "About section", "professional profile", "AI content", "resume"],
  authors: [{ name: "LinkedIn About Generator" }],
  creator: "LinkedIn About Generator",
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1d2226" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full font-linkedin">
      <body className="h-full antialiased bg-[var(--linkedin-gray-bg)] text-[var(--linkedin-gray-dark)]">
        {children}
      </body>
    </html>
  );
}
