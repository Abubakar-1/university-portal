import React, { useContext } from "react";
import { MenuBar } from "../components/MenuBar";
import { Menus } from "../components/Menus";
import { ResponsiveContext } from "../components/ResponsiveProvider";
import { IoMenu } from "react-icons/io5";

export const Academic = () => {
  const { handleClicked, clicked } = useContext(ResponsiveContext);
  return (
    <>
      <div className="grid grid-cols-12 h-[100vh]">
        {clicked && (
          <span className="delay-700">
            <ResponsiveMenuBar menus={Menus} />
          </span>
        )}
        <MenuBar menus={Menus} />
        <div className="bg-gray  col-span-12 md:col-span-10 py-10 px-6">
          <div className="flex justify-between md:justify-end px-10 items-center pb-7 md:pb-0">
            <img
              src="src\assets\media\mypic.jpg"
              alt=""
              className="md:h-12 md:w-12 h-10 w-10 rounded-full"
            />
            <span className="md:hidden" onClick={handleClicked}>
              <IoMenu size={30} />
            </span>
          </div>
          <div>
            <div className="px-6">
              <h2 className="font-bold text-darkestPurple text-2xl">
                Academic
              </h2>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-4 md:flex md:gap-0">
                <button className="hover:bg-normalPurple hover:text-white py-3 px-5 ml-4 text-center bg-white shadow-lg rounded-lg">
                  Majors
                </button>
                <button className="hover:bg-normalPurple hover:text-white py-3 px-5 ml-4 text-center bg-white shadow-lg rounded-lg">
                  Courses
                </button>
                <button className="hover:bg-normalPurple hover:text-white py-3 px-5 ml-4 text-center bg-white shadow-lg rounded-lg">
                  Grades
                </button>
                <button className="hover:bg-normalPurple hover:text-white py-3 px-5 ml-4 text-center bg-white shadow-lg rounded-lg">
                  Schedule
                </button>
              </div>
            </div>
          </div>

          <div className="border border-darkestgray m-5"></div>
          <h2 className="font-bold text-darkestPurple text-2xl p-5">Majors</h2>
          <div className="flex items-center justify-center">
            <div className="flex">
              <div className="px-5">
                <input
                  className="rounded-xl h-5 focus:outline-none p-5 sm:w-96 shadow-lg"
                  type="search"
                  placeholder="Search"
                />
              </div>
              <button className="bg-normalPurple text-white rounded-lg px-3 shadow-lg">
                Add new Major
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-12 m-5 my-10 p-5">
            <div className="flex justify-between col-span-12">
              <h2 className="font-bold text-darkestPurple text-2xl">Majors</h2>
              <div className="text-red">Delete</div>
            </div>
            <div className="col-span-12">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                      <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                        <tr>
                          <th scope="col" className=" px-6 py-4">
                            Major Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Major Code
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Enrolled Student
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                        <tr className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            Cyber Security
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            CS101
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Registered
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
