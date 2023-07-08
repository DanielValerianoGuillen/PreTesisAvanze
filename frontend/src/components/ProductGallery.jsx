import { useState } from "react";

const ProductGallery = ({product}) => {

    const [showAllPhotos, SetShowAllPhotos] = useState(false)

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">

                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Fotos de {product.title}</h2>
                        <button onClick={() => SetShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            Cerrar fotos</button>
                    </div>
                    {product?.photos?.length > 0 && product.photos.map(photos => (
                        <div >
                            <img src={'http://localhost:4000/uploads/' + photos} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
    <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div className="">
                {product.photos?.[0] && (
                    <div>
                        <img onClick={() => SetShowAllPhotos(true)} className="aspect-auto cursor-pointer object-cover" src={"http://localhost:4000/uploads/" + product.photos[0]} alt="" />
                    </div>
                )}
            </div>
            <div className="grid">
                {product.photos?.[1] && (
                    <img onClick={() => SetShowAllPhotos(true)} className="aspect-auto cursor-pointer object-cover" src={"http://localhost:4000/uploads/" + product.photos[1]} alt="" />
                )}
                <div className="overflow-hidden">
                    {product.photos?.[2] && (
                        <img onClick={() => SetShowAllPhotos(true)} className="aspect-auto cursor-pointer object-cover relative top-2" src={"http://localhost:4000/uploads/" + product.photos[2]} alt="" />
                    )}
                </div>
            </div>
        </div>
        <button onClick={() => SetShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Mas Fotos
        </button>
    </div>);
}

export default ProductGallery;