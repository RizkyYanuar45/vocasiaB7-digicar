import React from "react";
import carImage from "./../assets/logindash.png";
import Logo from "./../assets/Logo.png";
export const Login = () => {
  return (
    <div className="lg:flex-row flex flex-col  bg-secondary h-screen overflow-hidden">
      <section
        id="banner "
        className="bg-secondary w-2/5 h-screen flex flex-col"
      >
        <img src={Logo} alt="" className="w-36 h-16 m-5 object-contain" />
        <img
          src={carImage}
          alt=""
          className="absolute w-[7rem] h-[7rem] right-0 top-0 lg:start-20 lg:w-[34rem] lg:h-[34rem] "
        />
      </section>
      <section
        id="login"
        className="lg:w-4/5 w-screen bg-white rounded-tl-3xl rounded-bl-3xl "
      >
        <h1 className="font-main font-bold text-3xl lg:text-4xl pt-16 pl-5 text-text">
          Hi, Selamat Datang!
        </h1>
        <form
          action=""
          className="flex flex-col justify-center items-center h-screen -mt-32 lg:-mt-20"
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-main font-semibold shadow-md text-text text-xl"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="border w-[350px] lg:w-[500px] h-12 p-3 border-text rounded-xl"
              placeholder="Masukan email anda...."
            />
          </div>
          <div className="flex flex-col mt-10">
            <label
              htmlFor="password"
              className="font-main font-semibold shadow-md text-text text-xl"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id=""
              className=" border w-[350px] lg:w-[500px] h-12 border-text p-3 rounded-xl"
              placeholder="Masukan password"
            />
          </div>
          <a href="">
            <p className="text-blue-600 underline ml-60 lg:ml-96 mt-5 font-semibold">
              Lupa Password?
            </p>
          </a>

          <button className="bg-primary text-white p-3 mt-5 rounded-lg w-28">
            Masuk
          </button>
        </form>
      </section>
    </div>
  );
};
