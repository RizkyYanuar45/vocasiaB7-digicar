import React from "react";
import {
  Bolt,
  Car,
  Newspaper,
  Contact,
  NotebookPen,
  UserCog,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./../../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-44 bg-primary fixed top-0 left-0 z-50">
      <img
        src={Logo}
        alt="Logo"
        className="w-full h-16 object-contain bg-white rounded-tr-full rounded-br-full"
      />
      <ul className="flex flex-col text-white font-main justify-evenly items-start h-full">
        {/** Navbar Items */}
        {[
          { name: "Dashboard", path: "/admin/dashboard", icon: <Bolt /> },
          { name: "Car Option", path: "/admin/car", icon: <Car /> },
          { name: "Konten Blog", path: "/admin/blog", icon: <Newspaper /> },
          {
            name: "Contact Section",
            path: "/admin/contact",
            icon: <Contact />,
          },
          {
            name: "Testimoni Section",
            path: "/admin/testimoni",
            icon: <NotebookPen />,
          },
          { name: "User", path: "/admin/user", icon: <UserCog /> },
        ].map((item) => (
          <li
            key={item.name}
            className={`relative w-full flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-white text-primary shadow-md"
                : "hover:bg-gray-700 hover:text-gray-300"
            }`}
          >
            <Link to={item.path} className="flex items-center w-full space-x-4">
              <span className="w-6 flex justify-center">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}

        {/** Log Out */}
        <li className="mt-1 mb-5 w-full flex justify-center items-center">
          <button className="flex items-center space-x-2 px-4 w-36 py-2 border border-secondary text-white rounded hover:text-gray-900 hover:bg-secondary transition-all duration-300">
            <span className="w-6 flex justify-center">
              <LogOut />
            </span>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
