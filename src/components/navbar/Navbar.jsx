import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAirplay, MdPerson } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
const Navbar = ({ hideHamburgerMenu , toogle}) => {
  const { authState } = useAuth();

  const handleClick = () => toogle((v) => !v);
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {!hideHamburgerMenu && (
          <button className="header-menu flex center p-0" onClick={handleClick}>
            <GiHamburgerMenu size={25} color="white" />
          </button>
        )}

        <Link to="/" className="logo flex center">
          <MdAirplay size={25} color="red" />
        </Link>
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
        <div className="profile-icon">
          {authState.isLogedIn ? (
            <Link to="/profile">
              {authState.user.photo ? (
                <img src={authState.user.photo?.secure_url} alt=""  className="avatar-small radius-full"/>
              ) : (
                <MdPerson size={40} />
              )}
            </Link>
          ) : (
            <Link to="/login">
              <span className="btn-grad-red px-2 py-1 radius-md">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
