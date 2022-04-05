import React from "react";
import {
  MdHome,
  MdVideoLibrary,
  MdThumbUp,
  MdHistory,
  MdLogout,
} from "react-icons/md";
import { RiPlayList2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { useSideBar } from "../../context/sidebar/SidebarContext";
import "./Sidebar.css";
const Sidebar = () => {
  const { sideBar } = useSideBar();
  const { logOut, authState } = useAuth();
  return (
    <aside className={`${sideBar && "active"}`}>
      <nav className="side-nav">
        <NavLink className="sidebar-item" to="/">
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
        {authState.isLogedIn && (
          <Link className="sidebar-item" to="/" onClick={() => logOut()}>
            <MdLogout size={20} color="red" />
            <span className="item-text text-red">Logout</span>
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
