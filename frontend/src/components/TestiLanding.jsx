import * as React from "react";

const testimonialData = [
  {
    id: 1,
    name: "Tommy",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/9539b3317da21925aa0c9d0f082f1d0bb198a73cd1a853f4153bccff88e1f0a5?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
    review:
      "Siap makasih puas dengan pelayanannya. Akan saya rekomendasikan ke orang lain.",
  },
  {
    id: 2,
    name: "Joko",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/e1980aafc657ec20e75b646040f77f0602702c050c7c0cb87b1e30216bac0574?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
  },
];

const TestimonialCard = ({ imageSrc, name, review }) => {
  return (
    <div className="flex flex-col items-center text-lg font-medium text-black whitespace-nowrap">
      <img
        loading="lazy"
        src={imageSrc}
        alt={`Profile picture of ${name}`}
        className="object-contain rounded-3xl aspect-square w-[140px]"
      />
      <div className="mt-4 text-center">{name}</div>
      {review && (
        <div className="mt-4 text-center text-black">{review}</div>
      )}
    </div>
  );
};

export function TestiLanding() {
  return (
    <div className="flex flex-col bg-whote-100 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://path/to/car-image.png')] bg-no-repeat bg-contain bg-right-bottom opacity-50 z-0"></div>

      {/* Judul */}
      <div className="z-10 text-center mb-8 relative">
        <h1
          className="text-4xl font-bold max-md:text-3xl"
          style={{ color: "white" }}
        >
          Apa Kata Customer Kami?
        </h1>
      </div>

      {/* Konten Testimonial */}
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 px-6 py-8 rounded-3xl shadow-sm bg-stone-100">
            <TestimonialCard {...testimonialData[0]} />
          </div>
          <div className="flex-1 px-6 py-8 rounded-3xl shadow-sm bg-stone-50">
            <TestimonialCard {...testimonialData[1]} />
          </div>
        </div>
      </div>

      {/* Logo */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/a6d6bceff8bb48978cff35acf0b0a4d4f3ae04564d7b9db59eed29bf9f06d33e?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&"
        alt="Logo"
        className="object-contain self-center mt-12 max-w-full aspect-[10.2] w-[174px] z-10"
      />

      {/* Footer Space */}
      <div className="h-16 bg-white"></div>

      <div className="absolute bottom-20 left-0 w-[100%] h-[100%] bg-rose-900 z-0 rounded-br-full"></div>
    </div>
  );
}