import React from "react";
import SideMenu from "../../widget/SideMenu";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <SideMenu />
      <Outlet />
    </div>
  );
};

export default MainLayout;
