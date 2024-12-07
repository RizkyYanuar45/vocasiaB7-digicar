import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./../pages/Login";
import { Dashboard } from "../pages/admin/Dashboard";
import { Car } from "../pages/admin/Car";
import { Blog } from "../pages/admin/Blog";
import { Testimoni } from "../pages/admin/Testimoni";
import { Contact } from "../pages/admin/Contact";
import { User } from "../pages/admin/User";
import { Order } from "../pages/admin/Order";
import { Reset } from "../pages/admin/Reset";
import { Subscribers } from "../pages/admin/Subscribers";

import BlogPage from "../pages/blog";
import BlogDetail from "../pages/blog/detail";
import Catalog from "../pages/catalog";
import NotFound from "../pages/404";

import ContactPage from "../pages/Contact/ContactPage";

import LandingPage from "../pages/Landing/LandingPage";
import OrderForm from "../pages/OrderForm";

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
    path: "/admin/reset",
    element: <Reset />,
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
  {
    path: "/admin/subscribers",
    element: <Subscribers />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/detail",
    element: <BlogDetail />,
  },
  { path: "/catalog", element: <Catalog /> },
  { path: "/catalog/order/:id", element: <OrderForm /> },

  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  { path: "*", element: <NotFound /> },
]);
