import React, { useContext } from "react";
import AuthContext from "./context/AuthContext.js";
import TopNavbar from "./components/navbars/TopNavbar.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Signup from "./pages/signup/Signup.js";
import Footer from "./components/footers/Footer.js";
import Home from "./pages/home/Home.js";

const App = () => {
  let { user } = useContext(AuthContext);
  return (
    <>
      {user && user.email ? "" : <TopNavbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/"
          index
          element={user && user.email ? <Home /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {user && user.email ? "" : <Footer />}
    </>
  );
};

export default App;
