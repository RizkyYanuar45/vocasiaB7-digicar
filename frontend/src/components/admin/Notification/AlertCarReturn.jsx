import Swal from "sweetalert2";
import React from "react";

const AlertCarReturn = (onConfirm, amount, name) => {
  return (orderId) => {
    // Terima orderId sebagai argumen
    Swal.fire({
      title: "Are you sure?",
      text: `Is car already return?.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,  car already return!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("confirm");

        Swal.fire({
          title: "Deleted Order",
          text: "Now this car is Ready to use.",
          icon: "success",
        });

        if (onConfirm) {
          console.log("onConfirm");
          onConfirm(orderId); // Panggil onConfirm dengan orderId, amount, dan name
        }
      } else if (result.isDismissed) {
        console.log("Approval canceled");
      }
    });
  };
};

export default AlertCarReturn;
