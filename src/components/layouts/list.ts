import { AiOutlineAppstore } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { LiaCalendarSolid } from "react-icons/lia";
import { RiBriefcase4Line, RiSettings5Line } from "react-icons/ri";

export const navLink = [
  {
    id: 1,
    to: "/calendar",
    name: "Calendar",
    icon: AiOutlineAppstore,
  },
  {
    id: 2,
    to: "/inbox",
    name: "Inbox",
    icon: RiBriefcase4Line,
  },
  {
    id: 3,
    to: "/notes",
    name: "Notes",
    icon: BsList,
  },
  {
    id: 4,
    to: "/todo-list",
    name: "TODO List",
    icon: LiaCalendarSolid,
  },
  {
    id: 5,
    to: "/settings",
    name: "Settings",
    icon: RiSettings5Line,
  },
];
