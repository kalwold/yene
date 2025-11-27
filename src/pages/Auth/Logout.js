import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout(); // logout() already navigates
  }, []);

  return null;
};

export default Logout;
