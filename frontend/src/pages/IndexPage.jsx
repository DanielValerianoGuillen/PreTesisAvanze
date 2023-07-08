import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [products, SetProducts] = useState([]);
  useEffect(() => {
    axios.get("/products").then((response) => {
      SetProducts(response.data);
    });
  }, []);
  return (
    <did className="mt-8 grid gap-x-6 gap-y-8   grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.length > 0 &&
        products.map((product) => (
          <Link to={'/product/'+product._id}>
            <div className="bg-gray-200 mb-2 rounded-2xl flex">
              {product.photos?.[0] && (
                <img
                  className=" rounded-2xl object-cover aspect-square"
                  src={`http://localhost:4000/uploads/${product.photos[0]}`}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{product.title}</h2>
            <h3 className="text-sm text-gray-500">{product.name}</h3>
            <div className="mt-1">
              Precio: <span className="font-bold">{product.price}</span>
            </div>
          </Link>
        ))}
    </did>
  );
};

export default IndexPage;
