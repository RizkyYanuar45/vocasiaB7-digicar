import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Trash } from "lucide-react";
import axios from "axios";
import AlertDelete from "../../components/admin/Notification/AlertDelete";
import { formatDate } from "../../components/utils/FormatDate";

export const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subscriber",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscribers(response.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
        setErrorMessage("Failed to load subscribers.");
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = (email) => {
    const confirmDelete = AlertDelete(() => deleteSubscriber(email));
    confirmDelete();
  };

  const deleteSubscriber = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/api/subscriber/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((subscriber) => subscriber.email !== email)
      );
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to delete subscriber.");
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="border-b border-black">
                    <td className="px-2 py-1">{subscriber.email}</td>
                    <td className="px-2 py-1">
                      {formatDate(subscriber.createdAt)}
                    </td>
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
