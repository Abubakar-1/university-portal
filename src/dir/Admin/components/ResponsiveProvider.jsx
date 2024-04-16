import React, { createContext, useState } from "react";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const handleClicked = () => {
    setClicked((prev) => !prev);
  };
  return (
    <>
      <ResponsiveContext.Provider
        value={{ clicked, setClicked, handleClicked }}
      >
        {children}
      </ResponsiveContext.Provider>
    </>
  );
};

export { ResponsiveContext };
