import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import SmoothScroll from "@/components/motion/SmoothScroll";
import DescentCanvas from "@/components/three/DescentCanvas";
import { siteConfig } from "@/data/portfolio";

import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display-family",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.defaultDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.defaultDescription,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          className="sr-only z-50 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          href="#main"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Karm Patel",
              jobTitle: "Full-Stack Mobile Developer",
              description:
                "Flutter Developer | .NET Backend Engineer building mobile products and the systems behind them.",
              url: siteConfig.siteUrl,
              sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
            }),
          }}
        />
        <SmoothScroll>
          <DescentCanvas />
          <div className="relative z-10 flex min-h-full flex-col">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
