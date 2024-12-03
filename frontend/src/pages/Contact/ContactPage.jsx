import * as React from "react";
import Header from "./../../components/Header";
import HeroSection from "./../../components/HeroSection";
import ContactSection from "./../../components/ContactSection";
import ShowroomMaps from "./../../components/ShowroomMaps";
import Footer from "./../../components/Footer";

export default function ContactPage() {
return (
    <div className="flex overflow-hidden flex-col items-center bg-white">
    <Header />
    <HeroSection />
    <ContactSection />
    <ShowroomMaps />
    <Footer />
    </div>
);
}