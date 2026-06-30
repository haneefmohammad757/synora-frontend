import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Orders.css";

const Orders = () => {

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const userId = currentUser?.id;

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!userId) {

            navigate("/login");
            return;

        }

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await axios.get(`/orders/${userId}`);

            setOrders(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2 className="loading">Loading Orders...</h2>;

    }

    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {

                orders.length === 0 ?

                (

                    <h2 className="empty-orders">

                        No orders placed yet.

                    </h2>

                )

                :

                (

                    orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            <div className="order-header">

                                <div>

                                    <h3>

                                        Order #{order.id}

                                    </h3>

                                    <p>

                                        {new Date(order.orderDate).toLocaleString()}

                                    </p>

                                </div>

                                <span
                                    className={`status ${(order.status || "PENDING").toLowerCase()}`}
                                >

                                    {order.status || "PENDING"}

                                </span>

                            </div>

                            <hr />

                            {

                                order.items?.map((item) => (

                                    <div
                                        className="order-body"
                                        key={item.id}
                                    >

                                        <img
                                            className="order-image"
                                            src={
                                                item.imageUrl ||
                                                "https://placehold.co/120x120?text=No+Image"
                                            }
                                            alt={item.productName}
                                        />

                                        <div className="order-details">

                                            <h3>

                                                {item.productName}

                                            </h3>

                                            <p>

                                                Price : ₹ {item.price}

                                            </p>

                                            <p>

                                                Quantity : {item.quantity}

                                            </p>

                                            <h4>

                                                Subtotal :

                                                ₹ {(item.price * item.quantity).toFixed(2)}

                                            </h4>

                                        </div>

                                    </div>

                                ))

                            }

                            <hr />

                            <div className="order-footer">

                                <h3>

                                    Total Amount

                                </h3>

                                <h2>

                                    ₹ {order.totalAmount.toFixed(2)}

                                </h2>

                            </div>

                        </div>

                    ))

                )

            }

        </div>

    );

};

export default Orders;