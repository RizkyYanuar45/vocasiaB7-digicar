import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/admin/Navbar";
import { Search, Plus, Pen, Trash } from "lucide-react";
import CreateModal from "../../components/admin/Create/CreateModalCar";
import EditModal from "../../components/admin/Edit/EditModalCar";
import Swal from "sweetalert2";

const AlertDelete = async (onConfirm) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
    if (onConfirm) {
      onConfirm();
      window.location.reload();
    }
  } else if (result.isDismissed) {
    console.log("Deletion canceled");
  }
};

export const Car = () => {
  const [cars, setCars] = useState([]);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [token] = useState(localStorage.getItem("token"));
  const [searchTerm, setSearchTerm] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleCreateCar = async (newCar) => {
    console.log("New Car:", newCar);
    try {
      const response = await axiosInstance.post("/cars", newCar);
      setCars((prev) => [...prev, response.data]);
      setIsCreateModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axiosInstance.delete(`/cars/${carId}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const confirmDelete = (carId) => {
    AlertDelete(() => handleDeleteCar(carId));
  };

  const handleEditCar = async (updatedCar) => {
    console.log("Updated Car:", updatedCar);
    try {
      const response = await axiosInstance.put(
        `/cars/${updatedCar.id}`,
        updatedCar
      );
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === updatedCar._id ? response.data : car
        )
      );
      setIsEditModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row w-screen bg-red-500">
      <Navbar />
      {/* Start Block */}
      <section className="relative w-full max-w-full overflow-hidden text-text pt-16 md:pt-0">
        <div className="bg-secondary relative shadow-md overflow-hidden lg:ml-44">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-2 p-4 bg-primary">
            <div className="w-full md:w-1/2">
              <form className="flex items-center w-full">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 bg-secondary dark:focus:border-primary-500"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsCreateModal(true)}
                className="flex items-center justify-center text-text bg-white-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <Plus className="mr-3 w-6 h-6" />
                Add Product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white-50">
                <tr>
                  <th className="px-2 py-1">Car Name</th>
                  <th className="px-2 py-1">Status</th>
                  <th className="px-2 py-1">Year</th>
                  <th className="px-2 py-1">Price Per Day</th>
                  <th className="px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car._id} className="border-b border-black">
                    <td className="px-2 py-1">{car.name}</td>
                    <td className="px-2 py-1">
                      {!car.isUsed ? "No Status" : car.isUsed}
                    </td>
                    <td className="px-2 py-1">{car.tahun}</td>
                    <td className="px-2 py-1">{car.pricePerDay}</td>
                    <td className="px-2 py-1">
                      <div
                        onClick={() => {
                          setSelectedCar(car);
                          setIsEditModal(true);
                        }}
                        className="flex items-center bg-blue-700 text-white-50 p-1 rounded-xl justify-center cursor-pointer"
                      >
                        <Pen width={15} className="mr-2 md:mr-6" />
                        Edit
                      </div>
                      <div
                        onClick={() => confirmDelete(car._id)}
                        className="flex items-center bg-red-700 text-white-50 p-1 rounded-xl justify-center cursor-pointer"
                      >
                        <Trash width={15} className="mr-2 md:mr-6" />
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {isCreateModal && (
        <CreateModal
          isOpen={isCreateModal}
          onClose={() => setIsCreateModal(false)}
          onCreate={handleCreateCar}
        />
      )}

      {isEditModal && selectedCar && (
        <EditModal
          isOpen={isEditModal}
          onClose={() => setIsEditModal(false)}
          onEdit={handleEditCar}
          selectedCar={selectedCar}
        />
      )}
    </div>
  );
};
