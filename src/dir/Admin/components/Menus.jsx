import { MdDashboard } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbTopologyStar3 } from "react-icons/tb";

const Menus = [
  { title: "Dashboard", icon: <MdDashboard />, link: "/admin" },
  { title: "Users", icon: <HiMiniUsers />, link: "/admin/users" },
  {
    title: "Academic",
    icon: <HiOutlineAcademicCap />,
    link: "/admin/academic",
  },
];

export { Menus };
