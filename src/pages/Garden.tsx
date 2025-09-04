import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PlantGallery } from "@/components/PlantGallery";
import { VirtualTours } from "@/components/VirtualTours";

const Garden = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSearch={setSearchQuery} searchQuery={searchQuery} />
      <HeroSection />
      <PlantGallery searchQuery={searchQuery} />
      <VirtualTours />
    </div>
  );
};

export default Garden;