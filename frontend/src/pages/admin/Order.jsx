import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Check, Ban, X } from "lucide-react";
import AlertDecline from "../../components/admin/Notification/AlertDecline.jsx";
import AlertApprove from "../../components/admin/Notification/AlertApprove.jsx";
import { formatDate } from "../../components/utils/FormatDate.js";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data dari API:", data);

      const filteredOrders = data.orders.filter(
        (order) => order.paymentStatus !== "Belum Bayar"
      );

      console.log("Filtered Orders:", filteredOrders);

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.message);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error declining order:", error);
    }
  };

  const handleApprove = async (id, amount, name) => {
    const data = {
      grossAmount: Number(amount),
      itemName: name,
      orderId: id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(
          "car already taken, decline this order or wait for previous car order !"
        );
        throw new Error("Network response was not ok: " + errorData.message);
      }

      const result = await response.json();
      console.log(result.message);

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showAlertDecline = (orderId) => {
    const alertFunction = AlertDecline(handleDecline);
    alertFunction(orderId);
  };

  const showAlertApprove = (orderId, amount, name) => {
    const alertFunction = AlertApprove(handleApprove, amount, name);
    alertFunction(orderId);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    placeholder="Search by Client Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                  <th className="px-2 py-1">Client Name</th>
                  <th className="px-2 py-1">Borrow Date</th>
                  <th className="px-2 py-1">Return Date</th>
                  <th className="px-2 py-1">Total Pay</th>
                  <th className="px-2 py-1">Car Name</th>
                  <th className="px-2 py-1">Client KTP</th>
                  <th className="px-2 py-1">Client SIM</th>
                  <th className="px-2 py-1">Client email</th>
                  <th className="px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-black">
                      <td className="px-2 py-1 truncate">{order.name}</td>
                      <td className="px-2 py-1 truncate">
                        {formatDate(order.startDate)}
                      </td>
                      <td className="px-2 py-1 truncate">
                        {formatDate(order.endDate)}
                      </td>
                      <td className="px-2 py-1 truncate">
                        Rp. {order.totalPayment.toLocaleString("id-ID")}
                      </td>
                      <td className="px-2 py-1 truncate">
                        {order.car.name} {order.car.tahun}
                      </td>
                      <td className="px-2 py-1">
                        <img
                          src={`http://localhost:5000/${order.ktp.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt="Client KTP"
                          width={100}
                          height={100}
                          className="max-w-full cursor-pointer"
                          onClick={() =>
                            openModal(
                              `http://localhost:5000/${order.ktp.replace(
                                /\\/g,
                                "/"
                              )}`
                            )
                          }
                        />
                      </td>
                      <td className="px-2 py-1">
                        <img
                          src={`http://localhost:5000/${order.stnk.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt="Client SIM"
                          width={100}
                          height={100}
                          className="max-w-full cursor-pointer"
                          onClick={() =>
                            openModal(
                              `http://localhost:5000/${order.stnk.replace(
                                /\\/g,
                                "/"
                              )}`
                            )
                          }
                        />
                      </td>
                      <td className="px-2 py-1 max-w-[10rem] truncate">
                        {order.contact}
                      </td>
                      <td className="px-2 py-1">
                        <div
                          onClick={() =>
                            showAlertApprove(
                              order._id,
                              order.totalPayment,
                              order.car.name
                            )
                          }
                          className="flex items-center bg-green-600 text-white-50 p-1 rounded-xl justify-center cursor-pointer"
                        >
                          <Check width={15} className="mr-2 md:mr-6" />
                          Accept
                        </div>
                        <div
                          onClick={() => showAlertDecline(order._id)}
                          className="flex items-center bg-red-700 justify-center text-white-50 p-1 rounded-xl cursor-pointer"
                        >
                          <Ban width={15} className="mr-2 md:mr-3" />
                          Decline
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal untuk menampilkan gambar */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
