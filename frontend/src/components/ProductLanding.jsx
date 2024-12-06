import * as React from "react";

export function ProductLanding() {
  const products = [
    {
      id: 1,
      name: "Toyota Avanza 2018",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb0fd41b18b94317b366a31fb4560fa9eed57c33f3b808976e78cf14b738c946?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      plate: "Plat Genap",
      price: "420.000",
      color: "bg-red-100"
    },
    {
      id: 2,
      name: "Honda Yaris",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1646184a56752d2746a179f2d6198c17ad997cd44ba1799a8a49eba47a00b647?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      plate: "Plat Genap", 
      price: "500.000",
      color: "bg-stone-600"
    },
    {
      id: 3,
      name: "Toyota Avanza 2018",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb0fd41b18b94317b366a31fb4560fa9eed57c33f3b808976e78cf14b738c946?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
      plate: "Plat Genap",
      price: "420.000",
      color: "bg-red-100"
    }
  ];

  return (
    <section 
      id="products"
      className="bg-rose-800 py-20 px-4 rounded-[130px_0px_0px_0px]"
      aria-labelledby="products-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          id="products-heading"
          className="text-5xl font-bold text-white mb-8"
        >
          Produk
        </h2>
        <div className="flex justify-end mb-8">
          <button className="text-lg font-medium text-white hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 rounded-lg px-4 py-2">
            Lihat Semua
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <article 
              key={product.id}
              className={`rounded-3xl ${product.color} p-8`}
              aria-labelledby={`product-${product.id}-heading`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-3xl mb-6"
              />
              <h3 
                id={`product-${product.id}-heading`}
                className="text-2xl font-bold text-black mb-2"
              >
                {product.name}
              </h3>
              <p className="text-lg text-stone-600 mb-4">{product.plate}</p>
              <div className="text-2xl font-bold mb-6">
                Rp. {product.price}/ 1 Hari
              </div>
              <button 
                className="w-full py-3 px-6 bg-rose-800 text-white rounded-xl hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-800 focus:ring-offset-2"
                aria-label={`Chat WhatsApp untuk ${product.name}`}
              >
                Chat Melalui WhatsApp
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}