"use client";
import { PersonaProvider } from "@/context/PersonaContext";
import Navigation from "@/components/layout/Navigation";
import SideNav from "@/components/layout/SideNav";
import LoadingScreen from "@/components/layout/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import OpportunityFinderSection from "@/components/sections/OpportunityFinderSection";
import WhySection from "@/components/sections/WhySection";
import DestinationMapSection from "@/components/sections/DestinationMapSection";
import RetailSection from "@/components/sections/RetailSection";
import LuxurySection from "@/components/sections/LuxurySection";
import DiningSection from "@/components/sections/DiningSection";
import EntertainmentSection from "@/components/sections/EntertainmentSection";
import MatchmakerSection from "@/components/sections/MatchmakerSection";
import EventsSection from "@/components/sections/EventsSection";
import VenueExplorerSection from "@/components/sections/VenueExplorerSection";
import SponsorshipSection from "@/components/sections/SponsorshipSection";
import SponsorshipSimulatorSection from "@/components/sections/SponsorshipSimulatorSection";
import DecisionDashboardSection from "@/components/sections/DecisionDashboardSection";
import LeasingSection from "@/components/sections/LeasingSection";
import GrandFinaleSection from "@/components/sections/GrandFinaleSection";
import FloatingCTABar from "@/components/ui/FloatingCTABar";

export default function Home() {
  return (
    <PersonaProvider>
      <LoadingScreen />
      <Navigation />
      <SideNav />
      <FloatingCTABar />
      <main>
        <HeroSection />
        <OpportunityFinderSection />
        <WhySection />
        <DestinationMapSection />
        <RetailSection />
        <LuxurySection />
        <DiningSection />
        <EntertainmentSection />
        <MatchmakerSection />
        <EventsSection />
        <VenueExplorerSection />
        <SponsorshipSection />
        <SponsorshipSimulatorSection />
        <DecisionDashboardSection />
        <LeasingSection />
        <GrandFinaleSection />
      </main>
    </PersonaProvider>
  );
}
