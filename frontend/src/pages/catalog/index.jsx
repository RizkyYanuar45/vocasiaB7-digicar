import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import CardCatalog from "../../components/CardCatalog";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewYearActive, setIsNewYearActive] = useState(false);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cars/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        throw new Error("Data format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleNewYear = () => {
    setIsNewYearActive((prev) => !prev);
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearchTerm = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear = isNewYearActive ? car.tahun >= 2021 : true;
    return matchesSearchTerm && matchesYear;
  });

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
              melakukan perjalanan dalam dan luar kota di seluruh Indonesia.
              Berikut ini adalah beberapa pilihan kategori mobil yang bisa Anda
              sewa sesuai kebutuhan Anda.
            </p>
            <div className="bg-white-50 rounded w-7/12 flex p-2">
              <input
                type="text"
                className="w-8/12 text-black-950 px-5"
                placeholder="Masukkan Pilihan Anda"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="bg-night-shadz-700 text-lg font-semibold text-white-50 w-4/12 rounded p-2">
                Cari
              </button>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <button
                onClick={handleToggleNewYear}
                className={`p-2 rounded-lg ${
                  isNewYearActive
                    ? "bg-primary text-white-50 font-main "
                    : "bg-transparent outline outline-1 outline-primary font-main"
                }`}
              >
                Tahun Baru
              </button>
              <h3>Filter mobil dengan tahun diatas 2021</h3>
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
          {loading ? (
            <div className="text-center col-span-full">Loading...</div>
          ) : error ? (
            <div className="text-center col-span-full text-red-500">
              {error}
            </div>
          ) : (
            filteredCars.map((car, idx) => (
              <CardCatalog
                key={car._id}
                carId={car._id}
                number={idx}
                image={`http://localhost:5000/${car.image.replace(/\\/g, "/")}`}
                name={car.name}
                price={car.pricePerDay}
                year={car.tahun}
                rentalDay={1}
                description={car.description}
                isUsed={car.isUsed === "Ready" ? "Ready" : "Not Ready"}
              />
            ))
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Catalog;
