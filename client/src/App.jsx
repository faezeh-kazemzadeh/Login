import { BrowserRouter } from "react-router-dom";


import { ProductProvider } from "./context/ProductProvider";
import { FiSettings } from "react-icons/fi";
import Navbar from "./components/share/Navbar";
import { Footer } from "./components/index";

export default function App() {
const activeMenu=false;

  return (
    <>
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
    </>
  );
}
