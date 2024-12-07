import * as React from "react";

export default function HeroSection() {
  return (
    <section className="self-stretch px-16 pt-16 pb-4 w-full max-md:px-5 max-md:max-w-full bg-gradient-to-r from-cinderella-100 to-white-50">
      <div className="flex gap-5 max-md:flex-col ">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
          <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full ">
            <h1 className="text-5xl font-bold text-stone-600 max-md:max-w-full max-md:text-4xl ">
              <span className="text-rose-800">Kenyamanan dan Keamanan</span>{" "}
              <br />
              <span className="text-rose-800">Perjalanan Anda, </span>
              <br />
              Prioritas Kami{" "}
            </h1>
            <form className="flex ml-10 gap-10 px-9 py-3 mt-16 max-w-full bg-white-50 rounded-2xl w-[416px] max-md:px-5 max-md:mt-10">
              <label htmlFor="emailSubscribe" className="sr-only">
                Masukkan email anda
              </label>
              <input
                type="email"
                id="emailSubscribe"
                className="grow shrink my-auto text-lg text-stone-600 w-[154px]  "
                placeholder="Masukkan email anda"
              />
              <button
                type="submit"
                className="gap-2.5 self-stretch py-3 pr-3.5 pl-4 text-sm font-medium text-white-50 whitespace-nowrap bg-rose-800 rounded-xl"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col grow min-h-[402px] max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39d073c612bb2e10ebf976180e8edbd7bcad9bf2f6a03d6745ea651c82bc839b?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
              className="object-cover absolute inset-0 size-full"
              alt="Hero background"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39d073c612bb2e10ebf976180e8edbd7bcad9bf2f6a03d6745ea651c82bc839b?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
              className="object-contain w-full aspect-[1.4] max-md:max-w-full"
              alt="Hero foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
