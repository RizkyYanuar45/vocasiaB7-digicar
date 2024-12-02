import classNames from "classnames";
import { NavLink } from "react-router-dom";

function Navbar({ isBgWhite = true }) {
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
        <ul className="md:flex space-x-4 hidden ">
          <li>
            <NavLink to="/" end className="hover:text-cinderella-900">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-cinderella-900">
              Tentang Kami
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className="hover:text-cinderella-900">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className="hover:text-cinderella-900">
              Produk
            </NavLink>
          </li>
          <li>
            <NavLink to="/testimoni" className="hover:text-cinderella-900">
              Testimoni
            </NavLink>
          </li>
          <li>
            <NavLink to="/kontak" className="hover:text-cinderella-900">
              Kontak
            </NavLink>
          </li>
        </ul>
        <div className="h-7 w-7 md:hidden cursor-pointer">
          <img src="/menu.png" alt="menu" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
