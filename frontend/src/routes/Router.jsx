import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./../pages/Login";

export const Router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
]);
