import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ResumeEditor.css";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ResumeEditor() {
  const { id } = useParams();

  const [resume, setResume] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    summary: "",

    skills: [],

    education: [
      {
        college: "",
        degree: "",
        cgpa: "",
      },
    ],

    projects: [
      {
        title: "",
        description: "",
        techStack: "",
      },
    ],

    experience: [
      {
        company: "",
        role: "",
        duration: "",
        description: "",
      },
    ],
  });

  const [ats, setATS] = useState(null);

  const fetchResume = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const downloadPDF = async () => {
    const input = document.getElementById("resume-preview");

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${resume.title || "Resume"}.pdf`);
  };

  return (
    <div className="editor-page">
      <div className="editor-header">
        <input
          className="title-input"
          type="text"
          placeholder="Resume Title"
          value={resume.title}
          onChange={(e) =>
            setResume({
              ...resume,
              title: e.target.value,
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

        <button className="pdf-btn" onClick={downloadPDF}>
          📄 Download PDF
        </button>
      </div>

      <div className="editor-content">
        <ResumeForm
          resumeId={id}
          resume={resume}
          onUpdate={setResume}
          setATS={setATS}
        />

        <ResumePreview resume={resume} ats={ats} />
      </div>
    </div>
  );
}

export default ResumeEditor;