import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState("");

  const backendUrl = import.meta.env.BACKEND_URL

  const value = {
    aToken,
    setAToken,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
