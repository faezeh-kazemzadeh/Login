import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
const initialState = {
  userProfile: false,
  cart: false,
  notification: false,
};
export default function ThemeProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const handleClick = (clicked) => {
    if (isClicked[clicked] === false) {
      setIsClicked({ ...initialState, [clicked]: true });
    } else {
      setIsClicked({ ...initialState, [clicked]: false });
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export const useThemeContext = () => {
  const themes = useContext(ThemeContext);
  return themes;
};
