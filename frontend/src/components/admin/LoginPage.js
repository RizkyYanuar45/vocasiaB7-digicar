import React from 'react';
import transportIcon from '../assets/images/transport.png';
import illustrationImage from '../assets/images/illustration.png'; 

function LoginPage() {
return (
    <div className="h-screen w-screen flex bg-pink-50">
    <div className="w-1/2 bg-pink-100 flex flex-col justify-center items-center relative">
        <div className="absolute top-6 left-6 flex items-center">
        <img
            src={transportIcon} 
            alt="DigiCarPoint Logo"
            className="w-8 h-8 mr-2"
        />
        <h1 className="text-xl font-bold">
            <span className="text-red-600">DigiCar</span>
            <span className="text-black">Point</span>
        </h1> 
    </div>
    
    <div className="text-center mb-6 mt-20">
        <img
            src={illustrationImage} 
            alt="Driving Illustration"
            className="w-full max-w-3xl scale-150"
        />
        </div>
    </div>

    <div className="w-1/2 flex flex-col justify-center items-center p-12">
        <h1 className="text-2xl font-bold text-black mb-12">
            Hi, Selamat Datang!
        </h1>
        <form className="w-3/4 space-y-8">

        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="Masukkan email anda..."
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
        </div>

        <div>
            <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                >
                Password
            </label>
            <input
                type="password"
                id="password"
                placeholder="Masukkan password"
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
        </div>

    <div className="text-right">
            <a
                href="#!"
                className="text-sm text-blue-500 hover:underline font-medium"
                >
                Lupa Password?
            </a>
    </div>
            <button
                type="submit"
                className="w-full bg-rose-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-rose-600 transition"
                >
                Masuk
            </button>
        </form>
    </div>
</div>
);
}

export default LoginPage;
