import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { ResponsiveContext } from "./ResponsiveProvider";

export const MenuBar = ({ menus }) => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="bg-darkestPurple col-span-2 text-white px-6 md:block hidden">
        <p className="my-11 text-center">SOKS LOGO</p>
        <ul>
          {menus.map((menu, key) => (
            <span key={key}>
              <Link to={`${menu.link}`}>
                <li
                  className={`flex items-center mt-3 gap-x-4 p-2 ${pathname === menu.link ? "bg-lightPurple text-white" : "text-gray"} hover:bg-lightPurple rounded-lg cursor-pointer`}
                >
                  <span className="">{menu.icon}</span>
                  <span className="duration-200">{menu.title}</span>
                </li>
              </Link>
            </span>
          ))}
        </ul>
      </div>
    </>
  );
};

export const ResponsiveMenuBar = ({ menus }) => {
  const { handleClicked } = useContext(ResponsiveContext);
  const { pathname } = useLocation();
  return (
    <>
      <div className="bg-darkestPurple col-span-2 text-white px-6 absolute h-[100%] w-[100vw] right-0 opacity-[0.95]">
        <div className="flex my-11 justify-between">
          <p className="">SOKS LOGO</p>
          <IoCloseSharp size={30} onClick={handleClicked} />
        </div>
        <ul>
          {menus.map((menu, key) => (
            <span key={key}>
              <Link to={`${menu.link}`}>
                <li
                  className={`flex items-center mt-3 gap-x-4 p-2 ${pathname === menu.link ? "bg-lightPurple text-white" : "text-gray"} hover:bg-lightPurple rounded-lg cursor-pointer`}
                >
                  <span className="">{menu.icon}</span>
                  <span className="duration-200">{menu.title}</span>
                </li>
              </Link>
            </span>
          ))}
        </ul>
      </div>
    </>
  );
};
