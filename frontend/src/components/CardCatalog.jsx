import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CarDetail } from "./Modal/CarDetail";

const isEven = (number) => number % 2 === 0;

const CardCatalog = ({
  carId,
  year,
  number,
  description,
  name,
  image,
  isUsed,
  price,
  rentalDay,
}) => {
  const [isDetail, setIsDetail] = useState(false);

  const handleOpenDetail = () => {
    navigator.geolocation;
    setIsDetail(true);
  };

  const handleCloseDetail = () => {
    setIsDetail(false);
  };

  return (
    <div
      id="card"
      data-aos="fade-up"
      data-aos-delay={300}
      data-aos-duration="500"
      className={classNames("px-6 py-8 rounded-lg w-full flex flex-col ", {
        "bg-scorpion-700 text-white-50": !isEven(number),
        "bg-cinderella-100 text-black-950": isEven(number),
      })}
    >
      <div className="w-full relative h-[200px]">
        <img
          className="rounded-t-lg w-full h-full object-cover bg-center"
          src={image}
          alt={name}
        />
      </div>
      <h2 className={classNames("mt-5 font-semibold text-xl", {})}>
        {name} | {year}
      </h2>
      <p className="text-right text-sm">{isUsed}</p>
      <p
        className={classNames("text-lg", {
          "text-white-50": !isEven(number),
          "text-scorpion-700": isEven(number),
        })}
      >
        Harga
      </p>
      <p className="text-lg font-semibold mb-5">
        Rp {price.toLocaleString("id-ID")} / {rentalDay} Hari
      </p>
      <div className="flex gap-8">
        <a
          href="#"
          className={classNames("w-1/2 py-2 text-md rounded-full text-center", {
            "bg-night-shadz-800 hover:bg-night-shadz-900 text-white-50":
              isEven(number),
            "bg-cinderella-100 text-scorpion-700 hover:bg-scorpion-50":
              !isEven(number),
          })}
          onClick={handleOpenDetail}
        >
          Detail
        </a>
        {isUsed !== "Not Ready" && (
          <Link
            to={`/catalog/order/${carId}`}
            className={classNames(
              "w-1/2 py-2 text-md rounded-full text-center",
              {
                "bg-night-shadz-800 hover:bg-night-shadz-900 text-white-50":
                  isEven(number),
                "bg-cinderella-100 text-scorpion-700 hover:bg-scorpion-50":
                  !isEven(number),
              }
            )}
          >
            Pesan Sekarang
          </Link>
        )}
      </div>
      <CarDetail
        isOpen={isDetail}
        onClose={handleCloseDetail}
        imageCar={image}
        nameCar={name}
        detail={description}
      />
    </div>
  );
};

export default CardCatalog;
