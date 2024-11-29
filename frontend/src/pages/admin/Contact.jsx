import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Plus, Pen, Trash } from "lucide-react";
import EditModal from "../../components/admin/Edit/EditModalContact";

export const Contact = () => {
  const [isEditModal, setIsEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModal(false);
  };

  return (
    <div className="flex flex-col w-screen bg-red-500">
      <Navbar />
      {/* Start Block */}
      <section className="relative w-full max-w-full overflow-hidden text-text pt-16 md:pt-0">
        {" "}
        {/* Padding untuk menghindari navbar */}
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-2 bg-secondary dark:focus:border-primary-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white">
                <tr>
                  <th className="px-2 py-1">Contact Name</th>
                  <th className="px-2 py-1">Link / Number</th>
                  <th className="px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Tiktok</td>
                  <td className="px-2 py-1 truncate">Http</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Instagram</td>
                  <td className="px-2 py-1 truncate">Http</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Facebook</td>
                  <td className="px-2 py-1 truncate">Http</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Youtube</td>
                  <td className="px-2 py-1 truncate">Http</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Twitter</td>
                  <td className="px-2 py-1 truncate">Http</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">LinkedIn</td>
                  <td className="px-2 py-1 truncate">Http</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Admin 1</td>
                  <td className="px-2 py-1 truncate">088</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Admin 2</td>
                  <td className="px-2 py-1 truncate">088</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-black">
                  <td className="px-2 py-1 truncate">Email</td>
                  <td className="px-2 py-1 truncate">digicar@gmail.com</td>
                  <td className="px-2 py-1">
                    <div
                      onClick={handleOpenEditModal}
                      className="flex items-center w-fit p-3 bg-blue-700 text-white rounded-xl justify-center cursor-pointer"
                    >
                      <Pen width={15} className="mr-2" />
                      Edit
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Modal */}
      <EditModal isOpen={isEditModal} onClose={handleCloseEditModal} />
    </div>
  );
};
