import {
    FaUserCircle,
    FaEnvelope,
    FaUserShield,
    FaShoppingCart,
    FaBoxOpen,
    FaHeart,
    FaCog,
    FaSignOutAlt,
    FaHome
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "../api/axios";

import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [orders, setOrders] = useState([]);
    const [wishlist,setWishlist]=useState([]);

    const [cart, setCart] = useState(null);
    const [editing, setEditing] = useState(false);

const [username, setUsername] = useState(
    currentUser.username
);

const [email, setEmail] = useState(
    currentUser.email || ""
);

    useEffect(() => {

        if (!currentUser) {

            navigate("/login");

            return;

        }

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const orderRes = await axios.get(

                `/orders/${currentUser.id}`

            );

            setOrders(orderRes.data);

        } catch (err) {

            console.log(err);

        }

        try {

            const cartRes = await axios.get(

                `/cart/${currentUser.id}`

            );

            setCart(cartRes.data);

        } catch (err) {

            console.log(err);

        }
        try{

    const wishlistRes=await axios.get(

        `/wishlist/${currentUser.id}`

    );

    setWishlist(wishlistRes.data);

}

catch(err){

    console.log(err);

}

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };
    const saveProfile = async () => {

    try {

        // Backend API can be added later

        const updatedUser = {

            ...currentUser,

            username,

            email

        };

        localStorage.setItem(

            "user",

            JSON.stringify(updatedUser)

        );

        toast.success("Profile Updated");

        setEditing(false);

    }

    catch(err){

        console.log(err);

        toast.error("Unable to update profile");

    }

};

    if (!currentUser) return null;
    return (

    <div className="profile-page">

        <div className="profile-container">

            {/* Left Sidebar */}

            <div className="profile-sidebar">

                <div className="profile-avatar">

                    <FaUserCircle />

                </div>

                <h2>{currentUser.username}</h2>

                <span className="profile-role">

                    {currentUser.role}

                </span>

                <div className="sidebar-menu">

                    <button onClick={() => navigate("/")}>

                        <FaHome />

                        Home

                    </button>

                    <button onClick={() => navigate("/orders")}>

                        <FaBoxOpen />

                        My Orders

                    </button>

                   <button

    onClick={() => navigate("/wishlist")}

>

    <FaHeart />

    Wishlist

</button>

                    <button>

                        <FaCog />

                        Settings

                    </button>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>

            {/* Right Content */}

            <div className="profile-content">

                <div className="welcome-card">

                    <h1>

                        Welcome back,

                        <span>

                            {" "}

                            {currentUser.username}

                        </span>

                        👋

                    </h1>

                    <p>

                        Manage your account, orders and shopping activity.

                    </p>

                </div>

                {/* Stats */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <FaShoppingCart />

                        <h2>

                            {cart?.items?.length || 0}

                        </h2>

                        <p>

                            Cart Items

                        </p>

                    </div>

                    <div className="stat-card">

                        <FaBoxOpen />

                        <h2>

                            {orders.length}

                        </h2>

                        <p>

                            Orders

                        </p>

                    </div>

                    <div className="stat-card">

                        <FaHeart />

                       <h2>

{wishlist.length}

</h2>

                        <p>

                            Wishlist

                        </p>

                    </div>

                </div>

                {/* Account Details */}

               <div className="profile-details-card">

    <div className="details-header">

        <h2>

            Account Details

        </h2>

        <button

            className="edit-btn"

            onClick={() =>

                editing

                ?

                saveProfile()

                :

                setEditing(true)

            }

        >

            {

                editing

                ?

                "Save"

                :

                "Edit Profile"

            }

        </button>

    </div>

    <div className="info-item">

        👤

        {

            editing

            ?

            (

                <input

                    value={username}

                    onChange={(e)=>

                        setUsername(e.target.value)

                    }

                />

            )

            :

            (

                <span>

                    {username}

                </span>

            )

        }

    </div>

    <div className="info-item">

        <FaEnvelope/>

        {

            editing

            ?

            (

                <input

                    value={email}

                    onChange={(e)=>

                        setEmail(e.target.value)

                    }

                />

            )

            :

            (

                <span>

                    {email || "No Email"}

                </span>

            )

        }

    </div>

    <div className="info-item">

        <FaUserShield/>

        <span>

            {currentUser.role}

        </span>

    </div>

</div>

                {/* Recent Orders */}

                <div className="recent-orders">

                    <h2>

                        Recent Orders

                    </h2>

                    {

                        orders.length > 0 ?

                        (

                            orders.slice(0,5).map(order=>(

                                <div

                                    key={order.id}

                                    className="recent-order"

                                >

                                    <div>

                                        <strong>

                                            Order #

                                            {order.id}

                                        </strong>

                                    </div>

                                    <div>

                                        ₹ {order.totalAmount}

                                    </div>

                                    <div

                                        className={

                                            order.status==="PAID"

                                            ?

                                            "paid"

                                            :

                                            "pending"

                                        }

                                    >

                                        {order.status}

                                    </div>

                                </div>

                            ))

                        )

                        :

                        (

                            <p>

                                No Orders Yet.

                            </p>

                        )

                    }

                </div>

            </div>

        </div>

    </div>

);

};

export default Profile;