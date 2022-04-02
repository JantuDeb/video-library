import React from "react";
import {
  MdHome,
  MdVideoLibrary,
  MdThumbUp,
  MdHistory,
} from "react-icons/md";
import { RiPlayList2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useSideBar } from "../../context/sidebar/SidebarContext";
import "./Sidebar.css";
const Sidebar = () => {
  const { sideBar } = useSideBar();
  
  return (
    <aside className={`${sideBar && "active"}`}>
      <nav className="side-nav">
        <NavLink
          className="sidebar-item"
          to="/"
        >
          <MdHome size={20} />
          <span className="item-text">Home</span>
        </NavLink>

        {/* <NavLink className="sidebar-item" to="/">
          <MdSubscriptions size={20} />
          <span className="item-text">Subscriptions</span>
        </NavLink> */}

        <NavLink className="sidebar-item" to="/liked-videos">
          <MdThumbUp size={20} />
          <span className="item-text">Liked Videos</span>
        </NavLink>

        <NavLink className="sidebar-item" to="/history">
          <MdHistory size={20} />
          <span className="item-text">History</span>
        </NavLink>

        <NavLink className="sidebar-item" to="/watch-later">
          <MdVideoLibrary size={20} />
          <span className="item-text">Watch Later</span>
        </NavLink>

        <NavLink className="sidebar-item" to="/playlist">
          <RiPlayList2Line size={20} />
          <span className="item-text">Playlist</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
