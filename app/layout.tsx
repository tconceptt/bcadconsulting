import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans-src",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bcadconsulting.com"),
  title: {
    default: "BCaD Consulting Management PLC — Spurring Innovation & Entrepreneurship",
    template: "%s | BCaD Consulting",
  },
  description:
    "Management consulting, entrepreneurship training, HR outsourcing, and renewable energy solutions from Addis Ababa — helping Ethiopian and African enterprises grow since 1998.",
  openGraph: {
    type: "website",
    siteName: "BCaD Consulting",
    title: "BCaD Consulting Management PLC",
    description:
      "Management consulting, entrepreneurship training, HR outsourcing, and renewable energy solutions — helping enterprises grow since 1998.",
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
      className={`${montserrat.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}
