import React, { useEffect } from "react";
import { Header } from "../layout/Header";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
};
