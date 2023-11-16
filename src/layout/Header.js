import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeAutho } from "../StateManagement/autho";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
export const Header = () => {
  const nav = useNavigate();
  // const [signup, setSignUp] = useState(true);

  const auth = JSON.parse(localStorage.getItem("admin"));

  const handleLougout = () => {
    localStorage.clear();

    nav("/Signin");
  };

  return (
    <div>
      {auth ? (
        <div className="flex flex-col w-[200px] bg-cyan-950 text-white p-5 h-full space-y-2">
          <p className="text-2xl border-b-4">E-Commerce Dashboard</p>
          <Link to="/">Products</Link>

          {/* <Link to="/Profile">Profile</Link> */}
          <Link to="/Signin" onClick={handleLougout}>
            LogOut
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-[200px] bg-cyan-950 text-white p-5 h-full text-center space-y-5">
          <Link to="/Login">
            <LoginIcon />
            Login
          </Link>
          <Link to="/Signin">
            <PersonAddAlt1Icon />
            Sign
          </Link>
        </div>
      )}
    </div>
  );
};
