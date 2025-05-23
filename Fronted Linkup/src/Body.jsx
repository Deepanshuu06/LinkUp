import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import { NavigationMenu } from "./components/ui/navigation-menu";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useDispatch } from "react-redux";
import { isLoggedIn, setUser } from "./utils/slices/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
      dispatch(isLoggedIn(true));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
