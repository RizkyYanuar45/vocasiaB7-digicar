import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Plus, Pen, Trash } from "lucide-react";
import axios from "axios";
import CreateModal from "../../components/admin/Create/CreateModalTestimoni";
import EditModal from "../../components/admin/Edit/EditModalTestimoni";
import dummyImg from "../../assets/image 5.png";

export const Testimoni = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/testimoni",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setErrorMessage("Failed to load testimonials.");
      }
    };
    fetchTestimonials();
  }, []);

  // Handle opening/closing modals
  const handleOpenCreateModal = () => setIsCreateModal(true);
  const handleCloseCreateModal = () => setIsCreateModal(false);

  const handleOpenEditModal = (testimoni) => {
    setSelectedTestimonial(testimoni);
    setIsEditModal(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModal(false);
    setSelectedTestimonial(null);
  };

  const handleDelete = async (testimoniId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:5000/api/testimoni/${testimoniId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimoni) => testimoni._id !== testimoniId)
        );
        alert("Testimonial deleted successfully!");
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        alert("Failed to delete testimonial.");
      }
    }
  };

  const handleTestimonialCreated = (newTestimoni) => {
    setTestimonials((prevTestimonials) => [newTestimoni, ...prevTestimonials]);
  };

  const handleTestimonialUpdated = (updatedTestimoni) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimoni) =>
        testimoni._id === updatedTestimoni._id ? updatedTestimoni : testimoni
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-screen bg-red-500 font-main">
      <Navbar />
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 bg-secondary"
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
                className="flex items-center justify-center text-text bg-white-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <Plus className="mr-3 w-6 h-6" />
                Add Testimonial
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white-50">
                <tr>
                  <th className="px-2 py-1">Photo</th>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Rating</th>
                  <th className="px-2 py-1">Comment</th>
                  <th className="px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimoni) => (
                  <tr key={testimoni._id} className="border-b border-black">
                    <th
                      scope="row"
                      className="px-2 py-1 font-medium whitespace-nowrap"
                    >
                      <img
                        src={`http://localhost:5000/${
                          testimoni.image || dummyImg
                        }`}
                        alt="Testimonial"
                        width={100}
                        height={100}
                        className="max-w-full"
                      />
                    </th>
                    <td className="px-2 py-1 truncate">{testimoni.user}</td>
                    <td className="px-2 py-1 truncate">{testimoni.rating}</td>
                    <td className="px-2 py-1 max-w-[10rem] truncate">
                      {testimoni.comment}
                    </td>
                    <td className="px-2 py-1">
                      <div
                        onClick={() => handleOpenEditModal(testimoni)}
                        className="flex items-center bg-blue-700 text-white-50 p-1 rounded-xl justify-center cursor-pointer"
                      >
                        <Pen width={15} className="mr-2 md:mr-6" />
                        Edit
                      </div>
                      <div
                        onClick={() => handleDelete(testimoni._id)}
                        className="flex items-center bg-red-700 justify-center text-white-50 p-1 rounded-xl cursor-pointer"
                      >
                        <Trash width={15} className="mr-2 md:mr-3" />
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

      {/* Create Testimonial Modal */}
      <CreateModal
        isOpen={isCreateModal}
        onClose={handleCloseCreateModal}
        onTestimoniCreated={handleTestimonialCreated}
      />

      {/* Edit Testimonial Modal */}
      {selectedTestimonial && (
        <EditModal
          isOpen={isEditModal}
          onClose={handleCloseEditModal}
          testimoniData={selectedTestimonial}
          onTestimoniUpdated={handleTestimonialUpdated}
        />
      )}
    </div>
  );
};
