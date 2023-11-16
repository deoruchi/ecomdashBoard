import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeAutho } from "../StateManagement/autho";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("admin");
    if (auth) {
      nav("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:3400/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((e) => {
      console.log("error message:", e);
    });

    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("admin", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      nav("/");
    } else {
      console.warn("Enter the write details");
    }
  };
  return (
    <section className="p-12 bg-slate-300 w-full flex flex-col items-center space-y-3">
      <h1 className="text-2xl">Login Admin </h1>
      <form className="flex flex-col justify-center w-full items-center space-y-5">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-1/4 border rounded-md p-2"
        ></input>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-1/4 border rounded-md p-2"
        ></input>
        <button
          onClick={handleLogin}
          className=" bg-blue-950 text-white w-1/4 rounded-md p-2 uppercase"
        >
          {" "}
          Login
        </button>

        <p>
          Don't Have a Account?{" "}
          <span className=" text-blue-600">
            <Link to="/Sign">Sign in</Link>
          </span>
        </p>
      </form>
    </section>
  );
};
