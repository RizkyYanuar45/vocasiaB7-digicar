import * as React from "react";
import { useState } from "react";
import Map from "../../src/assets/map.png";

export default function ShowroomMap() {
  const [error, setError] = useState("");

  const handleRouteCheck = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          window.open(
            `https://www.google.com/maps/dir/${latitude},${longitude}/Menara+BCA,+Grand+Indonesia,+Jl.+M.H.+Thamrin+No.1,+RT.14/RW.9,+Kebon+Melati,+Kec.+Tanah+Abang,+Jakarta,+10230,+Indonesia`
          );
        },
        (error) => {
          setError(
            "Gagal mendapatkan lokasi. Pastikan Anda mengizinkan akses lokasi."
          );
        }
      );
    } else {
      setError("Geolocation tidak didukung oleh browser ini.");
    }
  };

  return (
    <section className="mt-16 w-full px-5 md:px-10 bg-gradient-to-r from-cinderella-100 to-white-50 flex items-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 justify-start md:justify-between">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Showroom <span className="text-rose-800">DigiCar</span>
            <br />
            di Google Maps
          </h2>
          <p className="mt-8 text-xl font-semibold text-gray-700">
            Kota Tangerang
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Jalan Pisang No. 70, Kel. Gede, Kec. Kecil
          </p>
          {error && <p className="mt-2 text-red-600">{error}</p>}
          <button
            onClick={handleRouteCheck}
            className="mt-10 px-6 py-2 text-white-50 bg-rose-800 hover:bg-rose-700 rounded-lg font-medium"
          >
            Cek Rute
          </button>
        </div>

        <div className="md:w-2/3">
          <img
            src={Map}
            alt="Peta menunjukkan lokasi showroom DigiCar di Tangerang"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
