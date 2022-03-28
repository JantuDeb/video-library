import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAirplay } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import "./Navbar.css";
import { useSideBar } from "../../context/sidebar/SidebarContext";
const Navbar = () => {
  const { toogle } = useSideBar();;
  const handleClick = ()=>toogle(v=>!v)
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="header-menu flex center p-0" onClick={handleClick}>
          <GiHamburgerMenu size={25} color="white" />
        </button>
        <div className="logo flex center">
          <MdAirplay size={25} color="red" />
        </div>
      </div>
      <div className="input-icon search-box flex">
        <input type="text" placeholder="Search" id="search" />
        <button className="flex items-center">
          <FiSearch size={20} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center btn-search-mobile">
          <FiSearch size={20} />
        </button>
        <div className="upload-video">
          <RiVideoAddLine size={20} />
        </div>
        <div className="notification">
          <IoNotificationsSharp size={20} />
        </div>
        <div className="profile">
          <img
            className="avatar-profile"
            src="https://yt3.ggpht.com/yti/APfAmoGxIdrAn1vk0TI0l2kJqG3jVVuUMx_V0p0s6g09Hg=s88-c-k-c0x00ffffff-no-rj-mo"
            alt="profile avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
