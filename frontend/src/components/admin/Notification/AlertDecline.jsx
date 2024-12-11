import Swal from "sweetalert2";
import React from "react";

const AlertDecline = (onConfirm) => {
  return (orderId) => {
    // Terima orderId sebagai argumen
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline this order!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("confirm");

        Swal.fire({
          title: "Declined!",
          text: "This order has been declined.",
          icon: "success",
        });

        if (onConfirm) {
          console.log("onConfirm");
          onConfirm(orderId); // Panggil onConfirm dengan orderId
        }
      } else if (result.isDismissed) {
        console.log("Penghapusan dibatalkan");
      }
    });
  };
};

export default AlertDecline;
