import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

import {
    FaBoxOpen,
    FaCreditCard,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaShoppingCart,
    FaRedo,
    FaMoneyBillWave
} from "react-icons/fa";

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

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const res = await axios.get(`/orders/${userId}`);

            setOrders(res.data);

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to load orders.");

        }

        finally {

            setLoading(false);

        }

    };

    const payNow = (orderId) => {

        toast("Redirecting to payment...");

        navigate("/checkout", {

            state: {

                pendingOrderId: orderId

            }

        });

    };

    const buyAgain = () => {

        navigate("/");

    };

    const cancelOrder = () => {

        toast("Cancel feature coming soon.");

    };

    if (loading) {

        return (

            <div className="orders-loading">

                <h2>Loading your orders...</h2>

            </div>

        );

    }

    return (

        <div className="orders-page">

            <div className="orders-header">

                <div>

                    <h1>

                        <FaBoxOpen />

                        My Orders

                    </h1>

                    <p>

                        Track all your purchases in one place.

                    </p>

                </div>

                <div className="orders-summary">

                    <div>

                        <span>Total Orders</span>

                        <h2>{orders.length}</h2>

                    </div>

                    <FaShoppingCart />

                </div>

            </div>

            {

                orders.length === 0 ?

                (

                    <div className="empty-orders">

                        <FaBoxOpen />

                        <h2>No Orders Yet</h2>

                        <p>

                            Start shopping and your orders will appear here.

                        </p>

                    </div>

                )

                :

                orders.map(order => (

                    <div
                        className="order-card"
                        key={order.id}
                    >

                        <div className="order-top">

                            <div>

                                <h2>

                                    Order #{order.id}

                                </h2>

                                <p>

                                    {

                                        new Date(

                                            order.orderDate

                                        ).toLocaleString()

                                    }

                                </p>

                            </div>

                            <div
                                className={`status ${(order.status || "PENDING").toLowerCase()}`}
                            >

                                {

                                    order.status === "PAID"

                                    ?

                                    <>

                                        <FaCheckCircle />

                                        Paid

                                    </>

                                    :

                                    order.status === "CANCELLED"

                                    ?

                                    <>

                                        <FaTimesCircle />

                                        Cancelled

                                    </>

                                    :

                                    <>

                                        <FaClock />

                                        Pending

                                    </>

                                }

                            </div>

                        </div>
                                                <div className="order-products">

                            {

                                order.items?.map((item) => (

                                    <div
                                        className="order-product"
                                        key={item.id}
                                    >

                                        <img
                                            src={
                                                item.imageUrl ||
                                                "https://placehold.co/150x150?text=No+Image"
                                            }
                                            alt={item.productName}
                                            className="product-image"
                                        />

                                        <div className="product-info">

                                            <h3>

                                                {item.productName}

                                            </h3>

                                            <p>

                                                ₹ {item.price}

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

                        </div>

                        <div className="order-bottom">

                            <div className="order-total">

                                <span>

                                    Total Amount

                                </span>

                                <h2>

                                    ₹ {order.totalAmount.toFixed(2)}

                                </h2>

                            </div>

                            <div className="order-actions">

                                {

                                    order.status === "PENDING" &&

                                    <button
                                        className="pay-btn"
                                        onClick={() => payNow(order.id)}
                                    >

                                        <FaCreditCard />

                                        Pay Now

                                    </button>

                                }

                                {

                                    order.status === "PENDING" &&

                                    <button
                                        className="cancel-btn"
                                        onClick={() => cancelOrder(order.id)}
                                    >

                                        <FaTimesCircle />

                                        Cancel

                                    </button>

                                }

                                {

                                    order.status === "PAID" &&

                                    <button
                                        className="buy-btn"
                                        onClick={buyAgain}
                                    >

                                        <FaRedo />

                                        Buy Again

                                    </button>

                                }

                                <button
                                    className="invoice-btn"
                                    onClick={() =>
                                        toast.success(
                                            "Invoice feature coming soon."
                                        )
                                    }
                                >

                                    <FaMoneyBillWave />

                                    Invoice

                                </button>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default Orders;