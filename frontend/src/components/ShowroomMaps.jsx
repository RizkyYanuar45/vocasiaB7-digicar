import * as React from "react";
import { useState } from "react";

export default function ShowroomMap() {
  const [location, setLocation] = useState("");

  const handleRouteCheck = (e) => {
    e.preventDefault();
    if (location) {
      window.open(`https://www.google.com/maps/dir/${encodeURIComponent(location)}/Jalan+Pisang+No.+70,+Kel.+Gede,+Kec+Kecil,+Kota+Tangerang`);
    }
  };

  return (
    <section className="mt-16 w-full px-5 md:px-10">
      <div className="flex gap-8 flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Showroom <span className="text-rose-800">DigiCar</span>
            <br />
            di Google Maps
          </h2>
          <p className="mt-8 text-xl font-semibold text-gray-700">Kota Tangerang</p>
          <p className="mt-2 text-lg text-gray-600">
            Jalan Pisang No. 70, Kel. Gede, Kec. Kecil
          </p>
          <form
            onSubmit={handleRouteCheck}
            className="flex items-center mt-10 bg-white rounded-lg shadow-lg p-4"
          >
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Masukkan lokasi anda"
              className="flex-1 p-2 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-800"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 text-white bg-rose-800 hover:bg-rose-700 rounded-r-lg font-medium"
            >
              Cek Rute
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3">
          <img
            src="/path/to/your/image.png"
            alt="Map showing DigiCar showroom location in Tangerang"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
