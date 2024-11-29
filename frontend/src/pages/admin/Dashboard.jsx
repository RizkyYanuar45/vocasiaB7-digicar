import React from "react";
import Navbar from "../../components/admin/Navbar";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-secondary min-h-screen lg:ml-44">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"></div>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white-50">
                Total Car
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                11
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white-50">
                Total Blog
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                24
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white-50">
                Total Visit
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                1000
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="bg-primary p-5 font-main font-semibold text-white-50 rounded-3xl text-3xl">
            On Road Cars
          </h1>
          <div className="flex bg-blue-600 w-full h-5 m-20"></div>
        </div>
      </div>
    </div>
  );
};
