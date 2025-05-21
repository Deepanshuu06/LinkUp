import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Body;
