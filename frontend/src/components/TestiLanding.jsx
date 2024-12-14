import * as React from "react";
import Carousel from "./utils/Carousel";
import { SwiperSlide } from "swiper/react";

export function TestiLanding() {
  const testimonials = [
    {
      id: 1,
      name: "Tommy",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9539b3317da21925aa0c9d0f082f1d0bb198a73cd1a853f4153bccff88e1f0a5?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      text: "Siap makasih puas dengan pelayanannya. Akan saya rekomendasikan ke orang lain.",
    },
    {
      id: 2,
      name: "Joko",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e1980aafc657ec20e75b646040f77f0602702c050c7c0cb87b1e30216bac0574?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      text: "Lokasi strategis, pelayanan ramah, dan harga terjangkau.",
    },
    {
      id: 3,
      name: "Tommy",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9539b3317da21925aa0c9d0f082f1d0bb198a73cd1a853f4153bccff88e1f0a5?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      text: "Siap makasih puas dengan pelayanannya. Akan saya rekomendasikan ke orang lain.",
    },
    {
      id: 4,
      name: "Joko",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e1980aafc657ec20e75b646040f77f0602702c050c7c0cb87b1e30216bac0574?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      text: "Lokasi strategis, pelayanan ramah, dan harga terjangkau.",
    },
  ];

  return (
    <section
      className="bg-rose-800 rounded-[130px_0px_130px_0px] "
      aria-labelledby="testimonials-heading"
    >
      <div className=" py-20 px-4 max-w-full mx-auto">
        <h2
          id="testimonials-heading"
          className="text-5xl font-bold text-center text-white-50 mb-16"
        >
          Apa Kata Customer Kami?
        </h2>
        <Carousel>
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <article
                key={testimonial.id}
                className="bg-white-50 rounded-3xl p-8"
                aria-labelledby={`testimonial-${testimonial.id}-heading`}
              >
                <div className="flex flex-col items-center gap-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex flex-col items-center">
                    <h3
                      id={`testimonial-${testimonial.id}-heading`}
                      className="text-xl font-medium text-black-950"
                    >
                      {testimonial.name}
                    </h3>
                    {testimonial.text && (
                      <p className="mt-2 text-black-950">{testimonial.text}</p>
                    )}
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
