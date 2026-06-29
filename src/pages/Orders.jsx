import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";
import {
    FaUserCircle,
    FaEnvelope,
    FaUserShield,
    FaShoppingBag,
    FaHeart,
    FaShoppingCart,
    FaEdit,
    FaSignOutAlt
} from "react-icons/fa";

import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [ordersCount, setOrdersCount] = useState(0);

    const [wishlistCount, setWishlistCount] = useState(0);

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {

        if (!currentUser) {

            navigate("/login");

            return;

        }

        loadProfileData();

    }, []);

    const loadProfileData = async () => {

        try {

            const orders = await axios.get(

                `/orders/${currentUser.id}`

            );

            setOrdersCount(orders.data.length);

        }

        catch (err) {

            console.log(err);

        }

        try {

            const wishlist = await axios.get(

                `/wishlist/${currentUser.id}`

            );

            setWishlistCount(wishlist.data.length);

        }

        catch (err) {

            console.log(err);

        }

        try {

            const cart = await axios.get(

                `/cart/${currentUser.id}`

            );

            setCartCount(

                cart.data.items

                    ?

                    cart.data.items.length

                    :

                    0

            );

        }

        catch (err) {

            console.log(err);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        toast.success("Logged out successfully.");

        navigate("/login");

    };

    if (!currentUser) {

        return null;

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-avatar">

                    <FaUserCircle />

                </div>

                <h2>

                    {currentUser.username}

                </h2>

                <span className="profile-role">

                    {currentUser.role}

                </span>

                <div className="profile-info">

                    <div className="info-row">

                        <FaEnvelope />

                        <span>

                            {currentUser.email || "Not Available"}

                        </span>

                    </div>

                    <div className="info-row">

                        <FaUserShield />

                        <span>

                            {currentUser.role}

                        </span>

                    </div>

                </div>

                <div className="profile-stats">

                    <div className="stat-card">

                        <FaShoppingBag />

                        <h3>

                            {ordersCount}

                        </h3>

                        <p>

                            Orders

                        </p>

                    </div>

                    <div className="stat-card">

                        <FaHeart />

                        <h3>

                            {wishlistCount}

                        </h3>

                        <p>

                            Wishlist

                        </p>

                    </div>

                    <div className="stat-card">

                        <FaShoppingCart />

                        <h3>

                            {cartCount}

                        </h3>

                        <p>

                            Cart

                        </p>

                    </div>

                </div>
                 <div className="profile-actions">

                    <button

                        className="edit-profile-btn"

                        onClick={() =>

                            toast("Edit Profile feature coming soon.")

                        }

                    >

                        <FaEdit />

                        Edit Profile

                    </button>

                    <button

                        className="logout-profile-btn"

                        onClick={logout}

                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Profile;