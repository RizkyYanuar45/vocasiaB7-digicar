import * as React from "react";

export function RentalLanding() {
  const steps = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ba008d26822e466ac5824d49e3d50c88a0e4725d8b78ee4ab876dd6ce4b95c0f?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      title: "Lihat Produk",
      description: "Melihat produk yang tersedia untuk dirental"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6c65921947f148fb486008432bd26174400f02a28b0f68903384a93fca3944f?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      title: "Pilih Produk",
      description: "Memilih mobil yang diinginkan dan sesuai kebutuhan"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/025a6188beefb5f0332454e75a8078b3de46d49c88bb8a2307b00d0abc22a652?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      title: "Chat Kami",
      description: "Chat kami melalui kontak yang telah tersedia"
    }
  ];

  return (
    <section 
      className="py-20 px-4"
      aria-labelledby="steps-heading"
    >
      <h2 
        id="steps-heading"
        className="text-5xl font-bold text-center text-stone-800 mb-16"
      >
        Rental Mudah Hanya Dengan 3 Steps
      </h2>
      <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="flex flex-col items-center w-full md:w-1/3 max-w-xs"
            role="article"
            aria-labelledby={`step-${index + 1}-heading`}
          >
            <img
              src={step.icon}
              alt=""
              className="w-20 h-20 object-contain mb-4"
              role="presentation"
            />
            <h3 
              id={`step-${index + 1}-heading`}
              className="text-4xl font-bold text-black mb-4"
            >
              {step.title}
            </h3>
            <p className="text-center text-stone-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}