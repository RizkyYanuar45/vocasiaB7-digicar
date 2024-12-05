import React, { useState } from "react";

const OrderForm = ({ isOpen, onClose, carName }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    startDate: "",
    endDate: "",
    destination: "",
    ktp: "",
    stnk: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data: ", { ...formData, car: carName });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Overlay with neutral background */}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-30"></div>

      {/* Container Form with neutral background */}
      <div className="relative bg-gray-200 dark:bg-gray-700 w-[90%] max-w-lg p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Form Pemesanan untuk {carName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
              Nama:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
              Kontak (Email):
            </label>
            <input
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Masukkan alamat email"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
                Tanggal Mulai:
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
                Tanggal Selesai:
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
              Tujuan:
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Masukkan tujuan perjalanan"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
              KTP (Unggah Gambar):
            </label>
            <input
              type="file"
              name="ktp"
              onChange={handleChange}
              accept="image/*"
              required
              className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">
              STNK (Unggah Gambar):
            </label>
            <input
              type="file"
              name="stnk"
              onChange={handleChange}
              accept="image/*"
              required
              className="w-full border rounded-lg p-2 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transition duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition duration-200"
            >
              Pesan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;