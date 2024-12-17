import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { scrollToTop } from "./utils/ScrollToTop";
function Navbar({ isBgWhite = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleTestimoniClick = () => {
    navigate("/");
    setTimeout(() => scrollToElement("testi"), 300);
  };

  const handleAboutClick = () => {
    navigate("/");
    setTimeout(() => scrollToElement("about"), 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        {
          "bg-white-50": isBgWhite,
          "bg-cinderella-50": !isBgWhite,
          "shadow-md": isScrolled,
        }
      )}
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
                onClick={scrollToTop}
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
              <button
                onClick={handleAboutClick}
                className=" hover:text-cinderella-900"
              >
                Tentang Kami
              </button>
            </li>
            <li className="font-bold">
              <NavLink
                onClick={scrollToTop}
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
                onClick={scrollToTop}
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Produk
              </NavLink>
            </li>
            <li className="font-bold">
              <button
                onClick={handleTestimoniClick}
                className=" hover:text-cinderella-900"
              >
                Testimoni
              </button>
            </li>
            <li className="font-bold">
              <NavLink
                onClick={scrollToTop}
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
                onClick={scrollToTop}
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
              <button
                onClick={handleAboutClick}
                className=" hover:text-cinderella-900"
              >
                Tentang Kami
              </button>
            </li>
            <li className="font-bold">
              <NavLink
                onClick={scrollToTop}
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
                onClick={scrollToTop}
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "hover:text-cinderella-900"
                }
              >
                Produk
              </NavLink>
            </li>
            <li className="font-bold">
              <button
                onClick={handleTestimoniClick}
                className=" hover:text-cinderella-900"
              >
                Testimoni
              </button>
            </li>
            <li className="font-bold">
              <NavLink
                onClick={scrollToTop}
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
