import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const DropdownMenu = ({ children }) => {
  return (
    <div className="dropdown flex justify-center">
      <button className="transparent p-0 radius-full text-white">
        <BiDotsVerticalRounded size={20} />
      </button>
      <div className="dropdown-menu flex-col gap-1">{children}</div>
    </div>
  );
};

export default DropdownMenu;
