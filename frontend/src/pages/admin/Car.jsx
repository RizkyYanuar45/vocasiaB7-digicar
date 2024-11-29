import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Plus, Pen, Trash } from "lucide-react";
import dummyImg from "./../../assets/image 5.png";
import AlertDelete from "./../../components/admin/Notification/AlertDelete";
import CreateModal from "../../components/admin/Create/CreateModalCar";
import EditModal from "../../components/admin/Edit/EditModalCar";

export const Car = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setIsCreateModal(false);
  };
  const handleOpenEditModal = () => {
    setIsEditModal(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModal(false);
  };
  const handleDelete = AlertDelete(() => {
    console.log("item berhasil dihapus");
  });

  return (
    <div className="flex flex-col md:flex-row w-screen bg-red-500">
      <Navbar />
      {/* Start Block */}
      <section className="relative w-full max-w-full overflow-hidden text-text pt-16 md:pt-0">
        {" "}
        {/* Hilangkan padding atas di desktop */}
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
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center text-text bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <Plus className="mr-3 w-6 h-6" />
                Add Product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white">
                <tr>
                  <th className="px-2 py-1">Image</th>
                  <th className="px-2 py-1">Car Name</th>
                  <th className="px-2 py-1">Plate Type</th>
                  <th className="px-2 py-1">Year</th>
                  <th className="px-2 py-1">Price Per Day</th>
                  <th className="px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black">
                  <th
                    scope="row"
                    className="px-2 py-1 font-medium whitespace-nowrap"
                  >
                    <img
                      src={dummyImg}
                      alt=""
                      width={100}
                      height={100}
                      className="max-w-full"
                    />
                  </th>
                  <td className="px-2 py-1">Toyota Rush 2021</td>
                  <td className="px-2 py-1">Genap</td>
                  <td className="px-2 py-1 max-w-[10rem] truncate">2014</td>
                  <td className="px-2 py-1">500.000</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center bg-blue-700 text-white p-1 rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2 md:mr-6" />
                      Edit
                    </div>
                    <div
                      onClick={handleDelete}
                      className="flex items-center bg-red-700 justify-center text-white p-1 rounded-xl cursor-pointer"
                    >
                      <Trash width={15} className="mr-2 md:mr-3" />
                      Delete
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal */}
      <CreateModal isOpen={isCreateModal} onClose={handleCloseCreateModal} />
      <EditModal isOpen={isEditModal} onClose={handleCloseEditModal} />
    </div>
  );
};
