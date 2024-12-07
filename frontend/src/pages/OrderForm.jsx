import React, { useState } from "react";
import DummyImg from "./../assets/image 5.png";

const OrderForm = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-3">
          <div className="lg:col-span-1 lg:py-12 ">
            <div className="mt-24">
              <img src={DummyImg} alt="" srcset="" />
              <h1 href="#" className="text-2xl font-bold text-pink-600">
                TOYOTA
              </h1>
            </div>
          </div>

          <div className="rounded-lg bg-white-100 p-8 shadow-lg lg:col-span-2 lg:p-12">
            <form className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Nama
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Nama"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="contact">
                    Kontak (Email)
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Alamat Email"
                    type="email"
                    id="contact"
                    name="contact"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Nomor Telepon
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Nomor Telepon"
                    type="tel"
                    id="phone"
                    name="phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="startDate">
                    Tanggal Mulai
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="endDate">
                    Tanggal Selesai
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="date"
                    id="endDate"
                    name="endDate"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="destination">
                  Tujuan
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Tujuan Perjalanan"
                  type="text"
                  id="destination"
                  name="destination"
                  required
                />
              </div>

              <div>
                <h1 className=" text-black-950" htmlFor="ktp">
                  KTP (Unggah Gambar)
                </h1>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  type="file"
                  id="ktp"
                  name="ktp"
                  accept="image/*"
                  required
                />
              </div>

              <div>
                <h1 className=" text-black-950 " htmlFor="stnk">
                  SIM (Unggah Gambar)
                </h1>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  type="file"
                  id="stnk"
                  name="stnk"
                  accept="image/*"
                  required
                />
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Total Pembayaran: Rp 0
                </span>
              </div>

              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white-100 rounded-lg hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white-100 rounded-lg hover:bg-blue-600"
                >
                  Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
