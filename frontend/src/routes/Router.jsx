import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./../pages/Login";
import { Dashboard } from "../pages/admin/Dashboard";
import { Car } from "../pages/admin/Car";

export const Router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/car",
    element: <Car />,
  },
]);
