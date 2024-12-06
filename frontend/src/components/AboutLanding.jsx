import * as React from "react";

export function AboutLanding() {
  return (
    <section 
      id="about"
      className="py-20 px-4"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0ad828f0c24b9bf8aa9c216c40e63ccd2bf00f6c4d5a1134408b61a001870d3?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
            alt="DigiCarPoint fleet"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 
            id="about-heading"
            className="text-5xl font-bold text-rose-800 mb-8 text-center md:text-left"
          >
            Tentang Kami
          </h2>
          <p className="text-lg text-black text-justify">
            DigiCarPoint merupakan usaha sewa mobil untuk berbagai keperluan liburan, 
            pernikahan atau kebutuhan bisnis. DigiCarPoint memiliki beragam inventaris 
            mobil yang bisa Anda sewa seperti Avanza, Xenia, Alphard, Vellfire, Innova, 
            Yaris, Mobilio, Jazz, Elf dan masih banyak lagi. DigiCarPoint membandingkan 
            banyak penyedia layanan penyewaan mobil terbaik untuk membantu Anda menemukan 
            harga termurah dalam satu pencarian mudah.
          </p>
        </div>
      </div>
    </section>
  );
}