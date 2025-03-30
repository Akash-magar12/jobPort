import { BsGlobeAmericas } from "react-icons/bs";
import {
  FaClipboardList,
  FaPaperPlane,
  FaPlusCircle,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
// import { TbFilterSearch } from "react-icons/tb";

export let options = [
  { icon: BsGlobeAmericas, name: "Explore" },
  // { icon: TbFilterSearch, name: "Filter" },
  // { icon: FaBookmark, name: "Saved" },
  { icon: FaPaperPlane, name: "Applied" },
  { icon: FaUser, name: "Profile" },
];

export let employer = [
  { icon: FaClipboardList, name: "Created Jobs", path: "created-jobs" },
  { icon: FaPlusCircle, name: "Create Jobs", path: "create-jobs" },
  { icon: FaUserCircle, name: "Profile", path: "employer-profile" },
];
