import React from "react";
import Navbar from "../../components/admin/Navbar";
import dummyImg from "../../assets/image 5.png";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-secondary min-h-screen lg:ml-44">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
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
          <table className="w-full mt-5 text-sm text-center text-text table-fixed">
            <thead className="text-xs uppercase text-white-50">
              <tr>
                <th className="px-1 py-1 rounded-3xl bg-primary ">Image</th>
                <th className="px-1 py-1 rounded-3xl bg-primary">Car Name</th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Renter Name
                </th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Renter Contact
                </th>
                <th className="px-1 py-1 rounded-3xl bg-primary">
                  Return Date
                </th>
                <th className="px-1 py-1 rounded-3xl bg-primary">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <th
                  scope="row"
                  className="px-2 py-1 font-medium whitespace-nowrap"
                >
                  <img
                    src={dummyImg}
                    alt=""
                    width={100}
                    height={100}
                    className="max-w-full"
                  />
                </th>
                <td className="px-2 py-1">Toyota Rush 2021</td>
                <td className="px-2 py-1">Anton</td>
                <td className="px-2 py-1 max-w-[10rem] truncate">
                  anton@gmail.com
                </td>
                <td className="px-2 py-1">12-12-2024 | 09.00 AM</td>
                <td className="px-2 py-1">On Road</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
