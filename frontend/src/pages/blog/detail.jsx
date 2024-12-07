import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import { NavLink } from "react-router-dom";

const BlogDetail = () => {
  return (
    <>
      <Navbar isBgWhite={false} />
      <Container>
        <div className="py-28">
          <NavLink
            to="/blog"
            className="text-white-50 bg-night-shadz-700 rounded px-8 py-3"
          >
            &larr; Kembali
          </NavLink>
          <h1 className="text-black-950 text-3xl lg:text-5xl my-14">
            Wisata Antapura De Djati Garut, Cocok buat Uji Adrenalin
          </h1>
          <div className="relative w-full h-[300px] lg:h-[550px] mb-14">
            <img
              src="https://www.toyotasolo.id/ss/pm/toyotasolo_11uyDot97is5m6noyt222330ade24.webp"
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg">
            Tourist Experience atau pengalaman wisatawan, menjadi salah satu
            komponen penting dalam pengembangan wisata daerah yang identik
            dengan kekayaan budaya, keindahan pemandangan dan lingkungan alami.
            Terbaru, ada tempat wisata seru yang lokasinya berada di Kabupaten
            Garut Jawa Barat. Apalagi, harga tiket masuk obyek wisata ini
            terbilang sangat terjangkau. Obyek wisata Antapura De Djati Garut,
            yang berlokasi di Kecamatan Cibiuk, Kabupaten Garut, Jawa Barat
            mengajak wisatawan menguji adrenalin sambil menikmati panorama alam
            yang menawan. Intan, salah satu pengunjung wisata Antapura De Djati
            Garut mengatakan, selain keseruan permainan menantang, wisatawan
            bisa menikmati indahnya panorama alam sekaligus menikmati kuliner
            khas Jawa Barat di Restoran Cibiuk. Intan mengaku datang ke lokasi
            wisata ini bersama sang suami dan anaknya. Dirinya mengatakan baru
            pertama kalinya datang ke lokasi tersebut, karena penasaran
            mengetahui Antapura De Djati melalui media sosial (Medsos).
            "Ternyata, lokasi wisata Antapura De Djati ini memiliki pemandangan
            yang sangat indah," tandasnya. Sementara, pengunjung lain, Anita
            mengatakan menjajal permainan ayunan terbang di lokasi wisata ini
            sangat seru dan menghibur. "Datang kesini tujuannya liburan bersama
            teman sambil menikmati suasana pemandangan yang asyik," ujar Anita.
            "Untuk tiket permainan yang kami sediakan hanya sebesar Rp 15.000
            untuk sekali mencoba," jelasnya. Wildan menambahkan, melihat
            tingginya animo pengunjung Antapua De Djati terhadap wahana
            permainan, pihaknya akan menambah lebih banyak fasilitas.
            "Kebanyakan pengunjung datang kesini, ingin menikmati panorama
            wisata dan sambil makan bersama keluarga. Saat liburan sekolah,
            biasanya pengunjung lebih ramai dan banyak anak-anak," pungkasnya.
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDetail;
