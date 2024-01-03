import {  useProducts } from "../../../context/ProductProvider";
import { IoTrashBin } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const {products} = useProducts();
  

  return (
    <div>
      <h1>AllProducts</h1>
  
      <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
          {products && products.length > 0 ? (
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b bg-white font-medium">
              <tr>
              <th scope="col" className="px-6 py-4">
                  Product 
                </th>
                <th scope="col" className="px-6 py-4">
                  Product name
                </th>
                <th scope="col" className="px-6 py-4">
                  Regular Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Discount
                </th>
                <th scope="col" className="px-6 py-4">
                  Count
                </th>
                <th scope="col" className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b"
                >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                    <img className=" w-10 h-10"
        src={`http://localhost:3000/images/${ product.imageUrls[0].name}`}
        srcSet={`http://localhost:3000/images/${product.imageUrls[0].name}`}
        alt={product.name}
      />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {product.regularPrice}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {product.discount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {product.count}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                    <button type="button"><IoTrashBin /></button>
                    <Link to={`/admin/dashboard/product/update/${product._id}`}><GrUpdate /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> ) : (
          <p>nist</p>
        )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
