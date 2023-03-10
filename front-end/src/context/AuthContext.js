import React, { createContext, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const localStrUser = window.localStorage.getItem("user");
  let localStorageUser;
  if (localStrUser !== "undefined") {
    localStorageUser =
      typeof window !== "undefined" ? JSON.parse(localStrUser) : null;
  }
  const [user, setUser] = useState(localStorageUser ? localStorageUser : {});

  const logoutUser = async () => {
    setUser(null);
    window.localStorage.clear("user");
  };

  const updateUser = async (data) => {
    setUser(data);
    window.localStorage.clear("user");
    window.localStorage.setItem("user", JSON.stringify({ ...data }));
  };

  const contextData = {
    user: user,
    updateUser: updateUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
