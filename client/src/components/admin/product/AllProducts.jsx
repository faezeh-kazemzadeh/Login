import { IoTrashBin } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/product/productsSlice";
import { setHasUpdate } from "../../../redux/product/productsSlice";
export default function AllProducts() {
  // const { updateProducts } = useProducts();
  // const {products} = useProducts();
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const { products, hasUpdate } = useSelector((state) => state.products);
  useEffect(() => {
    if (hasUpdate) {
      dispatch(fetchProducts());
    }
  }, [products , hasUpdate]);
  const deleteHandler = async (id) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/product/remove/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(setHasUpdate(true))
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      // updateProducts(true);
    }
  };

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
                      <tr key={product._id} className="border-b">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {product.imageUrls.length>0 && <img
                            className=" w-10 h-10"
                            src={`/images/${product.imageUrls[0].name}`}
                            srcSet={`/images/${product.imageUrls[0].name}`}
                            alt={product.name}
                          />}
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
                          <button
                            onClick={() => deleteHandler(product._id)}
                            disabled={isDeleting}
                          >
                            <IoTrashBin />
                          </button>
                          <Link
                            to={`/admin/dashboard/product/update/${product._id}`}
                          >
                            <GrUpdate />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>nist</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
