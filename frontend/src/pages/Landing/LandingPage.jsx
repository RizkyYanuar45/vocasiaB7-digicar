import * as React from "react";
import Navbar from "./../../components/Navbar";
import { HeroLanding } from "./../../components/HeroLanding";
import { RentalLanding } from "./../../components/RentalLanding";
import { ProductLanding } from "./../../components/ProductLanding";
import { AboutLanding } from "./../../components/AboutLanding";
import { TestiLanding } from "./../../components/TestiLanding";
import Footer from "./../../components/Footer";

export default function LandingPage() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Navbar />
      <HeroLanding />
      <RentalLanding />
      <ProductLanding />
      <AboutLanding />
      <TestiLanding />
      <div className="mb-60"></div>
      <Footer />
    </div>
  );
}
