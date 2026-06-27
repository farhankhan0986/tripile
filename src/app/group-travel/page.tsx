import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import GroupTravelClient from "./GroupTravelClient";

export const metadata: Metadata = {
  title: "Group Travel | Expert Group Trip Planning for 10+ Travelers",
  description:
    "Plan group travel with Tripile's dedicated coordinators. Family vacations, church groups, corporate retreats, cruise groups, and more. Request a free quote today.",
  openGraph: {
    title: "Group Travel | Tripile - One Coordinator, Every Detail",
    description:
      "From family reunions to corporate retreats, our dedicated group travel coordinators handle every detail. Flight blocks, hotel rooms, transfers, and 24/7 support.",
    url: "https://tripile.vercel.app/group-travel",
  },
  alternates: { canonical: "https://tripile.vercel.app/group-travel" },
};

export default function GroupTravelPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />
      <main>
        <GroupTravelClient />
      </main>
      <Footer />
    </div>
  );
}
