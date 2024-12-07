import * as React from "react";
import Navbar from "./../../components/Navbar";
import HeroSection from "./../../components/HeroSection";
import ContactSection from "./../../components/ContactSection";
import ShowroomMaps from "./../../components/ShowroomMaps";
import Footer from "./../../components/Footer";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="flex overflow-hidden flex-col items-center bg-white">
        <HeroSection />
        <ContactSection />
        <ShowroomMaps />
        <div className="flex flex-col md:flex-row gap-x-48 gap-y-16 my-16 md:my-20">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-text font-bold text-4xl md:text-6xl">5823</h1>
            <p className="text-black-950 font-bold text-xl md:text-3xl">
              Pengunjung baru bulan ini
            </p>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-text font-bold text-4xl md:text-6xl">1103</h1>
            <p className="text-black-950 font-bold text-xl md:text-3xl">
              Penyewa tahun ini
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
