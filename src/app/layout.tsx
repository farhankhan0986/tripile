import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#5C1828",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tripile.vercel.app"),
  title: {
    template: "%s | Tripile",
    default: "Tripile | Book Flights & Hotels with a Real Travel Agent",
  },
  description:
    "Tripile is a premium US travel agency serving the 50+ traveler. Book flights, hotels, and group trips by phone or online. Licensed agents, BBB A+, 2,100+ five-star reviews.",
  keywords: [
    "travel agency",
    "book flights",
    "book hotels",
    "group travel",
    "travel agents",
    "50+ travel",
    "senior travel",
    "BBB A+ travel agency",
    "licensed travel agents",
    "phone booking travel",
  ],
  authors: [{ name: "Tripile", url: "https://tripile.vercel.app" }],
  creator: "Tripile",
  publisher: "Tripile",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tripile.vercel.app",
    siteName: "Tripile",
    title: "Tripile | Book Flights & Hotels with a Real Travel Agent",
    description:
      "Real agents, no bots. Search flights and hotels or call our licensed travel advisors for personalized service. BBB A+ rated, 4.53 stars from 2,100+ travelers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tripile - Premium Travel Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tripile | Book Flights & Hotels with a Real Travel Agent",
    description:
      "Real agents, no bots. Search flights and hotels or call our licensed travel advisors. BBB A+ rated, 4.53 stars from 2,100+ travelers.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tripile.vercel.app",
  },
  verification: {
    // Add your Google Search Console verification token here when ready:
    // google: "your-google-verification-token",
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
      className={`${cormorantGaramond.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
