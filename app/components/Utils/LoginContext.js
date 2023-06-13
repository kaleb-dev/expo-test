import React, { createContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={loggedIn}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;