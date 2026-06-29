import { useState } from "react";

import axios from "../api/axios";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        username: "",

        password: "",

        role: "USER"

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const register = async () => {

        try {

            await axios.post(

                "/users",

                user

            );

            toast.success("Registration Successful.");

            navigate("/login");

        }

        catch (error) {

            console.error(error);

            toast.error("Registration Failed.");

        }

    };

    return (

        <div className="login-page">

            <div className="login-box">

                <h2>Create Account</h2>

                <input

                    type="text"

                    name="username"

                    placeholder="Username"

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                />

                <button

                    onClick={register}

                >

                    Register

                </button>

            </div>

        </div>

    );

};

export default Register;