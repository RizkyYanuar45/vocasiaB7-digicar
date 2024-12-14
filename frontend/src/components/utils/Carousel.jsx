import React from "react";

import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Carousel = ({ children }) => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
        renderBullet: (index, className) =>
          `<span class="${className} !bg-red-200"></span>`,
      }}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="w-full h-full !pb-10"
    >
      {children}
    </Swiper>
  );
};

export default Carousel;
