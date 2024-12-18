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
      className={classNames("flex flex-col p-4 rounded-lg w-full", {
        "bg-scorpion-700 text-white-50": !isEven(number),
        "bg-cinderella-100 text-black-950": isEven(number),
      })}
    >
      <div className="w-full relative h-[150px]">
        <img
          className="rounded-lg w-full h-full object-cover"
          src={image}
          alt={name}
        />
      </div>
      <h2 className={classNames("mt-3 font-semibold text-lg")}>
        {name} | {year}
      </h2>
      <p className="text-right text-xs">{isUsed}</p>
      <p
        className={classNames("text-md", {
          "text-white-50": !isEven(number),
          "text-scorpion-700": isEven(number),
        })}
      >
        Harga
      </p>
      <p className="text-md font-semibold mb-4">
        Rp {price.toLocaleString("id-ID")} / {rentalDay} Hari
      </p>
      <div className="flex flex-col md:flex-row gap-2">
        <a
          href="#"
          className={classNames(
            "w-full py-2 text-sm rounded-full text-center",
            {
              "bg-night-shadz-800 hover:bg-night-shadz-900 text-white-50":
                isEven(number),
              "bg-cinderella-100 text-scorpion-700 hover:bg-scorpion-50":
                !isEven(number),
            }
          )}
          onClick={handleOpenDetail}
        >
          Detail
        </a>
        {isUsed !== "Not Ready" && (
          <Link
            to={`/catalog/order/${carId}`}
            className={classNames(
              "w-full py-2 text-sm rounded-full text-center",
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
