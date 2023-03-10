import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Footer from "../footers/Footer";
import TopNavbar from "../navbars/TopNavbar";

const AuthLayout = () => {
  return (
    <>
      <TopNavbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AuthLayout;
