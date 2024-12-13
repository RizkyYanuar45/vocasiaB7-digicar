import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CarDetail } from "./Modal/CarDetail";
import OrderForm from "../pages/OrderForm";

export function ProductLanding() {
  const [selectedCar, setSelectedCar] = React.useState(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const navigate = useNavigate(); 

  const products = [
    {
      id: 6,
      image:
        "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/bb0fd41b18b94317b366a31fb4560fa9eed57c33f3b808976e78cf14b738c946?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
      title: "Toyota Avanza 2018",
      plateType: "Plat Genap",
      price: "Rp. 420.000/ 1 Hari",
      variant: "light",
      orderLink: "/catalog/order/6",
    },
    {
      id: 3,
      image:
        "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/1646184a56752d2746a179f2d6198c17ad997cd44ba1799a8a49eba47a00b647?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
      title: "Honda Yaris",
      plateType: "Plat Genap",
      price: "Rp. 500.000/ 1 Hari",
      variant: "dark",
      orderLink: "/catalog/order/3",
    },
    {
      id: 6,
      image:
        "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/bb0fd41b18b94317b366a31fb4560fa9eed57c33f3b808976e78cf14b738c946?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
      title: "Toyota Avanza 2018",
      plateType: "Plat Genap",
      price: "Rp. 420.000/ 1 Hari",
      variant: "light",
      orderLink: "/catalog/order/6",
    },
  ];

  const ProductCard = ({ image, title, plateType, price, variant = "light", orderLink }) => {
    const bgColor = variant === "dark" ? "bg-stone-600" : "bg-red-100";
    const textColor = variant === "dark" ? "text-white" : "text-black";
    const buttonBg = variant === "dark" ? "bg-rose-100" : "bg-rose-800";
    const buttonText = variant === "dark" ? "text-neutral-500" : "text-white";

    return (
      <div className={`flex flex-col grow max-md:mt-7 max-md:max-w-full`}>
        <div className={`flex flex-col pt-7 pb-20 w-full ${bgColor} rounded-3xl max-md:max-w-full`}>
          <img
            loading="lazy"
            src={image}
            alt={`${title} car`}
            className="object-contain self-center max-w-full rounded-3xl aspect-[1.51] w-[369px]"
          />
          <div className={`flex flex-col px-7 mt-4 w-full font-medium ${textColor} max-md:max-w-full`}>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{title}</div>
              <div className="text-lg">{plateType}</div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="text-black font-bold text-2xl">Harga</div>
              <div className={`text-2xl font-bold mt-2 ${textColor}`}>{price}</div>
            </div>
            <div className="flex gap-5 justify-between self-stretch mt-16 w-full text-xl max-md:mt-10">
              <button
                onClick={() => {
                  setSelectedCar({ image, title, plateType, price });
                  setIsDetailOpen(true);
                }}
                className={`gap-2.5 self-stretch px-6 py-3 ${buttonBg} rounded-xl max-md:px-5 ${buttonText}`}
                aria-label={`View details for ${title}`}
              >
                Detail
              </button>
              <button
                onClick={() => navigate(orderLink)}
                className={`gap-2.5 self-stretch px-6 py-3 ${buttonBg} rounded-xl max-md:px-5 ${buttonText}`}
                aria-label={`Book now for ${title}`}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col bg-gradient-to-br from-rose-700 to-blue-50">
      <div className="flex flex-col px-12 py-16 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white max-md:text-4xl" style={{ color: "white" }}>
            Produk
          </h1>
        </div>
        <div className="flex justify-end">
          <NavLink
            to="/catalog"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-medium underline max-md:mt-2"
            aria-label="View All Product"
            style={{ color: "white" }}
          >
            Lihat Semua
          </NavLink>
        </div>
        <div className="mt-11 max-md:mt-10 max-md:max-w-full relative">
          <div className="flex gap-5 max-md:flex-col px-12">
            {products.map((product, index) => (
              <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CarDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        car={selectedCar}
      />
    </div>
  );
}
