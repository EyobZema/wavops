import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WaveOps | Audio Data Intelligence for AI Systems",
  description:
    "WaveOps identifies hidden labeling errors, noise artifacts, and inconsistencies in audio datasets to improve AI model performance.",
  metadataBase: new URL("https://waveops.ai"),
  openGraph: {
    title: "WaveOps | Audio Data Intelligence for AI Systems",
    description:
      "Find hidden audio data issues before they impact your model training.",
    url: "https://waveops.ai",
    siteName: "WaveOps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveOps | Audio Data Intelligence for AI Systems",
    description:
      "WaveOps helps teams ship cleaner, more reliable audio datasets for AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
