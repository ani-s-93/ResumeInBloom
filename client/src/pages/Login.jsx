import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {

    try {

        

const response = await api.post("/auth/login", {
    email,
    password
});

        localStorage.setItem("token", response.data.token);

        alert("Login Successful!");

        navigate("/dashboard");

    } catch (error) {

        alert(error.response?.data?.message || "Login Failed");

    }

};

    return (

<div className="login-page">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>

    <div className="login-card">

        <h1 className="brand">
            ResumeInBloom 🌸
        </h1>

        <p className="tagline">
            Build resumes you'll actually love.
        </p>

        <h2>
            Welcome Back !
        </h2>

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
            Login 🌷
        </button>

        <p>

            Don't have an account?

            <Link to="/signup">

                Create one 

            </Link>

        </p>

    </div>

</div>

);
}

export default Login;