import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
const Layout = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  return (
    <div className="flex-col">
      <Navbar toogle={setSideBar} />
      <main>
        <Sidebar sideBar={sideBar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
