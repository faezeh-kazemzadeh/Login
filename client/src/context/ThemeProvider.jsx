import React, {  createContext, useContext, useState } from 'react'

export const ThemeContext = createContext()
const initialState={
    userProfile:false,
    cart:false
}
export default function ThemeProvider({children}) {
    const [activeMenu,setActiveMenu]=useState(true)
    const [isClicked, setisClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const handleClick =(clicked)=>{
        console.log(clicked)
        setisClicked({...initialState,[clicked]:true})
    }
  return (
    <ThemeContext.Provider value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setisClicked,
        handleClick,
        screenSize,
        setScreenSize
    }}>
        {children}
    </ThemeContext.Provider>
  )
}
export const useThemeContext =()=> {
    const themes= useContext(ThemeContext);
    return themes
}
