import React from "react";

export const LoginSuccess = () => {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black-950 bg-opacity-50 z-50">
      <div
        role="alert"
        className="mt-10 rounded-xl border border-gray-100 bg-white-50 p-4 shadow-lg"
      >
        <div className="flex items-start gap-4">
          <span className="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <div className="flex-1">
            <strong className="block font-medium text-gray-900">
              Login Success!
            </strong>

            <p className="mt-1 text-sm text-gray-700">
              Welcome to DigiCar dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
