import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MenuBar, ResponsiveMenuBar } from "../components/MenuBar";
import { Menus } from "../components/Menus";
import { Button } from "@material-tailwind/react";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "../../UserProvider";
import { ResponsiveContext } from "../../ResponsiveProvider";

export const StudentResults = () => {
  axios.defaults.withCredentials = true;
  const { user, studResult } = useContext(UserContext);
  const { clicked, handleClicked } = useContext(ResponsiveContext);
  const { userDetails } = user || {};
  const navigate = useNavigate();

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
  console.log(userDetails);
  const { id } = userDetails || {};

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-12 h-[100vh]">
        {clicked && (
          <span className="delay-700">
            <ResponsiveMenuBar menus={Menus} />
          </span>
        )}
        <MenuBar menus={Menus} />
        <div className="bg-gray col-span-12 md:col-span-10 text-darkestPurple py-10">
          <div className="flex justify-between md:justify-end px-10 items-center pb-7 md:pb-0">
            <img
              src="src\assets\media\mypic.jpg"
              alt=""
              className="md:h-12 md:w-12 h-10 w-10 rounded-full"
            />

            <Button onClick={logOut}>Logout</Button>

            <span className="md:hidden" onClick={handleClicked}>
              <IoMenu size={30} />
            </span>
          </div>
          <div>
            <div className="px-6">
              <h2 className="font-bold text-darkestPurple text-2xl">Results</h2>
            </div>
          </div>

          <div className="border border-darkestgray m-5"></div>

          <div className="bg-white rounded-lg grid grid-cols-12 m-5 my-10 p-5">
            <div className="flex justify-between col-span-12">
              <h2 className="font-bold text-darkestPurple text-2xl">
                {/* {selectedRole
                    ? `${selectedRole.charAt(0).toUpperCase()}${selectedRole.slice(1)}`
                    : "All Users"} */}
              </h2>
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
                            Subject Code
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            View
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Add
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {studResult?.map((sub, index) => {
                          return (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {sub.subject.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {sub.grade}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {sub.remark}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {sub.score}
                              </td>
                            </tr>
                          );
                        })}
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
