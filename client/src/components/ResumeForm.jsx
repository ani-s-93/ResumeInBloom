import api from "../api";
import React from 'react';
import './ResumeForm.css';

function ResumeForm({ resumeId, resume, onUpdate, setATS }) {

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    onUpdate({
      ...resume,
      [name]: value
    });
  };
  const addEducation = () => {
  onUpdate({
    ...resume,
    education: [
      ...resume.education,
      {
        college: '',
        degree: '',
        cgpa: ''
      }
    ]
  });
};

  const saveResume = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await api.put(
      `http://localhost:5000/api/resumes/${resumeId}`,
      resume,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);

    alert("Resume updated successfully!");

  } catch (error) {

    console.error(error);

    console.log(error.response);

    alert(error.response?.data?.error || error.response?.data?.message || "Error saving resume");

}
};
  const improveProject = async (index) => {
  try {
    const response = await api.post(
      "http://localhost:5000/api/ai/improve-project",
      {
        description: resume.projects[index].description
      }
    );

    const updatedProjects = [...resume.projects];

    updatedProjects[index].description = response.data.improved;

    onUpdate({
      ...resume,
      projects: updatedProjects
    });

  } catch (error) {
    console.error(error);
    alert("AI failed");
  }
};
const generateSummary = async () => {

  try {

    const response = await api.post(
      "http://localhost:5000/api/ai/generate-summary",
      resume
    );

    onUpdate({
      ...resume,
      summary: response.data.summary
    });

  } catch (err) {
    console.error(err);
    alert("Failed to generate summary");
  }

};
const generateATS = async () => {
  try {
    const response = await api.post(
      "http://localhost:5000/api/ai/ats-score",
      resume
    );

    setATS(response.data);

  } catch (error) {
    console.error(error);
    alert("Failed to analyze resume");
  }
};
  const addExperience = () => {
  onUpdate({
    ...resume,
    experience: [
      ...resume.experience,
      {
        company: '',
        role: '',
        duration: '',
        description: ''
      }
    ]
  });
};
  const addProject = () => {
  onUpdate({
    ...resume,
    projects: [
      ...resume.projects,
      {
        title: '',
        description: '',
        techStack: ''
      }
    ]
  });
};

  return (
  <div className="resume-form">
    <h2>Resume Information</h2>

    <div className="form-section">
      <h3>Personal Information</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={resume.fullName}
        onChange={handleInputChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={resume.email}
        onChange={handleInputChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={resume.phone}
        onChange={handleInputChange}
      />
    </div>

    <div className="form-section">
      <h3>Professional Summary</h3>

      <textarea
        name="summary"
        placeholder="Write a brief professional summary..."
        value={resume.summary}
        onChange={handleInputChange}
        rows="4"
      />
      <button
  type="button"
  onClick={generateSummary}
  style={{
    background: "#10a37f",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "10px"
  }}
>
   Generate Summary with AI
</button>
    </div>
    <div className="form-section">
  <h3>Education</h3>

  {resume.education.map((edu, index) => (
    <div key={index}>

      <input
        type="text"
        placeholder="College Name"
        value={edu.college}
        onChange={(e) => {
          const updated = [...resume.education];
          updated[index].college = e.target.value;

          onUpdate({
            ...resume,
            education: updated
          });
        }}
      />

      <input
        type="text"
        placeholder="Degree"
        value={edu.degree}
        onChange={(e) => {
          const updated = [...resume.education];
          updated[index].degree = e.target.value;

          onUpdate({
            ...resume,
            education: updated
          });
        }}
      />

      <input
        type="text"
        placeholder="CGPA"
        value={edu.cgpa}
        onChange={(e) => {
          const updated = [...resume.education];
          updated[index].cgpa = e.target.value;

          onUpdate({
            ...resume,
            education: updated
          });
        }}
      />

      {resume.education.length > 1 && (
        <button
          type="button"
          onClick={() => {
            const updated = resume.education.filter(
              (_, i) => i !== index
            );

            onUpdate({
              ...resume,
              education: updated
            });
          }}
        >
          Delete Education
        </button>
      )}

      <hr />
    </div>
  ))}

  <button type="button" onClick={addEducation}>
    + Add Education
  </button>
</div>
<div className="form-section">
  <h3>Projects</h3>

  {resume.projects.map((project, index) => (
    <div key={index}>

      <input
        type="text"
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => {
          const updated = [...resume.projects];
          updated[index].title = e.target.value;

          onUpdate({
            ...resume,
            projects: updated
          });
        }}
      />

      <textarea
        placeholder="Description"
        value={project.description}
        onChange={(e) => {
          const updated = [...resume.projects];
          updated[index].description = e.target.value;

          onUpdate({
            ...resume,
            projects: updated
          });
        }}
      />
      <button
  type="button"
  onClick={() => improveProject(index)}
  style={{
    background: "#10a37f",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px"
  }}
>
  ✨ Improve with AI
</button>

      <input
        type="text"
        placeholder="Tech Stack"
        value={project.techStack}
        onChange={(e) => {
          const updated = [...resume.projects];
          updated[index].techStack = e.target.value;

          onUpdate({
            ...resume,
            projects: updated
          });
        }}
      />

      {resume.projects.length > 1 && (
        <button
          type="button"
          onClick={() => {
            const updated = resume.projects.filter(
              (_, i) => i !== index
            );

            onUpdate({
              ...resume,
              projects: updated
            });
          }}
        >
          Delete Project
        </button>
        
      )}
     
      <hr />
    </div>
  ))}

  <button type="button" onClick={addProject}>
    + Add Project
  </button>
</div>
<div className="form-section">
  <h3>Experience</h3>

  {resume.experience.map((exp, index) => (
    <div key={index}>

      <input
        type="text"
        placeholder="Company"
        value={exp.company}
        onChange={(e) => {
          const updated = [...resume.experience];
          updated[index].company = e.target.value;

          onUpdate({
            ...resume,
            experience: updated
          });
        }}
      />

      <input
        type="text"
        placeholder="Role"
        value={exp.role}
        onChange={(e) => {
          const updated = [...resume.experience];
          updated[index].role = e.target.value;

          onUpdate({
            ...resume,
            experience: updated
          });
        }}
      />

      <input
        type="text"
        placeholder="Duration"
        value={exp.duration}
        onChange={(e) => {
          const updated = [...resume.experience];
          updated[index].duration = e.target.value;

          onUpdate({
            ...resume,
            experience: updated
          });
        }}
      />

      <textarea
        placeholder="Description"
        value={exp.description}
        onChange={(e) => {
          const updated = [...resume.experience];
          updated[index].description = e.target.value;

          onUpdate({
            ...resume,
            experience: updated
          });
        }}
      />

      {resume.experience.length > 1 && (
        <button
          type="button"
          onClick={() => {
            const updated = resume.experience.filter(
              (_, i) => i !== index
            );

            onUpdate({
              ...resume,
              experience: updated
            });
          }}
        >
          Delete Experience
        </button>
      )}

      <hr />
    </div>
  ))}

  <button type="button" onClick={addExperience}>
    + Add Experience
  </button>
</div>

    <div className="form-section">
      <h3>Skills</h3>

      <textarea
        name="skills"
        placeholder="Enter skills separated by commas"
        value={resume.skills.join(', ')}
        onChange={(e) =>
          onUpdate({
            ...resume,
            skills: e.target.value.split(',').map((s) => s.trim())
          })
        }
        rows="3"
      />
    </div>


    <button
    id="saveResumeBtn"
    onClick={saveResume}
>
    💾 Save Resume
</button>
    <button
  type="button"
  onClick={generateATS}
  style={{
    background: "#10a37f",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px"
  }}
>
  Analyze Resume with AI
</button>
  </div>
);
}

export default ResumeForm;