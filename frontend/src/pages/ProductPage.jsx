import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductImg from "../components/ProductImg";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/user-products").then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/product/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Agregar un Nuevo Producto
        </Link>
      </div>
      <div className="mt-4">
        {products.length > 0 &&
          products.map((product) => (
            <Link
              to={"/account/product/" + product._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              key={product}
            >
              <div className="flex w-48 h-48  bg-gray-300 flex-grow shrink-0">
               <ProductImg product={product} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-2xl ">{product.title}</h2>
                <p className="text-sm mt-2">{product.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
