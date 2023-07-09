import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import ProductImg from "../components/ProductImg";
import { Link } from "react-router-dom";
import OrderDates from "../components/OrderDates";

const OrdersPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/orders').then(response => {
            setOrders(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div>
                {orders?.length > 0 && orders.map(order => (
                    <Link key={order._id} to={`/account/orders/${order._id}`} className="flex mb-2 gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-32">
                            <ProductImg product={order.product} />
                        </div>
                        <div className="py-4 pr-3 grow">
                            <h2 className="text-xl">{order.product.title}</h2>
                            <div className="text-xl">

                            <OrderDates order={order} className="mb-2 mt-4 text-gray-500" />
                                
                                <div className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span className="text-2xl">
                                        Total precio: ${order.price}

                                    </span>
                                </div>


                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default OrdersPage;