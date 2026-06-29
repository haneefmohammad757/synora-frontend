import "./ProductCard.css";
import toast from "react-hot-toast";

import {
    FaShoppingCart,
    FaEye,
    FaStar,
    FaHeart
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const userId = currentUser?.id;
    const [isWishlisted, setIsWishlisted] = useState(false);

const [wishlistId, setWishlistId] = useState(null);
useEffect(() => {

    if (userId) {

        checkWishlist();

    }

}, [userId, product.id]);

const checkWishlist = async () => {

    try {

        const response = await axios.get(

            `/wishlist/${userId}`

        );

        const item = response.data.find(

            w => w.product.id === product.id

        );

        if (item) {

            setIsWishlisted(true);

            setWishlistId(item.id);

        }

    }

    catch (err) {

        console.log(err);

    }

};

    const addToCart = async () => {

        if (!currentUser || !currentUser.id) {

            toast("Please login first.");

            navigate("/login");

            return;

        }

        try {

            await axios.post("/cart/add", null, {

                params: {

                    userId,

                    productId: product.id,

                    quantity: 1

                }

            });

            toast.success("Added to cart 🛒");

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to add product.");

        }

    };
    const toggleWishlist = async () => {

    if (!currentUser) {

        toast("Please login first.");

        navigate("/login");

        return;

    }

    try {

        if (isWishlisted) {

            await axios.delete(

                `/wishlist/${wishlistId}`

            );

            setIsWishlisted(false);

            setWishlistId(null);

        }

        else {

            const response = await axios.post(

                "/wishlist/add",

                null,

                {

                    params: {

                        userId,

                        productId: product.id

                    }

                }

            );

            setIsWishlisted(true);

            setWishlistId(response.data.id);

        }

    }

    catch (error) {

        console.log(error);

    }

};

    return (

        <div className="product-card">

            <div className="image-container">

    <span className="discount">

        {product.discount || 0}% OFF

    </span>

    <span

        className={

            isWishlisted

                ? "wishlist active"

                : "wishlist"

        }

        onClick={(e) => {

            e.preventDefault();

            e.stopPropagation();

            toggleWishlist();

        }}

    >

        <FaHeart />

    </span>

    <img

        src={
            product.imageUrl ||
            "https://placehold.co/400x400"
        }

        alt={product.name}

        className="product-image"

        onClick={() => navigate(`/product/${product.id}`)}

    />

</div>
            <div className="product-info">

                <span className="category">

                    {product.category}

                </span>

                <h3>

                    {product.name}

                </h3>

                <div className="rating">

                    <FaStar />

                    <FaStar />

                    <FaStar />

                    <FaStar />

                    <FaStar />

                    <span>

    New Arrival

</span>

                </div>

                <div className="price-section">

    {

        product.discount > 0 ?

        (

            <>

                <h2>

                    ₹ {

                        Math.round(

                            product.price *

                            (1 - product.discount / 100)

                        )

                    }

                </h2>

                <span className="old-price">

                    ₹ {product.price}

                </span>

            </>

        )

        :

        (
<div className="price-box">

{

product.discount>0

?

(

<>

<h2>

₹ {

Math.round(

product.price*

(1-product.discount/100)

)

}

</h2>

<span className="old-price">

₹ {product.price}

</span>

<span className="discount">

{product.discount}% OFF

</span>

</>

)

:

(

<h2>

₹ {product.price}

</h2>

)

}

</div>
        )

    }

</div>
                <p

className={

product.quantity>5

?

"stock available"

:

"stock low"

}
>

                    {product.quantity > 0

                        ? `Only ${product.quantity} Left`

                        : "Out Of Stock"}

                </p>

                <div className="buttons">

                    <button

                        className="details-btn"

                        onClick={() =>
                            navigate(`/product/${product.id}`)
                        }

                    >

                        <FaEye />

                        View

                    </button>

                    <button

                        className="cart-btn"

                        onClick={addToCart}

                    >

                        <FaShoppingCart />

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ProductCard;