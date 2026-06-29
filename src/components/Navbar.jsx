import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    FaShoppingCart,
    FaUserCircle,
    FaCaretDown,
    FaBars,
    FaTimes,
    FaSearch,
    FaHeart,
    FaHome,
    FaBoxOpen
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = ({

    search,

    setSearch

}) => {     

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [mobileMenu, setMobileMenu] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    

    const [sticky, setSticky] = useState(false);

    const profileRef = useRef(null);

    useEffect(() => {

        const handleScroll = () => {

            setSticky(window.scrollY > 20);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    useEffect(() => {

        const closeMenu = (e) => {

            if (

                profileRef.current &&

                !profileRef.current.contains(e.target)

            ) {

                setShowProfile(false);

            }

        };

        document.addEventListener("mousedown", closeMenu);

        return () =>

            document.removeEventListener(

                "mousedown",

                closeMenu

            );

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    const goToProducts = () => {

        if (window.location.pathname !== "/") {

            navigate("/");

            setTimeout(() => {

                document

                    .getElementById("products")

                    ?.scrollIntoView({

                        behavior: "smooth"

                    });

            }, 300);

        }

        else {

            document

                .getElementById("products")

                ?.scrollIntoView({

                    behavior: "smooth"

                });

        }

        setMobileMenu(false);

    };

    const handleSearch = (e) => {

        if (e.key === "Enter") {

            goToProducts();

        }

    };

    return (

        <header

            className={

                sticky

                    ? "navbar sticky"

                    : "navbar"

            }

        >

            <div

                className="logo"

                onClick={() => navigate("/")}

            >

                <span className="logo-icon">

                    🛍

                </span>

                <div>

                    <h2>Synora</h2>

                    <small>

                        Fashion • Lifestyle

                    </small>

                </div>

            </div>

            <div className="mobile-btn">

                {

                    mobileMenu

                        ?

                        <FaTimes

                            onClick={() =>

                                setMobileMenu(false)

                            }

                        />

                        :

                        <FaBars

                            onClick={() =>

                                setMobileMenu(true)

                            }

                        />

                }

            </div>

            <div

                className={

                    mobileMenu

                        ?

                        "nav-links active"

                        :

                        "nav-links"

                }

            >

                <div

                    className="nav-item"

                    onClick={() => {

                        navigate("/");

                        setMobileMenu(false);

                    }}

                >

                    <FaHome />

                    Home

                </div>

                <div

                    className="nav-item"

                    onClick={goToProducts}

                >

                    <FaBoxOpen />

                    Shop

                </div>

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search products..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                        onKeyDown={handleSearch}

                    />

                </div>

                <div

                    className="nav-icon"

                    onClick={() => navigate("/wishlist")}

                >

                    <FaHeart />

                </div>

                <div

                    className="nav-icon"

                    onClick={() => navigate("/cart")}

                >

                    <FaShoppingCart />

                                </div>

                {

                    currentUser ?

                    (

                        <div

                            className="profile-area"

                            ref={profileRef}

                        >

                            <button

                                className="profile-button"

                                onClick={()=>

                                    setShowProfile(

                                        !showProfile

                                    )

                                }

                            >

                                <FaUserCircle />

                                <span>

                                    {currentUser.username}

                                </span>

                                <FaCaretDown />

                            </button>

                            {

                                showProfile &&

                                (

                                    <div className="profile-dropdown">

                                        <div

                                            className="dropdown-item"

                                            onClick={() => {

                                                navigate("/profile");

                                                setShowProfile(false);

                                                setMobileMenu(false);

                                            }}

                                        >

                                            👤 My Profile

                                        </div>

                                        <div

                                            className="dropdown-item"

                                            onClick={() => {

                                                navigate("/orders");

                                                setShowProfile(false);

                                                setMobileMenu(false);

                                            }}

                                        >

                                            📦 My Orders

                                        </div>

                                        <div

                                            className="dropdown-item"

                                            onClick={() => {

                                                navigate("/wishlist");

                                                setShowProfile(false);

                                                setMobileMenu(false);

                                            }}

                                        >

                                            ❤️ Wishlist

                                        </div>

                                        {

                                            currentUser.role ===

                                            "ADMIN"

                                            &&

                                            (

                                                <div

                                                    className="dropdown-item"

                                                    onClick={() => {

                                                        navigate("/admin");

                                                        setShowProfile(false);

                                                        setMobileMenu(false);

                                                    }}

                                                >

                                                    ⚙ Admin Dashboard

                                                </div>

                                            )

                                        }

                                        <div

                                            className="dropdown-item logout"

                                            onClick={logout}

                                        >

                                            Logout

                                        </div>

                                    </div>

                                )

                            }

                        </div>

                    )

                    :

                    (

                        <div className="auth-buttons">

                            <button

                                className="login-btn"

                                onClick={() => {

                                    navigate("/login");

                                    setMobileMenu(false);

                                }}

                            >

                                Login

                            </button>

                            <button

                                className="register-btn"

                                onClick={() => {

                                    navigate("/register");

                                    setMobileMenu(false);

                                }}

                            >

                                Register

                            </button>

                        </div>

                    )

                }

            </div>

        </header>

    );

};

export default Navbar;

                