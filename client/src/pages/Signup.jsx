import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {

        try {

            await api.post("/auth/signup", {
                name,
                email,
                password
            });

            alert("Account created successfully!");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Signup failed");

        }

    };

    return (
<div className="signup-page">

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>

    <div className="signup-card">

        <h1 className="brand">
            ResumeBloom 🌸
        </h1>

        <p className="tagline">
            Build resumes you'll actually love.
        </p>

        <h2>
            Join ResumeBloom 💌
        </h2>

        <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>
            Create Account 🌷
        </button>

        <p>

            Already have an account?

            <Link to="/">
                Login ✨
            </Link>

        </p>

    </div>

</div>
);
}

export default Signup;