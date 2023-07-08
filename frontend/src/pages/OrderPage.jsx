import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import OrderDates from "../components/OrderDates";

const OrderPage = () => {
    const [order, setOrder] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get('/orders').then(response => {
                const foundOrder = response.data.find(({ _id }) => _id === id);
                if (foundOrder) {
                    setOrder(foundOrder);
                }
            });
        }
    }, [id]);

    if (!order) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{order.product.title}</h1>

            <h2 className="flex gap-1 my-3 font-semibold underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                {order.product.name}</h2>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                <h2 className="text-2xl mb-4">Informacion de tu Reserva</h2>
                <OrderDates order={order} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div className="">Precio Total </div>
                    <div className="text-3xl"> S/{order.price}</div>
                </div>
               
            </div>
            <ProductGallery product = {order.product} />

        </div>
    );
}

export default OrderPage;