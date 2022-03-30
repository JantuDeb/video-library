import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="flex-col">
      <Navbar />
      <main>
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
