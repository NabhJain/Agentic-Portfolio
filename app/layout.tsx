import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const jbm = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nabh Jain — AI / ML Engineer",
  icons: {icon: "/favicon.svg"},
  description:
    "Portfolio of Nabh Jain — Computer Engineering student building agentic AI, RAG pipelines, and applied ML systems.",
  metadataBase: new URL("https://nabhjain.vercel.app"),
  openGraph: {
    title: "Nabh Jain — AI / ML Engineer",
    description:
      "Agentic AI, RAG pipelines, and applied machine learning. Talk to my AI agent directly on this site.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jbm.variable}`}>
      <body className="font-sans antialiased">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
