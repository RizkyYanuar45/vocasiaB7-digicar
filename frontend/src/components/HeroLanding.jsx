import React from 'react';

export const HeroLanding = () => {
  return (
    <div className="flex flex-col pb-2.5">
      <div className="flex flex-col items-center px-16 pt-20 w-full bg-gradient-to-r from-cinderella-50 to-white-50 max-md:px-5 max-md:max-w-full">
        <div className="z-10 -mb-2.5 w-full max-w-[1212px] max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col pr-8 pl-3 max-md:pr-5 max-md:max-w-full">
                  <br />
                <h1 className="text-5xl font-bold text-stone-600 max-md:max-w-full max-md:text-4xl ">
              Kami Hadir Untuk
              <br />
              <span className="text-rose-800"> Memenuhi Kebutuhan Perjalanan Anda</span>
              <br />
            </h1>
                  <div className="self-start mt-14 text-2xl text-black max-md:mt-10">
                    DigiCarPoint telah hadir sejak 2018
                  </div>
                </div>
                <div className="py-3 pr-9 pl-3 mt-36 w-full bg-white rounded-3xl border border-black border-solid max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <div className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col px-12 pt-5 pb-8 mx-auto w-full bg-rose-800 rounded-xl shadow-sm max-md:px-5 max-md:mt-10">
                        <div className="flex gap-2.5 self-center text-4xl font-medium w-[84px]">
                          <div className="text-stone-50">10K</div>
                          <div className="text-stone-50">+</div>
                        </div>
                        <div className="mt-7 text-sm text-center text-stone-50">
                          Pengguna yang Mempercayakan Rental Mobil Kepada Kami
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
                      <div className="flex gap-5 justify-between self-stretch my-auto w-full text-sm font-medium text-stone-600 max-md:mt-10">
                        <button 
                          className="gap-2.5 self-stretch px-6 py-3 bg-red-100 rounded-xl max-md:px-5 hover:bg-red-200 focus:ring-2 focus:ring-red-300 transition-colors"
                          aria-label="Lihat Produk"
                        >
                          Lihat Produk
                        </button>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8838238c4bba21b9b943f3340716db0ed32a66e426c5a84fc70e73a4a728c982?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
                          alt="Arrow right icon"
                          className="object-contain shrink-0 self-start w-9 aspect-[0.97]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-start pt-32 pb-52 bg-gradient-to-b from-rose-800 to-white-100  rounded-[50px_50px_0px_0px] max-md:py-24 max-md:mt-10 max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/688be4e071234865537ab23c7f29f24c98aaf630786d275994dfbfa10126c9f3?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966"
                  alt="Car rental service illustration"
                  className="object-contain mr-0 w-full aspect-[1.25]  max-w-[900px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};