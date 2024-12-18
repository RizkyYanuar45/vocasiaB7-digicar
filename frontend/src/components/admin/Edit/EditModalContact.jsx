import React, { useEffect, useState } from "react";
import { Pen } from "lucide-react";

function EditModal({ isOpen, onClose, contactData }) {
  const [formData, setFormData] = useState({
    tiktok: "",
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
    linkedln: "",
    admin_one: "",
    admin_two: "",
    email: "",
  });

  useEffect(() => {
    if (isOpen && contactData) {
      setFormData(contactData);
    }
  }, [isOpen, contactData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/contact/${contactData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Contact updated successfully");
        onClose();
      } else {
        console.error("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
      aria-hidden="true"
    >
      <div className="relative p-6 w-full max-w-4xl">
        {/* Modal content */}
        <div className="relative bg-secondary rounded-lg outline-1 outline shadow-2xl">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-text">Edit Contact</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="tiktok"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  TikTok
                </label>
                <input
                  type="text"
                  name="tiktok"
                  id="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://www.tiktok.com/@example"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="instagram"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://www.instagram.com/example"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="facebook"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://www.facebook.com/example"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="youtube"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  YouTube
                </label>
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://www.youtube.com/c/example"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="twitter"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Twitter
                </label>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://twitter.com/example"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="linkedln"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedln"
                  id="linkedln"
                  value={formData.linkedln}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://www.linkedin.com/in/example"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="admin_one"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Admin 1
                </label>
                <input
                  type="number"
                  name="admin_one"
                  id="admin_one"
                  value={formData.admin_one}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="08881"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="admin_two"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Admin 2
                </label>
                <input
                  type="number"
                  name="admin_two"
                  id="admin_two"
                  value={formData.admin_two}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="08881"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="contact@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white-50 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <Pen />
              Edit Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
