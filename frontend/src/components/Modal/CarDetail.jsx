import React from "react";
import { X } from "lucide-react";
import dummyImage from "./../../assets/image 5.png";

export const CarDetail = ({ isOpen, onClose, detail, imageCar, nameCar }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-950 bg-opacity-50">
      <section
        className="relative flex flex-col md:flex-row overflow-hidden rounded-lg shadow-2xl bg-white-50 w-full max-w-md md:max-w-3xl" // Mengatur lebar maksimum
        onClick={(e) => e.stopPropagation()}
      >
        <X
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-black-950"
          size={24}
        />

        <img
          alt="Mobil Mobilan"
          src={imageCar}
          className="w-full h-auto object-cover md:w-1/2 md:h-full md:pr-2"
        />

        <div className="flex flex-col justify-center p-4 text-center text-black-950 sm:p-6 md:col-span-2 lg:p-8 md:pl-2">
          <h2 className="mt-6 font-black uppercase">
            <span className="text-4xl font-black sm:text-5xl lg:text-6xl">
              {nameCar}
            </span>

            <span className="mt-2 block text-sm">Spesifikasi</span>
          </h2>
          <p className="mt-8 text-xs font-medium uppercase text-gray-600">
            {detail}
          </p>
        </div>
      </section>
    </div>
  );
};
