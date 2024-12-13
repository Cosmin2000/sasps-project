import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders().then(setOrders);
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        Order #{order.id} (User ID: {order.userId}) - Total: ${order.total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
