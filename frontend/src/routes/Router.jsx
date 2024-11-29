import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./../pages/Login";
import { Dashboard } from "../pages/admin/Dashboard";
import { Car } from "../pages/admin/Car";
import { Blog } from "../pages/admin/Blog";
import { Testimoni } from "../pages/admin/Testimoni";
import { Contact } from "../pages/admin/Contact";
import { User } from "../pages/admin/User";
import { Order } from "./../pages/admin/Order";

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
  {
    path: "/admin/blog",
    element: <Blog />,
  },
  {
    path: "/admin/testimoni",
    element: <Testimoni />,
  },
  {
    path: "/admin/contact",
    element: <Contact />,
  },
  {
    path: "/admin/user",
    element: <User />,
  },
  {
    path: "/admin/order",
    element: <Order />,
  },
]);
