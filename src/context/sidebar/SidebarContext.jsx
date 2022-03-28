import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext(false);
const SidebarProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  return (
    <SidebarContext.Provider value={{ sideBar, toogle: setSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};
const useSideBar = () => useContext(SidebarContext);
export { SidebarProvider, useSideBar };
