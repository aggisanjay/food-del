import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { storeContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(storeContext);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userOrders", {}, {
                headers: { token }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {error && <p className='error-message'>Error: {error}</p>}
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt='Order Icon' />
                            <p>
                                {order.items.map((item, i) =>
                                    i === order.items.length - 1
                                        ? `${item.name} X ${item.quantity}`
                                        : `${item.name} X ${item.quantity}, `
                                )}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
}

export default MyOrders;

