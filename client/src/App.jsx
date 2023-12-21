import { BrowserRouter } from "react-router-dom";


import ProductProvider  from "./context/ProductProvider";
import { FiSettings } from "react-icons/fi";
import Navbar from "./components/share/Navbar";
import { Footer } from "./components/index";
import ThemeProvider from './context/ThemeProvider.jsx';

export default function App() {
const activeMenu=false;

  return (
    <>
    <ThemeProvider>
      <ProductProvider>
        <div>
        <BrowserRouter>
         
          <div className="fixed md:static bg-main-bg dark:bg-main-bg navbar w-full ">
              <Navbar />
            </div>
            <Footer/>
        </BrowserRouter>
        </div>
      </ProductProvider>
      </ThemeProvider>
    </>
  );
}
