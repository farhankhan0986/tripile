import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tripile | Book Flights & Hotels with a Real Travel Agent",
  description:
    "Tripile is a premium US travel agency serving the 50+ traveler. Book flights, hotels, and group trips by phone or online. Licensed agents, BBB A+, 2,100+ five-star reviews. Call 1-800-963-4330.",
  openGraph: {
    title: "Tripile | Book Flights & Hotels with a Real Travel Agent",
    description:
      "Real agents, no bots. Search flights and hotels or call our licensed travel advisors for personalized service. BBB A+ rated, 4.53 stars from 2,100+ travelers.",
    url: "https://tripile.vercel.app",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Tripile",
              url: "https://tripile.vercel.app",
              telephone: "+18009634330",
              email: "hello@tripile.com",
              description:
                "Premium US travel agency for the 50+ traveler. Real agents, no hidden fees. Flights, hotels, and group travel planned by licensed advisors.",
              foundingDate: "2022",
              priceRange: "$$",
              address: { "@type": "PostalAddress", addressCountry: "US", addressLocality: "New York", addressRegion: "NY" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.53",
                reviewCount: "2100",
                bestRating: "5",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                  opens: "08:00",
                  closes: "21:00",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tripile",
              url: "https://tripile.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://tripile.vercel.app/flights?destination={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
          ]),
        }}
      />
      <HomeClient />
    </>
  );
}
