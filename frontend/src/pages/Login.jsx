import React, { useState } from "react";
import carImage from "./../assets/logindash.png";
import Logo from "./../assets/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import { LoginSuccess } from "../components/admin/Notification/LoginSuccess";

export const Login = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSuccess = async (e) => {
    e.preventDefault();
    setShowNotification(false);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      localStorage.setItem("idUser", JSON.stringify(data.id));
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      setErrorMessage("Username atau password salah.");
      console.log(error);

      console.error("Login error:", error);
    }
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
          Hi, Selamat Datang!
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
              Username
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border w-full h-12 p-3 border-text rounded-xl"
              placeholder="Masukan username anda...."
              required
            />
          </div>
          <div className="flex flex-col w-full max-w-lg mt-6 relative">
            <label
              htmlFor="password"
              className="font-main font-semibold  text-text text-lg lg:text-xl mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full h-12 p-3 border-text rounded-xl"
              placeholder="Masukkan password"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-12"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <Link to={"/admin/reset"} className="self-end max-w-lg mt-4">
            <p className="text-blue-600 underline text-sm lg:text-base lg:mr-48 font-semibold">
              Lupa Password?
            </p>
          </Link>
          <button
            type="submit"
            className="bg-primary text-white-50 p-3 mt-6 rounded-lg w-36"
          >
            Masuk
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}{" "}
          {/* Menampilkan pesan kesalahan */}
        </form>
      </section>
      {showNotification && <LoginSuccess />}
    </div>
  );
};
