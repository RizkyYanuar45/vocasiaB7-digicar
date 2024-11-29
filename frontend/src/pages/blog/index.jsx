import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import CardBlog from "../../components/CardBlog";

const Blog = () => {
  return (
    <>
      <Navbar isBgWhite={false} />
      <Container>
        <div className="py-28 flex flex-col items-center">
          <h1 className="text-5xl font-semibold mb-3">
            Berita <span className="text-night-shadz-700">DigiCar</span>Point
          </h1>
          <p className="text-2xl">
            Jangan sampai ketinggalan informasi dan promo kami!
          </p>
        </div>
        <div className="pb-28 space-y-32">
          <CardBlog
            title="Informasi Terkini"
            description="Temukan kenyamanan dan kehandalan dalam setiap momen bersama Digicar, kami hadirkan informasi menarik untuk perjalananmu."
            bgJon={true}
            articles={[
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
            ]}
          />
          <CardBlog
            title="Seputar Mobil"
            description="Mobil keluarga hingga kendaraan kelas premium, penyewaan mobil tidak hanya memberikan fleksibilitas, tetapi juga memberikan kemudahan dalam menyesuaikan pilihan mobil sesuai kebutuhan."
            bgNightShadz={true}
            articles={[
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
            ]}
          />
          <CardBlog
            title="Destinasi Populer"
            description="Indonesia memiliki sejuta tempat menarik. Ayo temukan berbagai tempat wisata dan tempat makan menarik yang mesti kamu kunjungi."
            bgScorpio={true}
            articles={[
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
              {
                image:
                  "https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp",
                title:
                  "Piknik Bersama Keluarga dari Ramainya Pusat Kota, Mobil Nyaman untuk Anak, ada di DigiCar!",
                description:
                  "Bagi para penggemar petualangan yang tak kenal batas, Digicar menghadirkan pilihan mobil macho yang siap menghadapi segala tantangan jalanan berbatu.",
              },
            ]}
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Blog;
