import "./ResumeEditor.css";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ResumeEditor() {
    const { id } = useParams();
    useEffect(() => {

    fetchResume();

}, []);

    const [resume, setResume] = useState({

        fullName: "",
        email: "",
        phone: "",
        summary: "",

        skills: [],

        education: [
            {
                college: "",
                degree: "",
                cgpa: ""
            }
        ],

        projects: [
            {
                title: "",
                description: "",
                techStack: ""
            }
        ],

        experience: [
            {
                company: "",
                role: "",
                duration: "",
                description: ""
            }
        ]

    });
    const fetchResume = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.get(
            `/resumes/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setResume(response.data);

    } catch (error) {

        console.log(error);

    }

};

    const [ats, setATS] = useState(null);

    return (
    <div className="editor-page">

        <div className="editor-header">

            <input
                className="title-input"
                type="text"
                placeholder="Resume Title"
                value={resume.title || ""}
                onChange={(e) =>
                    setResume({
                        ...resume,
                        title: e.target.value
                    })
                }
            />

            <button
                className="save-top-btn"
                onClick={() => {
                    document.getElementById("saveResumeBtn").click();
                }}
            >
                💾 Save Resume
            </button>

        </div>

        <div className="editor-content">

            <ResumeForm
                resumeId={id}
                resume={resume}
                onUpdate={setResume}
                setATS={setATS}
            />

            <ResumePreview
                resume={resume}
                ats={ats}
            />

        </div>

    </div>
);

}

export default ResumeEditor;