import classNames from "classnames";
import React from "react";

const isEven = (number) => number % 2 == 0;

const CardCatalog = ({
  number,
  name,
  image,
  typeNumberPlate,
  price,
  rentalDay,
}) => {
  return (
    <div
      id="card"
      className={classNames("px-6 py-8 rounded-lg w-full flex flex-col", {
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
      <h2 className={classNames("mt-5 font-semibold text-xl", {})}>{name}</h2>
      <p className="text-right text-sm">
        {typeNumberPlate == 0 ? "Plat Genap" : "Plat Ganjil"}
      </p>
      <p
        className={classNames("text-lg", {
          "text-white-50": !isEven(number),
          "text-scorpion-700": isEven(number),
        })}
      >
        Harga
      </p>
      <p className="text-lg font-semibold mb-5">
        Rp.{price} / {rentalDay} Hari
      </p>
      <a
        href="#"
        className={classNames("w-full py-3 text-lg rounded-lg text-center", {
          "bg-night-shadz-800 hover:bg-night-shadz-900 text-white-50":
            isEven(number),
          "bg-cinderella-100 text-scorpion-700 hover:bg-scorpion-50":
            !isEven(number),
        })}
      >
        Chat Melaui WhatsApp
      </a>
    </div>
  );
};

export default CardCatalog;