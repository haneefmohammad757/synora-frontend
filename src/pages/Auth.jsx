import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import "./Auth.css";

const Auth = ({ mode }) => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const isLogin = mode === "login";

    // ------------------------
    // Login State
    // ------------------------

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    // ------------------------
    // Register State
    // ------------------------

    

    const [email, setEmail] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");

    const [registerPassword, setRegisterPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    // ------------------------

    const [loading, setLoading] = useState(false);

    // ------------------------
    // LOGIN
    // ------------------------

    const handleLogin = async () => {

        if (!username || !password) {

            toast("Please enter username and password.");

            return;

        }

        try {

            setLoading(true);

            const response = await axios.post(

                "/auth/login",

                null,

                {

                    params: {

                        username,

                        password

                    }

                }

            );

            login(response.data.token);

            localStorage.setItem(

                "user",

                JSON.stringify({

                    id: response.data.id,

                    username: response.data.username,

                    role: response.data.role

                })

            );

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            }

            else {

                navigate("/");

            }

        }

        catch (error) {

            console.log(error);

            toast.error("Invalid username or password.");

        }

        finally {

            setLoading(false);

        }

    };

    // ------------------------
    // REGISTER
    // ------------------------

    const handleRegister = async () => {

        if (

            

            !email ||

            !registerUsername ||

            !registerPassword ||

            !confirmPassword

        ) {

            toast("Please fill all fields.");

            return;

        }

        if (registerPassword !== confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await axios.post("/auth/register",{

    email,

    username: registerUsername,

    password: registerPassword

});

            toast.success("Registration Successful.");

            navigate("/login");

        }

        catch (error) {

            console.log(error);

            toast.error("Registration Failed.");

        }

        finally {

            setLoading(false);

        }

    };
    return (

        <div className="auth-page">

            <div className={`auth-container ${isLogin ? "" : "active"}`}>

                {/* LEFT PANEL */}

                <div className="auth-panel left-panel">

                    <div className="panel-content">

                        {

                            isLogin ?

                            <>

                                <h1>Welcome Back 👋</h1>

                                <p>

                                    Login to continue shopping on Synora.

                                </p>

                                <button

                                    className="ghost-btn"

                                    onClick={() => navigate("/register")}

                                >

                                    Create Account

                                </button>

                            </>

                            :

                            <>

                                <h1>Hello Friend 🚀</h1>

                                <p>

                                    Already have an account?

                                    Login and continue your shopping.

                                </p>

                                <button

                                    className="ghost-btn"

                                    onClick={() => navigate("/login")}

                                >

                                    Sign In

                                </button>

                            </>

                        }

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="auth-form-container">

                    {

                        isLogin ?

                        (

                            <div className="auth-form">

                                <h2>Sign In</h2>

                                <p>

                                    Welcome to Synora

                                </p>

                                <input

                                    type="text"

                                    placeholder="Username"

                                    value={username}

                                    onChange={(e)=>setUsername(e.target.value)}

                                />

                                <input

                                    type="password"

                                    placeholder="Password"

                                    value={password}

                                    onChange={(e)=>setPassword(e.target.value)}

                                />

                                <button

                                    className="main-btn"

                                    onClick={handleLogin}

                                    disabled={loading}

                                >

                                    {

                                        loading ?

                                        "Signing In..."

                                        :

                                        "Login"

                                    }

                                </button>

                                <div className="bottom-text">

                                    Don't have an account?

                                    <Link to="/register">

                                        Register

                                    </Link>

                                </div>

                            </div>

                        )

                        :

                        (

                            <div className="auth-form">

                                <h2>Create Account</h2>

                                <p>

                                    Join Synora today

                                </p>

                               

                                <input

                                    type="email"

                                    placeholder="Email"

                                    value={email}

                                    onChange={(e)=>setEmail(e.target.value)}

                                />

                                <input

                                    type="text"

                                    placeholder="Username"

                                    value={registerUsername}

                                    onChange={(e)=>setRegisterUsername(e.target.value)}

                                />

                                <input

                                    type="password"

                                    placeholder="Password"

                                    value={registerPassword}

                                    onChange={(e)=>setRegisterPassword(e.target.value)}

                                />

                                <input

                                    type="password"

                                    placeholder="Confirm Password"

                                    value={confirmPassword}

                                    onChange={(e)=>setConfirmPassword(e.target.value)}

                                />

                                <button

                                    className="main-btn"

                                    onClick={handleRegister}

                                    disabled={loading}

                                >

                                    {

                                        loading ?

                                        "Creating..."

                                        :

                                        "Register"

                                    }

                                </button>

                                <div className="bottom-text">

                                    Already have an account?

                                    <Link to="/login">

                                        Login

                                    </Link>

                                </div>

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

};

export default Auth;

