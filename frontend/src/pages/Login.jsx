import React from "react";
import carImage from "./../assets/logindash.png";
import Logo from "./../assets/Logo.png";

export const Login = () => {
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
        className="lg:w-4/5 w-full bg-white rounded-tl-3xl rounded-bl-3xl flex-grow"
      >
        <h1 className="font-main font-bold text-3xl lg:text-4xl pt-8 lg:pt-16 px-5 text-text text-center lg:text-left">
          Hi, Selamat Datang!
        </h1>

        {/* Form Section */}
        <form
          action=""
          className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] overflow-y-auto px-4"
        >
          <div className="flex flex-col w-full max-w-lg">
            <label
              htmlFor="email"
              className="font-main font-semibold shadow-md text-text text-lg lg:text-xl mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="border w-full h-12 p-3 border-text rounded-xl"
              placeholder="Masukan email anda...."
            />
          </div>

          <div className="flex flex-col w-full max-w-lg mt-6">
            <label
              htmlFor="password"
              className="font-main font-semibold shadow-md text-text text-lg lg:text-xl mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id=""
              className="border w-full h-12 p-3 border-text rounded-xl"
              placeholder="Masukan password"
            />
          </div>

          <a href="" className="self-end max-w-lg mt-4">
            <p className="text-blue-600 underline text-sm lg:text-base font-semibold">
              Lupa Password?
            </p>
          </a>

          <button className="bg-primary text-white p-3 mt-6 rounded-lg w-36">
            Masuk
          </button>
        </form>
      </section>
    </div>
  );
};
