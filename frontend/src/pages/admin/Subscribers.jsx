import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Trash } from "lucide-react";
import axios from "axios";

export const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWFkOTQzMDQwMDQ0ODU2MzRjMDdjNiIsImlhdCI6MTczNDAyMDA3NCwiZXhwIjoxNzM2NjEyMDc0fQ.19rMe5i0d5KcY5pX1GVrrAx2PZd7NzOzwoyXFSOhSLM"; 

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subscriber", {
          headers: {
            Authorization: token,
          },
        });
        setSubscribers(response.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
        setErrorMessage("Failed to load subscribers.");
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (email) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this subscriber?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/subscriber/${email}`, {
          headers: {
            Authorization: token,
          },
        });
  
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((subscriber) => subscriber.email !== email)
        );
  
        alert("Subscriber deleted successfully!");
      } catch (error) {
        console.error("Error deleting subscriber:", error);
        alert("Failed to delete subscriber.");
      }
    }
  };
  
  return (
    <div className="flex flex-col w-screen bg-red-500">
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 bg-secondary dark:focus:border-primary-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white-50">
                <tr>
                  <th className="px-2 py-1">Email</th>
                  <th className="px-2 py-1">Subscribe At</th>
                  <th className="px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="border-b border-black">
                    <td className="px-2 py-1">{subscriber.email}</td>
                    <td className="px-2 py-1">{subscriber.createdAt}</td>
                    <td className="px-2 py-1">
                      <div
                        onClick={() => handleDelete(subscriber.email)}
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
    </div>
  );
};
