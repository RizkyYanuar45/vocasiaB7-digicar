import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import CardBlog from "../../components/CardBlog";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [seputarMobil, setSeputarMobil] = useState([]);
  const [destinasiPopuler, setDestinasiPopuler] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog");
        const allBlogs = await response.json();

        const responseMobil = await fetch(
          "http://localhost:5000/api/blog?category=Seputar Mobil"
        );
        const dataMobil = await responseMobil.json();

        const responseDestinasi = await fetch(
          "http://localhost:5000/api/blog?category=Destinasi Populer"
        );
        const dataDestinasi = await responseDestinasi.json();

        // Set fetched blogs to state
        setBlogs(allBlogs);
        setSeputarMobil(dataMobil);
        setDestinasiPopuler(dataDestinasi);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogs();
  }, []);

  const latestBlogs = blogs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <>
      <Navbar isBgWhite={false} />
      <Container>
        <div className="py-28 flex flex-col items-center animate__animated animate__slideInUp">
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
            articles={latestBlogs}
          />
          <CardBlog
            title="Destinasi Populer"
            description="Indonesia memiliki sejuta tempat menarik. Ayo temukan berbagai tempat wisata dan tempat makan menarik yang mesti kamu kunjungi."
            bgScorpio={true}
            articles={destinasiPopuler}
          />
          <CardBlog
            title="Seputar Mobil"
            description="Mobil keluarga hingga kendaraan kelas premium, penyewaan mobil tidak hanya memberikan fleksibilitas, tetapi juga memberikan kemudahan dalam menyesuaikan pilihan mobil sesuai kebutuhan."
            bgNightShadz={true}
            articles={seputarMobil}
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Blog;
