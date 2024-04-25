import { MdDashboard } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { HiOutlineAcademicCap } from "react-icons/hi";

const Menus = [
  { title: "Dashboard", icon: <MdDashboard />, link: "/teacher" },
  { title: "Classes", icon: <HiMiniUsers />, link: "/teacher/classes" },
  {
    title: "Results",
    icon: <HiOutlineAcademicCap />,
    link: "/teacher/results",
  },
];

export { Menus };
