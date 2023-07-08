import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductWidget from "../components/ProductWidget";
import ProductGallery from "../components/ProductGallery";


const ProduPage = () => {

    const { id } = useParams()

    const [product, SetProduct] = useState(null)


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/products/${id}`).then(response => {
            SetProduct(response.data)
        })

    }, [id])

    if (!product) {
        return "";
    }

    
    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 ">
            <h1 className="text-3xl">Titulo {product.title}</h1>
            <h2 className="flex gap-1 my-3 font-semibold underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>

                {product.name}</h2>

                <ProductGallery product={product} />

            <div className="mt-8 mb-8 grid ga-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Descripcion</h2>
                        {product.description}
                    </div>
                    Color : {product.color} <br />
                    Marca : {product.brand} <br />
                    Tamaño : {product.size}

                </div>
                <div className="">
                    <ProductWidget product={product}  />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Informacion Extra</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {product.extraInfo}
                </div>
            </div>
        </div>

    );
}

export default ProduPage;