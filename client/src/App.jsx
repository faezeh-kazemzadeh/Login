import React from "react";
import { BrowserRouter } from "react-router-dom";

import { FiSettings } from "react-icons/fi";
import Navbar from "./components/share/Navbar";
import { Footer } from "./components/index";
import ThemeProvider from './context/ThemeProvider.jsx';

export default function App() {
const activeMenu=false;

  return (
    <>
    <ThemeProvider>
        <div >
        <BrowserRouter>
         
          <div className=" md:static bg-main-bg dark:bg-main-bg navbar w-full " >
              <Navbar />
            </div>
            <Footer/>
        </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}
