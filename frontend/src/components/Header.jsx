import * as React from "react";

export default function Header() {
  return (
    <header className="flex flex-wrap gap-7 items-center self-stretch px-20 py-2.5 w-full text-sm font-bold bg-stone-50 max-md:px-5 max-md:max-w-full">
      <div className="flex grow shrink gap-6 items-center self-stretch my-auto text-black w-[126px]">
        <img
          loading="lazy"
          src="logo.png"
          className="object-contain shrink-0 self-stretch my-auto aspect-[1.3] w-[52px]"
          alt="DigiCar Logo"
        />
        <div className="self-stretch my-auto w-[173px]">
          <span className="text-rose-800">DigiCar</span>Point
        </div>
      </div>
      <nav className="grow shrink gap-2.5 self-stretch my-auto text-rose-800 min-h-[22px] min-w-[240px] w-[1038px] max-md:max-w-full">
        <span className="text-stone-800">Home</span>{" "}
        <span className="text-stone-800">Tentang Kami Blog Produk Testimoni </span>
        <span className="text-rose-800">Kontak</span>
      </nav>
    </header>
  );
}