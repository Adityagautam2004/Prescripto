import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ( props ) => {

  const currency = "$"

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age;
  }

    const value = {
      calculateAge,
      currency
    };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;