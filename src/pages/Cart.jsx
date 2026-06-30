import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "../api/axios";

import "./Cart.css";

const Cart = () => {

    const navigate = useNavigate();

    
    const currentUser = JSON.parse(localStorage.getItem("user"));

const userId = currentUser?.id;

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCart();

    }, []);

    // Load cart from backend
    const fetchCart = async () => {

        if (!userId) {

    navigate("/login");

    return;

}

        try {

            const response = await axios.get(`/cart/${userId}`);

            setCart(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    // Remove an item
    const removeItem = async (itemId) => {

        try {

            await axios.delete(`/cart/remove/${itemId}`);

            fetchCart();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to remove item.");

        }

    };

    // Calculate total amount
    const total = cart?.items?.reduce(

        (sum, item) =>

            sum + item.product.price * item.quantity,

        0

    ) || 0;

    if (loading) {

        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    }

    return (

        <div className="cart-page">

            <h1>Shopping Cart</h1>

            <div className="cart-container">

                <div className="cart-items">

                    {

                        cart?.items?.length > 0 ? (

                            cart.items.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item.id}
                                >

                                    <img

                                        src={
                                            item.product.imageUrl ||
                                            "https://placehold.co/120x120?text=No+Image"
                                        }

                                        alt={item.product.name}

                                    />

                                    <div className="cart-info">

                                        <h3>

                                            {item.product.name}

                                        </h3>

                                        <p>

                                            ₹ {item.product.price}

                                        </p>

                                        <p>

                                            Quantity : {item.quantity}

                                        </p>

                                        <p>

                                            Subtotal :

                                            ₹ {(item.product.price * item.quantity).toFixed(2)}

                                        </p>

                                    </div>

                                    <button

                                        className="remove-btn"

                                        onClick={() => removeItem(item.id)}

                                    >

                                        Remove

                                    </button>

                                </div>

                            ))

                        ) : (

                            <h2>

                                Your cart is empty.

                            </h2>

                        )

                    }

                </div>

                <div className="cart-summary">

                    <h2>Order Summary</h2>

                    <hr />

                    <div className="summary-row">

                        <span>Subtotal</span>

                        <span>

                            ₹ {total.toFixed(2)}

                        </span>

                    </div>

                    <div className="summary-row">

                        <span>Shipping</span>

                        <span>FREE</span>

                    </div>

                    <div className="summary-row total">

                        <span>Total</span>

                        <span>

                            ₹ {total.toFixed(2)}

                        </span>

                    </div>

                    <button

                        className="checkout-btn"

                        onClick={() => navigate("/checkout")}

                    >

                        Proceed to Checkout

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Cart;