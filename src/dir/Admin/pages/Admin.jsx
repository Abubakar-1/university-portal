import React, { useContext, useState } from "react";
import { Menus } from "../components/Menus";
import { FaUserGraduate } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { MenuBar, ResponsiveMenuBar } from "../components/MenuBar";
import Calendar from "react-calendar";
import "../components/MyCalendar.css";
import { ResponsiveContext } from "../components/ResponsiveProvider";

export const Admin = () => {
  const [date, setDate] = useState(new Date());

  const { clicked, handleClicked } = useContext(ResponsiveContext);

  const boxShadow = {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };
  return (
    <>
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
              <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
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
              <div className="flex items-center justify-items-center">
                <img
                  src="src\assets\media\mypic.jpg"
                  alt=""
                  className="h-9 w-9 sm:h-12 sm:w-12 rounded-full"
                />
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
                  className="rounded-lg col-span-12 md:col-span-4 text-darkestPurple pb-5 font-bold mb-5 md:mb-0"
                  style={boxShadow}
                >
                  <div className="flex items-center justify-center py-3">
                    <div>
                      <FaUserGraduate className="w-8 h-8 pr-3" />
                    </div>
                    <p className="text-2xl">4,588</p>
                  </div>
                  <p className="text-center">Total Students</p>
                </div>
                <div
                  className="rounded-lg col-span-12 md:col-span-4 text-lightPurple pb-5 font-bold mb-5 md:mb-0"
                  style={boxShadow}
                >
                  <div className="flex items-center justify-center py-3">
                    <div>
                      <FaChalkboardTeacher className="w-8 h-8 pr-3" />
                    </div>
                    <p className="text-2xl">34</p>
                  </div>
                  <p className="text-center">Total Teachers</p>
                </div>
                <div
                  className="rounded-lg col-span-12 md:col-span-4 text-red pb-5 font-bold mb-5 md:mb-0"
                  style={boxShadow}
                >
                  <div className="flex items-center justify-center py-3">
                    <div>
                      <RiParentFill className="w-8 h-8 pr-3" />
                    </div>
                    <p className="text-2xl">1,544</p>
                  </div>
                  <p className="text-center">Total Parents</p>
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
                <p className="font-bold text-lg">Total Revenue for the Year</p>
                <div>#3,000,000</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-7 shadow-lg bg-white rounded-lg p-5">
              <h2 className="text-2xl font-bold text-darkestPurple">
                Registrations
              </h2>
              <div className="flex flex-col">
                <div className="overflow-x-auto md:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                        <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                          <tr>
                            <th scope="col" className=" px-6 py-4">
                              #
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Name
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Entrance Class
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Sex
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              3
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              3
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              3
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              3
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              3
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Justina Ifidon
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              JSS1
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              F
                            </td>
                          </tr>
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

          <div className="grid grid-cols-12 bg-white p-5 my-10 rounded-lg">
            <div className="flex justify-between col-span-12">
              <h2 className="text-2xl font-bold text-darkestPurple">
                Payments
              </h2>
              <div>
                <select
                  name="session"
                  id="session"
                  className="bg-transparent border-solid border-2 rounded-lg px-4 border-gray"
                >
                  <option value="2022/23">Latest Payment</option>
                  <option value="2022/23">2022/23</option>
                  <option value="2022/23">2022/23</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col col-span-12">
              <div className="overflow-x-auto md:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 md:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                      <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                        <tr>
                          <th scope="col" className=" px-6 py-4">
                            #
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Description
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Amount
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Justina Ifidon
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            School Fees
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            N350, 000
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            12/04/23
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            3:33pm
                          </td>
                        </tr>
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Justina Ifidon
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            School Fees
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            N350, 000
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            12/04/23
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            3:33pm
                          </td>
                        </tr>
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Justina Ifidon
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            School Fees
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            N350, 000
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            12/04/23
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            3:33pm
                          </td>
                        </tr>
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Justina Ifidon
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            School Fees
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            N350, 000
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            12/04/23
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            3:33pm
                          </td>
                        </tr>
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Justina Ifidon
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            School Fees
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            N350, 000
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            12/04/23
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            3:33pm
                          </td>
                        </tr>
                        <tr className="border-b border-neutral-200 dark:border-white/10">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            Justina Ifidon
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            School Fees
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            N350, 000
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            12/04/23
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                            3:33pm
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
