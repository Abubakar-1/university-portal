import { MdDashboard } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { HiOutlineAcademicCap } from "react-icons/hi";

const Menus = [
  { title: "Dashboard", icon: <MdDashboard />, link: "/student" },
  { title: "Classes", icon: <HiMiniUsers />, link: "/student/classes" },
  {
    title: "Results",
    icon: <HiOutlineAcademicCap />,
    link: "/student/results",
  },
];

export { Menus };
