import React, { useContext, useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MenuBar, ResponsiveMenuBar } from "../../Teacher/components/MenuBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Menus } from "../../Teacher/components/Menus";
import { UserContext } from "../../UserProvider";
import Calendar from "react-calendar";
import { ResponsiveContext } from "../../ResponsiveProvider";

export const Teacher = () => {
  axios.defaults.withCredentials = true;
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { clicked, handleClicked } = useContext(ResponsiveContext);

  const boxShadow = {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  const [date, setDate] = useState(new Date());

  const logOut = () => {
    try {
      axios
        .get("http://localhost:5005/logout")
        .then((result) => {
          console.log(result);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const { userDetails } = user || {};

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-12 h-[100vh]">
        <MenuBar menus={Menus} />
        {clicked && (
          <span className="delay-700">
            <ResponsiveMenuBar menus={Menus} />
          </span>
        )}
        <div className="bg-gray col-span-12 md:col-span-10  text-darkestPurple py-10 px-6">
          <div className="flex justify-between md:flex-row flex-col">
            <div className="py-3 md:py-0 flex justify-between md:block">
              <h2 className="text-2xl font-bold">
                Welcome back, {userDetails?.name}
              </h2>
              <p className="md:hidden" onClick={handleClicked}>
                <IoMenu size={30} />
              </p>
            </div>
            <div className="flex items-center md:justify-items-center justify-between">
              <div className="md:mr-10">
                <input
                  className="rounded-xl h-4 focus:outline-none p-5 shadow-lg"
                  type="search"
                  placeholder="Search"
                />
              </div>
              <div className="flex items-center justify-items-center justify-between">
                <img
                  src="src\assets\media\mypic.jpg"
                  alt=""
                  className="h-9 w-9 sm:h-12 sm:w-12 rounded-full"
                />

                <button onClick={logOut}>Logout</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 my-10">
            <div className="col-span-12 md:col-span-8 shadow-lg bg-white rounded-lg">
              <div className="flex justify-between px-10 py-5">
                <p className="font-bold text-3xl text-darkestPurple">
                  Overview
                </p>
                <select
                  name="session"
                  id="session"
                  className="bg-transparent border-solid border-2 rounded-lg px-4 border-gray"
                >
                  <option value="2022/23">2022/23</option>
                  <option value="2022/23">2022/23</option>
                  <option value="2022/23">2022/23</option>
                </select>
              </div>
              <div className="grid grid-cols-12 py-10 gap-4 mx-4">
                <div
                  className="rounded-lg col-span-12 md:col-span-12 text-darkestPurple pb-5 font-bold mb-5 md:mb-0"
                  style={boxShadow}
                >
                  <div className="flex items-center justify-center py-3">
                    <div>
                      <FaUserGraduate className="w-8 h-8 pr-3" />
                    </div>
                    <p className="text-2xl">{userDetails?.subjects.length}</p>
                  </div>
                  <p className="text-center">Total Subjects</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 bg-white mx-5 rounded-lg shadow-lg my-10 md:my-0 h-[80%]">
              <div className="flex justify-between">
                <div></div>
                <select
                  name="session"
                  id="session"
                  className="bg-transparent border-solid border-2 rounded-lg px-4 border-gray"
                >
                  <option value="2022/23">2022/23</option>
                  <option value="2022/23">2022/23</option>
                  <option value="2022/23">2022/23</option>
                </select>
              </div>
              <div className="flex flex-col items-center justify-center h-[100%]">
                <p className="font-bold text-lg">Total Students for the Year</p>
                <div>4 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-7 shadow-lg bg-white rounded-lg p-5">
              <h2 className="text-2xl font-bold text-darkestPurple">
                Subjects
              </h2>
              <div className="flex flex-col">
                <div className="overflow-x-auto md:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                        <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              #
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Subject Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Code
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userDetails?.subjects.map((sub, index) => (
                            <tr
                              key={index}
                              className="border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                                {sub.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                                {sub.code}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                                {sub.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 shadow-lg bg-darkestPurple rounded-lg p-5">
              <div className="app">
                <h1 className="text-white text-2xl font-bold">Events</h1>
                <h1 className="text-center">React Calendar</h1>
                <div className="calendar-container">
                  <Calendar onChange={setDate} value={date} />
                </div>
                <p className="text-center text-white">
                  <span className="bold">Selected Date:</span>{" "}
                  {date.toDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
