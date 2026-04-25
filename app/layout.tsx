import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const description =
  "WavOps identifies hidden labeling errors, noise artifacts, and inconsistencies in audio datasets for AI training.";

export const metadata: Metadata = {
  title: "WavOps – Audio Data Intelligence for AI Systems",
  description,
  metadataBase: new URL("https://wavops.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WavOps – Audio Data Intelligence for AI Systems",
    description,
    url: "https://wavops.io",
    siteName: "WavOps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WavOps – Audio Data Intelligence for AI Systems",
    description,
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
      className={`${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

