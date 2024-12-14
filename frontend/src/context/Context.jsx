import { createContext, useContext, useState } from "react";

const Context = createContext();
const useusercontext = () => {
  return useContext(Context);
};

const UserProvider = ({ children }) => {
  let [authlogin, setauthlogin] = useState(
    JSON.parse(localStorage.getItem("authlogin"))
  );


  return (
    <Context.Provider value={{  authlogin, setauthlogin }}>
      {children}
    </Context.Provider>
  );
};

export { UserProvider, useusercontext };
