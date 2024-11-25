import React from "react";
import Navbar from "../../components/admin/Navbar";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-secondary min-h-screen lg:ml-44">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"></div>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white">
                Total Car
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                11
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white">
                Total Blog
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                24
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white">
                Total Visit
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                1000
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-white">
                Downloads
              </dt>

              <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                86k
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
