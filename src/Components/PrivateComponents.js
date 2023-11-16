import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { changeAutho } from "../StateManagement/autho";
export const PrivateComponents = () => {
  const auth = localStorage.getItem("admin");
  return auth ? <Outlet /> : <Navigate to="/Signin" />;
};
