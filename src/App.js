import "./App.css";
import { Home } from "./pages/Home";

import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import { Signin } from "./pages/Signin";
import { PrivateComponents } from "./Components/PrivateComponents";
import { Login } from "./pages/Login";
import { Header } from "./layout/Header";
import { Products } from "./pages/Products";
import { useEffect } from "react";
import { UpdateProd } from "./pages/UpdateProd";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-row h-[100vh] w-full">
        <Header />
        <Routes>
          <Route path="/" element={<PrivateComponents />}>
            <Route path="/product" element={<Products />}>
              {" "}
            </Route>
            <Route path="/UpdateProd/:id" element={<UpdateProd />}>
              {" "}
            </Route>

            {/* <Route path="/Profile" element={<h1>Profile Page</h1>}>
              {" "}
            </Route> */}
          </Route>
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
