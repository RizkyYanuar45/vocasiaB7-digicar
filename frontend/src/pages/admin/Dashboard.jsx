import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import AlertCarReturn from "../../components/admin/Notification/AlertCarReturn";

export const Dashboard = () => {
  const [onRoadCars, setOnRoadCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingPayment, setCheckingPayment] = useState(false);

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTg0ZjcxMTYwZGU1MzBmZDhiM2JlNSIsImlhdCI6MTczMzg0MDc4MSwiZXhwIjoxNzM2NDMyNzgxfQ.Un9pZX41gXDBeLvHa9DHAO4qNgsIViSfhdBmE1wlsT4"; // Ganti dengan token yang valid

  const fetchOnRoadCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data dari API:", data);

      const filteredOrders = data.orders.filter(
        (order) =>
          order.paymentStatus === "Belum Bayar" ||
          order.paymentStatus === "Berhasil"
      );

      console.log("Filtered Orders:", filteredOrders);

      setOnRoadCars(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async (orderId) => {
    setCheckingPayment(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/check/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.message);
      window.location.reload();
    } catch (error) {
      console.error("Error checking payment:", error);
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleCarReturn = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/delete/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setOnRoadCars((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      const result = await response.json();
      console.log(result.message);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOnRoadCars();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const showAlertCarReturn = (orderId) => {
    const alertFunction = AlertCarReturn(handleCarReturn);
    alertFunction(orderId);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-secondary min-h-screen lg:ml-44">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
          <h1 className="bg-primary p-5 font-main font-semibold text-white-50 rounded-3xl text-3xl">
            On Road Cars
          </h1>
          <table className="w-full mt-5 text-sm text-center text-text table-fixed">
            <thead className="text-xs uppercase text-white-50">
              <tr>
                <th className="px-1 py-1 rounded-3xl bg-primary">Car Name</th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Renter Name
                </th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Renter Contact
                </th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Return Date
                </th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Payment Status
                </th>

                <th className="px-1 py-1 rounded-3xl bg-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                onRoadCars.map((order) => (
                  <tr key={order._id} className="border-b border-black">
                    <td className="px-2 py-1">
                      {order.car.name} {order.car.tahun}
                    </td>
                    <td className="px-2 py-1">{order.name}</td>
                    <td className="px-2 py-1 max-w-[10rem] truncate">
                      {order.contact}
                    </td>
                    <td className="px-2 py-1">{formatDate(order.endDate)}</td>
                    <td className="px-2 py-1">{order.paymentStatus}</td>

                    <td className="px-2 py-1">
                      <button
                        onClick={() => handleCheck(order.midtransOrderId)}
                        className="bg-blue-700 text-white-50 rounded-xl px-6"
                        disabled={checkingPayment} // Disable button saat memeriksa pembayaran
                      >
                        Check Payment
                      </button>
                      <button
                        onClick={() => showAlertCarReturn(order._id)}
                        className="bg-green-700 text-white-50 rounded-xl mt-3 px-6"
                      >
                        Car Return
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
