import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./ProductDetails.css";
import toast from "react-hot-toast";
function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        loadProduct();

    }, []);

    const loadProduct = async () => {

        try {

            const response = await axios.get(`/products/${id}`);

            setProduct(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const addToCart = async () => {

        if (!currentUser) {

            toast.error("Please login first.");

            navigate("/login");

            return;

        }

        try {

            await axios.post(

                "/cart/add",

                null,

                {

                    params: {

                        userId: currentUser.id,

                        productId: product.id,

                        quantity

                    }

                }

            );

            toast.success("Product added to cart.");

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to add product.");

        }

    };

    const buyNow = async () => {

        if (!currentUser) {

            toast.error("Please login first.");

            navigate("/login");

            return;

        }

        try {

            await axios.post(

                "/cart/add",

                null,

                {

                    params: {

                        userId: currentUser.id,

                        productId: product.id,

                        quantity

                    }

                }

            );

            navigate("/checkout");

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to proceed.");

        }

    };

    if (!product) {

        return <h2 className="loading">Loading Product...</h2>;

    }

    const discountedPrice =

        product.discount > 0

            ?

            Math.round(

                product.price *

                (1 - product.discount / 100)

            )

            :

            product.price;

    return (

        <div className="details-container">

            <button

                className="back-btn"

                onClick={() => navigate(-1)}

            >

                ← Back

            </button>

            <div className="breadcrumb">

                <span

                    onClick={() => navigate("/")}

                >

                    Home

                </span>

                <span className="separator">

                    &gt;

                </span>

                <span>

                    {product.category}

                </span>

                {

                    product.brand &&

                    <>

                        <span className="separator">

                            &gt;

                        </span>

                        <span>

                            {product.brand}

                        </span>

                    </>

                }

                <span className="separator">

                    &gt;

                </span>

                <span className="current">

                    {product.name}

                </span>

            </div>

            <div className="details-card">

                <div className="details-image">

                    <img

                        src={

                            product.imageUrl ||

                            "https://placehold.co/500x500"

                        }

                        alt={product.name}

                    />

                </div>

                <div className="details-info">

                    <span className="category">

                        {product.category}

                    </span>

                    <h1>

                        {product.name}

                    </h1>

                    <p className="brand">

                        Brand :

                        <strong>

                            {product.brand || "Synora"}

                        </strong>

                    </p>

                    <div className="rating-box">

                        ⭐⭐⭐⭐⭐

                        <span>

                            4.8 (128 Ratings)

                        </span>

                    </div>

                    <div className="price-box">

                        <h2>

                            ₹ {discountedPrice}

                        </h2>

                        {

                            product.discount > 0 &&

                            <>

                                <span className="old-price">

                                    ₹ {product.price}

                                </span>

                                <span className="discount">

                                    {product.discount}% OFF

                                </span>

                            </>

                        }

                    </div>
                                        <p

                        className={

                            product.quantity > 5

                                ?

                                "stock available"

                                :

                                "stock low"

                        }

                    >

                        {

                            product.quantity > 0

                                ?

                                `✅ ${product.quantity} pieces available`

                                :

                                "❌ Out Of Stock"

                        }

                    </p>

                    <div className="delivery">

                        🚚 Free Delivery

                    </div>

                    <div className="delivery">

                        🔄 7 Days Easy Return

                    </div>

                    <div className="delivery">

                        🔒 100% Secure Payment

                    </div>

                    <div className="highlights">

                        <h3>

                            Product Highlights

                        </h3>

                        <ul>

                            <li>

                                Premium Quality Material

                            </li>

                            <li>

                                Cash On Delivery Available

                            </li>

                            <li>

                                Easy Return Policy

                            </li>

                            <li>

                                1 Year Manufacturer Warranty

                            </li>

                        </ul>

                    </div>

                    <p className="description">

                        {product.description}

                    </p>

                    <div className="quantity-box">

                        <button

                            onClick={() =>

                                quantity > 1 &&

                                setQuantity(quantity - 1)

                            }

                        >

                            −

                        </button>

                        <span>

                            {quantity}

                        </span>

                        <button

                            onClick={() =>

                                setQuantity(quantity + 1)

                            }

                        >

                            +

                        </button>

                    </div>

                    <div className="action-buttons">

                        <button

                            className="cart-btn"

                            onClick={addToCart}

                        >

                            🛒 Add To Cart

                        </button>

                        <button

                            className="buy-btn"

                            onClick={buyNow}

                        >

                            Buy Now

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProductDetails;