import React, { useState, useEffect, useRef } from "react";
import { Pen } from "lucide-react";
import Navbar from "../../components/admin/Navbar";
import dummyImg from "../../assets/image 5.png";

export const User = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [textbox, setTextBox] = useState(false);

  const handleMouseEnter = () => {
    setTextBox(true);
  };
  const handleMouseLeave = () => {
    setTextBox(false);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="bg-secondary lg:ml-44 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <div className="w-1/4 my-1 mt-32">
            <label htmlFor="name" className="font-inter font-light text-sm">
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-primary max-h-5 mt-3 p-4 text-sm shadow-sm bg-white"
                placeholder={user.name || "Name"}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/4 my-1">
            <label htmlFor="email" className="font-inter font-light text-sm">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border border-primary max-h-5 mt-3 p-4 text-sm shadow-sm bg-white"
                placeholder={user.email || "Email"}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/4 my-1">
            <label htmlFor="password" className="font-inter font-light text-sm">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border border-primary max-h-5 mt-3 p-4 text-sm shadow-sm bg-white"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-1/4 mt-5 rounded-lg bg-primary px-5 py-1 text-sm font-medium text-white-50 flex font-inter items-center justify-center">
            <Pen className="w-6 h-6 mr-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
