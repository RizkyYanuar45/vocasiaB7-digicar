import React from "react";
import {
  Bolt,
  Car,
  Newspaper,
  Contact,
  NotebookPen,
  UserCog,
  LogOutIcon,
} from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-screen w-44 bg-primary fixed top-0 left-0 z-50">
      <ul className="flex flex-col text-white font-main justify-evenly items-start h-full space-y-4">
        <li className="flex items-center space-x-4">
          <span className="w-6 flex justify-center">
            <Bolt />
          </span>
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="w-6 flex justify-center">
            <Car />
          </span>
          <span>Car Option</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="w-6 flex justify-center">
            <Newspaper />
          </span>
          <span>Konten Blog</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="w-6 flex justify-center">
            <Contact />
          </span>
          <span>Contact Section</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="w-6 flex justify-center">
            <NotebookPen />
          </span>
          <span>Testimoni Section</span>
        </li>
        <li className="flex items-center space-x-4">
          <span className="w-6 flex justify-center">
            <UserCog />
          </span>
          <span>User</span>
        </li>
        <li className="mt-8 w-full flex justify-center items-center">
          <button className="flex items-center space-x-2 px-4 w-36 py-2 outline-secondary outline text-white rounded hover:text-text hover:bg-secondary">
            <span className="w-6 flex justify-center">
              <LogOutIcon />
            </span>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
