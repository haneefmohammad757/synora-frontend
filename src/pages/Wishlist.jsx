import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Wishlist.css";
import toast from "react-hot-toast";
const Wishlist = () => {

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {

        if (!currentUser) {

            navigate("/login");

            return;

        }

        loadWishlist();

    }, []);

    const loadWishlist = async () => {

        try {

            const response = await axios.get(

                `/wishlist/${currentUser.id}`

            );

            setWishlist(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const removeWishlist = async (id) => {

        try {

            await axios.delete(

                `/wishlist/${id}`

            );

            loadWishlist();

        }

        catch (error) {

            console.log(error);

        }

    };

    const moveToCart = async (item) => {

        try {

            await axios.post(

                "/cart/add",

                null,

                {

                    params: {

                        userId: currentUser.id,

                        productId: item.product.id,

                        quantity: 1

                    }

                }

            );

            await axios.delete(

                `/wishlist/${item.id}`

            );

            loadWishlist();

            toast.success("Moved to Cart");

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="wishlist-page">

            <h1>

                ❤️ My Wishlist

            </h1>

            {

                wishlist.length === 0 ?

                (

                    <h2>

                        Your wishlist is empty.

                    </h2>

                )

                :

                (

                    <div className="wishlist-grid">

                        {

                            wishlist.map(item=>(

                                <div

                                    key={item.id}

                                    className="wishlist-card"

                                >

                                    <img

                                        src={

                                            item.product.imageUrl

                                        }

                                        alt=""

                                    />

                                    <h3>

                                        {item.product.name}

                                    </h3>

                                    <p>

                                        ₹ {item.product.price}

                                    </p>

                                    <div className="wishlist-buttons">

                                        <button

                                            className="cart-btn"

                                            onClick={()=>

                                                moveToCart(item)

                                            }

                                        >

                                            Move to Cart

                                        </button>

                                        <button

                                            className="remove-btn"

                                            onClick={()=>

                                                removeWishlist(item.id)

                                            }

                                        >

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default Wishlist;