import React from "react";
import Container from "../../components/Container";
import CardCatalog from "../../components/CardCatalog";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Catalog = () => {
  const cars = [
    {
      image:
        "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/jpg/Daihatsu-Xenia-01.jpg",
      name: "Daihatsu Xenia 2019",
      price: "500.000",
      rentalDay: 1,
      typeNumberPlate: 1,
    },
    {
      image:
        "https://t-3.tstatic.net/jualbeli/img/njajal/2022/11/Ilustrasi-mobil-Mitsubishi-Xpander--Tribunnews.com---1315114746.jpg",
      name: "Mishubitsi Xpander 2019",
      price: "550.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
    {
      image:
        "https://imgx.gridoto.com/crop/0x0:830x470/700x465/photo/gridoto/2017/10/13/970840647.jpg",
      name: "Nissan Grand Livina 2018",
      price: "450.000",
      rentalDay: 1,
      typeNumberPlate: 1,
    },
    {
      image: "https://www.toyotanasmocosolo.id/file/yarisgr-03.jpg",
      name: "Honda Yaris 2019",
      price: "500.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
    {
      image:
        "https://imgx.gridoto.com/crop/0x0:0x0/700x465/photo/2020/12/04/1939183650.jpg",
      name: "Toyta Calya 2020",
      price: "550.000",
      rentalDay: 1,
      typeNumberPlate: 1,
    },
    {
      image:
        "https://images.autofun.co.id/file1/2febf60ed0b74a14b86bb8c8740362f5_606x402.jpg",
      name: "Toyota Agya 2010",
      price: "450.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
    {
      image:
        "https://img.cintamobil.com/crop/640x360/2024/10/15/d8miimage-1f07.png",
      name: "Toyta Avanza 2018",
      price: "420.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
    {
      image:
        "https://carnetwork.s3.ap-southeast-1.amazonaws.com/file/f81c18001e824950b70fac5ed4b93302.jpg",
      name: "Honda Brio 2021",
      price: "500.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
    {
      image:
        "https://res.cloudinary.com/mufautoshow/image/upload/v1637399909/moas/type/1637399906_1_all-new-avanza.jpg",
      name: "All New Avanza 2023",
      price: "700.000",
      rentalDay: 1,
      typeNumberPlate: 1,
    },
    {
      image:
        "https://res.cloudinary.com/mufautoshow/image/upload/f_auto,f_auto/w_1200/v1619398190/moas/news/1619398194_review-honda-mobilio-new-2021-spesifikasi-lengkap-harganya.png",
      name: "Honda Mobilio 2021",
      price: "550.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
    {
      image:
        "https://asset.kompas.com/crops/5pshS8uLnBI6LqDSuOXSutPO8hA=/493x0:8437x5296/750x500/data/photo/2022/06/09/62a20870e7623.jpg",
      name: "Toyota Kijang Innova 2022",
      price: "600.000",
      rentalDay: 1,
      typeNumberPlate: 1,
    },
    {
      image:
        "https://s3-us-west-2.amazonaws.com/motoraty-media/newcars/listing/10173/2021-toyota-rush-suv-rush-gx-%D8%AA%D9%88%D9%8A%D9%88%D8%AA%D8%A7-%D8%B1%D8%A7%D8%B4-%D9%85%D8%AA%D8%B9%D8%AF%D8%AF%D8%A9-%D8%A7%D9%84%D8%A7%D8%BA%D8%B1%D8%A7%D8%B6-%D8%B1%D8%B4-1586981241.3963.jpg",
      name: "Toyota Rush 2021",
      price: "580.000",
      rentalDay: 1,
      typeNumberPlate: 0,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-cinderella-100 to-white-50">
        <div className="container w-full py-24 flex">
          <div className="flex flex-col w-full md:w-7/12">
            <h1 className="text-4xl text-night-shadz-700 font-bold">
              Pilih Armada Anda..
            </h1>
            <p className="text-lg font-base my-3 text-scorpion-700">
              Kami hanya menyediakan unit mobil berkualitas yang siap untuk
              melakukan perjalanan dalam dan luar kota di seluruh indonesia.
              Berikut ini adalah beberapa pilihan kategori mobil yang bisa anda
              sewa sesuai kebutuhan anda.
            </p>
            <div className="bg-white-50 rounded w-7/12 flex p-2">
              <input
                type="text"
                className="w-8/12 text-black-950 px-5"
                placeholder="Masukkan Pilihan Anda"
              />
              <button className="bg-night-shadz-700 text-lg font-semibold text-white-50 w-4/12 rounded p-2">
                Cari
              </button>
            </div>
          </div>
          <div className="hidden md:block md:w-5/12 relative p-5">
            <img
              src="/catalog.png"
              alt="catalog"
              className="w-full h-full bg-contain"
            />
          </div>
        </div>
      </div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-y-10 md:gap-x-10 py-10">
          {cars.map((car, idx) => (
            <CardCatalog
              key={idx}
              number={idx}
              image={car.image}
              name={car.name}
              price={car.price}
              rentalDay={car.rentalDay}
              typeNumberPlate={1}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Catalog;
