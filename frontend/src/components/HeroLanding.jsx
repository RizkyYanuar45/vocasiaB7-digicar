import * as React from "react";

export function HeroLanding() {
  return (
    <section
      id="home"
      className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen bg-rose-50 px-8 lg:px-16 py-12"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Konten Teks */}
      <div className="flex-1 max-w-lg lg:max-w-none">
        <h1
          id="hero-heading"
          className="text-4xl lg:text-5xl font-bold text-stone-800 mb-4 leading-snug"
        >
          Kami Hadir Untuk <span className="text-rose-700">Memenuhi</span>
          <br />
          Kebutuhan Perjalanan Anda
        </h1>
        <p className="text-lg text-stone-600 mb-6">
          DigiCarPoint telah hadir sejak 2018
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          {/* Statistik */}
          <div className="bg-rose-800 text-white p-6 rounded-lg shadow-lg max-w-xs">
            <h2 className="text-3xl font-bold mb-1">10K +</h2>
            <p className="text-sm">
              Pengguna yang Mempercayakan Rental Mobil Kepada Kami
            </p>
          </div>
          {/* Tombol */}
          <button
            className="flex items-center gap-2 px-6 py-3 bg-rose-100 text-rose-800 border border-rose-800 rounded-lg hover:bg-rose-200 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-800 focus:ring-offset-2"
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Lihat Produk
            <span className="text-lg font-semibold">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Gambar */}
      <div className="flex-1 flex justify-center relative">
        {/* Kotak Gradien */}
        <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-rose-500 to-pink-400 rounded-full lg:translate-x-1/2"></div>
        {/* Gambar Mobil */}
        <img
          src="https://via.placeholder.com/300x200.png?text=Mobil"
          alt="Mobil mewah DigiCarPoint"
          className="relative z-10 w-72 lg:w-96 h-auto object-contain"
        />
      </div>
    </section>
  );
}
