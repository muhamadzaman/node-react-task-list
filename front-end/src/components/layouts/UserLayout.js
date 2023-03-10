import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/home/Home";
import Footer from "../footers/Footer";

const AuthLayout = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AuthLayout;
