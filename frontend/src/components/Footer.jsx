import * as React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center self-stretch px-20 pt-16 pb-5 mt-12 w-full bg-stone-800 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col w-full max-w-[1221px] max-md:max-w-full">
        <div className="w-full max-w-[1060px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-start w-full max-md:mt-10">
                <div className="text-3xl font-bold">
                  <span className="text-rose-800">DigiCar</span>
                  <span className="text-white">Point</span>
                </div>
                <p className="self-stretch mt-3.5 text-sm leading-6 text-justify text-white">
                  DigiCarPoint merupakan usaha serta wadah yang menyediakan
                  jasa untuk merental mobil dengan misi untuk mempermudah
                  pengguna mencari rental mobil yang dibutuhkan
                </p>
                <div className="flex gap-5 mt-4">
                  {['ext_12-', 'ext_13-', 'ext_14-'].map((ext, index) => (
                    <img
                      key={index}
                      loading="lazy"
                      src={`http://b.io/${ext}`}
                      className="object-contain shrink-0 w-9 aspect-square"
                      alt={`Social media icon ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-3 w-full max-md:mt-10">
                <div className="flex flex-col items-start pr-20 pl-2.5 max-md:pr-5">
                  <h3 className="z-10 text-lg font-bold text-white capitalize">
                    Terus ikuti Perkembangan
                  </h3>
                  <p className="text-sm leading-6 text-justify text-stone-50">
                    Bergabunglah dengan mailling list kami untuk terus
                    mengikuti perkembangan info-info menarik dari kami
                  </p>
                </div>
                <form className="flex gap-5 justify-between py-2.5 pr-3.5 pl-10 mt-3.5 w-full border-2 border-solid bg-stone-800 border-zinc-100 rounded-[45.595px] max-md:pl-5">
                  <label htmlFor="footerEmail" className="sr-only">Masukkan email</label>
                  <input
                    type="email"
                    id="footerEmail"
                    className="my-auto text-xs text-neutral-400 bg-transparent border-none"
                    placeholder="Masukkan email"
                  />
                  <button type="submit" className="gap-2.5 self-stretch px-2 py-3 text-sm font-medium bg-red-100 rounded-3xl min-h-[42px] text-stone-600">
                    Berlangganan Sekarang
                  </button>
                </form>
              </div>
            </div>

            <nav className="flex flex-col ml-5 w-[22%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-3 max-md:mt-10">
                <div className="self-start text-lg font-bold">
                  <span className="text-rose-800">DigiCar</span>
                  <span className="text-white">Point</span>
                </div>
                <div className="mt-6 text-sm font-medium leading-7 text-white">
                  Tentang Kami Kontak
                  <br />
                  Bantuan Privacy{" "}
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="shrink-0 mt-28 ml-5 max-w-full h-px border border-solid bg-stone-800 border-stone-800 w-[1200px] max-md:mt-10" />
        <div className="self-center mt-4 ml-12 text-sm leading-relaxed text-white">
          Copyright © 2023 <span className="text-rose-800">DigiCar</span>Point
        </div>
      </div>
    </footer>
  );
}