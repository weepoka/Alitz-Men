import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import AdminChecker from "../components/Admin/Check";
const Adminlayout = () => {
  return (
    <div className="  flex  bg-[#21262e]  ">
      <AdminChecker />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Adminlayout;
