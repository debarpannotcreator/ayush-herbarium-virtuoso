import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleEnterGarden = () => {
    navigate("/garden");
  };

  return <LandingPage onEnterGarden={handleEnterGarden} />;
};

export default Index;