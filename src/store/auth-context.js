import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  userIsLoggedIn: false,
});

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
  };

  const authCtx = {
    token,
    userIsLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
