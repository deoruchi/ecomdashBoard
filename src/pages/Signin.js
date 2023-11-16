import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeAutho } from "../StateManagement/autho";
import { useDispatch } from "react-redux";

export const Signin = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("admin");
    if (auth) {
      nav("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:3400/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    result = await result.json();

    if (result.auth) {
      localStorage.setItem("admin", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      nav("/");
    }
  };

  return (
    <section className="p-12 bg-slate-300 w-full flex flex-col items-center space-y-3">
      <h1 className="text-2xl">Signin </h1>
      <form className="flex flex-col justify-center w-full items-center space-y-5">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-1/4 border rounded-md p-2"
        />
        <input
          type="Email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-1/4 border rounded-md p-2"
        ></input>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-1/4 border rounded-md p-2"
        ></input>
        <button
          onClick={handleSubmit}
          className=" bg-blue-950 text-white w-1/4 rounded-md p-2 uppercase"
        >
          Submit
        </button>
        <p>
          If Already a Admin:
          <span className=" text-blue-600">
            <Link to="/Login">Login</Link>
          </span>
        </p>{" "}
      </form>
    </section>
  );
};
