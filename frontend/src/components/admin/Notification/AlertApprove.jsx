import Swal from "sweetalert2";
import React from "react";

const AlertApprove = (onConfirm, amount, name) => {
  return (orderId) => {
    // Terima orderId sebagai argumen
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to approve the order for ${name} with an amount of Rp. ${amount}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve this order!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("confirm");

        Swal.fire({
          title: "Approved!",
          text: "This order has been approved.",
          icon: "success",
        });

        if (onConfirm) {
          console.log("onConfirm");
          onConfirm(orderId, amount, name); // Panggil onConfirm dengan orderId, amount, dan name
        }
      } else if (result.isDismissed) {
        console.log("Approval canceled");
      }
    });
  };
};

export default AlertApprove;
