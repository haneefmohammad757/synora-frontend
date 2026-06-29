import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!username || !password) {

            toast.error("Enter username and password.");

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

            console.log(response.data);

            toast.success("Login Successful!");

            console.log("LOGIN RESPONSE:", response.data);

login(response.data.token);

const user = {
    id: response.data.id,
    username: response.data.username,
    role: response.data.role
};

localStorage.setItem("user", JSON.stringify(user));

console.log("Saved User:", user);
console.log("Stored:", localStorage.getItem("user"));

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/");

            }

        }

        catch (error) {

            console.error(error);

            toast.error("Invalid Username or Password");

        }

        finally {

            setLoading(false);

        }

    };

    return (

<div className="login-page">

    <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>

            Sign in to continue shopping on Synora

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

            className="login-btn"

            onClick={handleLogin}

            disabled={loading}

        >

            {

                loading

                ?

                "Signing In..."

                :

                "LOGIN"

            }

        </button>

        <div className="divider">

            OR

        </div>

        <div className="register-link">

            Don't have an account?

            <br/>

            <Link to="/register">

                Create One

            </Link>

        </div>

    </div>

</div>

);

};

export default Login;