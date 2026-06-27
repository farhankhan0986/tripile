"use client";

import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import PhoneBar from "@/components/ui/PhoneBar";
import TrustStrip from "@/components/ui/TrustStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import Destinations from "@/components/sections/Destinations";
import WhyTripile from "@/components/sections/WhyTripile";
import Testimonials from "@/components/sections/Testimonials";
import CallCTA from "@/components/sections/CallCTA";
import Footer from "@/components/Footer";

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Nav />
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pt-0">
        <PhoneBar />
        <TrustStrip />
        <HowItWorks />
        <Destinations />
        <WhyTripile />
        <Testimonials />
        <CallCTA />
      </div>
      <Footer />
    </div>
  );
}
