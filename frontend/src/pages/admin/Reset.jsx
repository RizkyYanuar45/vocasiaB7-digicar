import React, { useState } from "react";
import carImage from "./../../assets/logindash.png";
import Logo from "./../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { SuccessReset } from "../../components/admin/Notification/SuccessReset";

export const Reset = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSuccess = (e) => {
    e.preventDefault();
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      navigate("/admin/login");
    }, 2000);
  };

  return (
    <div className="lg:flex-row flex flex-col bg-secondary min-h-screen overflow-hidden">
      {/* Banner Section */}
      <section
        id="banner"
        className="bg-secondary w-full lg:w-2/5 h-60 lg:h-screen flex flex-col relative lg:items-start lg:justify-start"
      >
        <img src={Logo} alt="Logo" className="w-36 h-16 m-5 object-contain" />
        <img
          src={carImage}
          alt="Car Illustration"
          className="absolute w-[7rem] h-[7rem] right-0 top-0 lg:start-20 lg:w-[34rem] lg:h-[34rem]"
        />
      </section>

      {/* Login Section */}
      <section
        id="login"
        className="lg:w-4/5 w-full bg-white-50 rounded-tl-3xl rounded-bl-3xl flex-grow"
      >
        <h1 className="font-main font-bold text-3xl lg:text-4xl pt-8 lg:pt-16 px-5 text-text text-center lg:text-left">
          Mari Reset Password !
        </h1>

        {/* Form Section */}
        <form
          onSubmit={handleLoginSuccess}
          className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] overflow-y-auto px-4"
        >
          <div className="flex flex-col w-full max-w-lg">
            <label
              htmlFor="email"
              className="font-main font-semibold  text-text text-lg lg:text-xl mb-2"
            >
              Kode OTP dari email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border w-full h-12 p-3 border-text rounded-xl"
              placeholder="Masukan kode otp anda"
              required
            />
          </div>

          <div className="relative flex flex-col w-full max-w-lg mt-6">
            <label
              htmlFor="password"
              className="font-main font-semibold  text-text text-lg lg:text-xl mb-2"
            >
              Password baru
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="border w-full h-12 p-3 border-text rounded-xl"
              placeholder="Masukan password"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-12"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-primary text-white-50 p-3 mt-6 rounded-lg w-36"
          >
            Reset
          </button>
        </form>
      </section>
      {showNotification && <SuccessReset />}
    </div>
  );
};
