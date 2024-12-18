import Swal from "sweetalert2";
import React from "react";

const AlertDelete = (onConfirm) => {
  return () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        if (onConfirm) {
          onConfirm();
        }
      } else if (result.isDismissed) {
        console.log("Penghapusan dibatalkan");
      }
    });
  };
};

export default AlertDelete;
