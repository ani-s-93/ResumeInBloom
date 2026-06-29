import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {

    const [resumes, setResumes] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/resumes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setResumes(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const createResume = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.post(
            "/resumes",
            {
                fullName: "",
                email: "",
                phone: "",
                summary: "",
                skills: [],
                education: [],
                projects: [],
                title: "Untitled Resume",
                experience: []
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        navigate(`/resume/${response.data._id}`);

    } catch (error) {

        console.log(error);

    }

};
const deleteResume = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/resumes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setResumes(
            resumes.filter((resume) => resume._id !== id)
        );

        alert("Resume deleted!");

    } catch (error) {

        console.error(error);

        alert("Failed to delete resume");

    }

};
const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

};

    return (
    <div className="dashboard">

        {/* Sidebar */}
        <div className="sidebar">

            <div>

                <div className="logo-card">

<h1 className="logo">

Resume

<span>Bloom 🌸</span>

</h1>

</div>

                <p className="logo-subtitle">
                    Build beautiful resumes.
                </p>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>

        {/* Main Content */}
        <div className="content">
            <div className="sticker flower1">🌸</div>

<div className="sticker flower2">🌼</div>

<div className="sticker strawberry">🍓</div>

<div className="sticker sparkle">✨</div>

            <h1 className="welcome">
                Welcome, {user?.name} 🌸
            </h1>

            <p className="subtitle">
                Create, edit and personalize your resumes with AI magic ✨
            </p>

            <button
                className="new-btn"
                onClick={createResume}
            >
                + New Resume
            </button>

            <h2 className="section-title">
                Your Resumes
            </h2>

            <div className="resume-grid">

                {resumes.map((resume) => (

                    <div
                        className="resume-card"
                        key={resume._id}
                    >

                        <h3>
                            📄 {resume.title || "Untitled Resume"}
                        </h3>

                        <p>
                            Continue editing your resume.
                        </p>

                        <div className="card-buttons">

                            <button
                                onClick={() =>
                                    navigate(`/resume/${resume._id}`)
                                }
                            >
                                Open →
                            </button>

                            <button
                                className="delete"
                                onClick={() =>
                                    deleteResume(resume._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    </div>
);

}

export default Dashboard;