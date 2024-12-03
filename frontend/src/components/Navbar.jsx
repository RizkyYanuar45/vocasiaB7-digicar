import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

function Navbar({ isBgWhite = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={classNames("", {
        "bg-white-50": isBgWhite,
        "bg-cinderella-50": !isBgWhite,
      })}
    >
      <div className="container py-5 flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img src="/logo.png" alt="logo" />
          <p className="font-semibold text-black-950 text-2xl">
            <span className="text-night-shadz-700">DigiCar</span>Point
          </p>
        </div>
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-4 font-main ">
            <li className="font-bold">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Tentang Kami
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Blog
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Produk
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/testimoni"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Testimoni
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Kontak
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="h-7 w-7 md:hidden cursor-pointer" onClick={toggleMenu}>
          <img src="/menu.png" alt="menu" />
        </div>
      </div>
      {/* Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white-50 shadow-md">
          <ul className="flex flex-col space-y-2 p-4">
            <li className="font-bold">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Tentang Kami
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Blog
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Produk
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/testimoni"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Testimoni
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/kontak"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Kontak
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
