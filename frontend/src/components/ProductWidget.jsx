import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import {Navigate} from "react-router-dom";
import axios from "axios";

const ProductWidget = ({ product }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [amount, SetAmount] = useState(1)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    
    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);
    

    


    let numberOfamount = 0;
    if (checkIn && checkOut) {
        numberOfamount = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }


    async function OrderThisProduct() {
        const response = await axios.post('/orders', {
          checkIn,checkOut,amount,name,phone,
          product:product._id,
          price: amount * product.price,
        });
        const OrderId = response.data._id;
        setRedirect(`/account/orders/${OrderId}`);
      }

      if (redirect) {
        return <Navigate to={redirect} />
      }


    return (

        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Precio : ${product.price}

            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4 ">
                        <label >Fecha orden : </label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4  border-l ">
                        <label >Fecha Llegada : </label>
                        <input type="date" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4  border-t ">
                    <label >Cantidad : </label>
                    <input type="number"
                        value={amount}
                        onChange={ev => SetAmount(ev.target.value)} />
                </div>

                {numberOfamount > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Nombre Completo:</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Numero Telefono:</label>
                        <input type="tel"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)} />
                    </div>
                )}


            </div>

            <button onClick={OrderThisProduct} className="primary mt-4">
                Trueque || Vender Producto 
                {numberOfamount > 0 && (
                    <span> ${numberOfamount * product.price}</span>
                )}
            </button>
        </div>
    );
}

export default ProductWidget;