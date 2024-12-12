import * as React from "react";

export function ProductLanding() {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/bb0fd41b18b94317b366a31fb4560fa9eed57c33f3b808976e78cf14b738c946?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
      title: "Toyota Avanza 2018",
      plateType: "Plat Genap",
      price: "Rp. 420.000/ 1 Hari",
      variant: "light",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/1646184a56752d2746a179f2d6198c17ad997cd44ba1799a8a49eba47a00b647?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
      title: "Honda Yaris",
      plateType: "Plat Genap",
      price: "Rp. 500.000/ 1 Hari",
      variant: "dark",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/9af91ebbe5bc4a9dae2426d5e5853966/bb0fd41b18b94317b366a31fb4560fa9eed57c33f3b808976e78cf14b738c946?apiKey=9af91ebbe5bc4a9dae2426d5e5853966&",
      title: "Toyota Avanza 2018",
      plateType: "Plat Genap",
      price: "Rp. 420.000/ 1 Hari",
      variant: "light",
    },
  ];

  const ProductCard = ({
    image,
    title,
    plateType,
    price,
    variant = "light",
  }) => {
    const bgColor = variant === "dark" ? "bg-stone-600" : "bg-red-100";
    const textColor = variant === "dark" ? "text-white" : "text-black";
    const buttonBg = variant === "dark" ? "bg-rose-100" : "bg-rose-800";
    const buttonText = variant === "dark" ? "text-neutral-500" : "text-white";

    return (
      <div className={`flex flex-col grow max-md:mt-7 max-md:max-w-full`}>
        <div
          className={`flex flex-col pt-7 pb-20 w-full ${bgColor} rounded-3xl max-md:max-w-full`}
        >
          <img
            loading="lazy"
            src={image}
            alt={`${title} car`}
            className="object-contain self-center max-w-full rounded-3xl aspect-[1.51] w-[369px]"
          />
          <div
            className={`flex flex-col px-7 mt-4 w-full font-medium ${textColor} max-md:max-w-full`}
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{title}</div>
              <div className="text-lg">{plateType}</div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="text-black font-bold text-2xl">Harga</div>{" "}
              {/* Ensure label 'Harga' matches title size */}
              <div className={`text-2xl font-bold mt-2 ${textColor}`}>
                {price}
              </div>
            </div>
            <div className="flex gap-5 justify-between self-stretch mt-16 w-full text-xl max-md:mt-10">
              <button
                className={`gap-2.5 self-stretch px-6 py-3 whitespace-nowrap ${buttonBg} rounded-xl max-md:px-5 ${buttonText}`}
                aria-label={`View details for ${title}`}
              >
                Detail
              </button>
              <button
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
          <h1 className="text-5xl font-bold text-white max-md:text-4xl">
            Produk
          </h1>
        </div>
        <div className="flex justify-end">
          <button
            className="text-lg font-medium text-white underline max-md:mt-2"
            aria-label="View all products"
          >
            Lihat Semua
          </button>
        </div>
        <div className="mt-11 max-md:mt-10 max-md:max-w-full relative">
          <div className="flex gap-5 max-md:flex-col px-12">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
