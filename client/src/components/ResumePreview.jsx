import React from 'react';
import './ResumePreview.css';

function ResumePreview({ resume, ats })  {
  return (
    <div
    id="resume-preview"
    className="resume-preview"
>
      <h2>Resume Preview</h2>

      <div className="resume-document">
        <div className="header">
          <h1>{resume.fullName || 'Your Name'}</h1>

          <div className="contact-info">
            {resume.email && <span>{resume.email}</span>}
            {resume.phone && <span>{resume.phone}</span>}
          </div>
        </div>

        {resume.summary && (
          <div className="section">
            <h3>Professional Summary</h3>
            <p>{resume.summary}</p>
          </div>
        )}

        {resume.skills && resume.skills.length > 0 && (
          <div className="section">
            <h3>Skills</h3>

            <div className="skills-list">
              {resume.skills.filter(s => s).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {resume.education && resume.education.length > 0 && (
          <div className="section">
            <h3>Education</h3>

            {resume.education.map((edu, index) => (
              <div key={index}>
                <h4>{edu.college}</h4>
                <p>{edu.degree}</p>
                <p>CGPA: {edu.cgpa}</p>
              </div>
            ))}
          </div>
        )}

        {resume.projects && resume.projects.length > 0 && (
          <div className="section">
            <h3>Projects</h3>

            {resume.projects.map((project, index) => (
              <div key={index}>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <p><strong>Tech Stack:</strong> {project.techStack}</p>
              </div>
            ))}
          </div>
        )}

        {resume.experience && resume.experience.length > 0 && (
          <div className="section">
            <h3>Experience</h3>

            {resume.experience.map((exp, index) => (
              <div key={index}>
                <h4>{exp.company}</h4>
                <p>{exp.role}</p>
                <p>{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        {/* ATS Analysis */}
{ats && (
  <div className="section">
    <h3>⭐ AI RESUME Analysis</h3>

    <h2>Resume Score: {ats.score}/100</h2>

    <h4>✅ Strengths</h4>
    <ul>
      {ats.strengths.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h4>📈 Suggestions</h4>
    <ul>
      {ats.improvements.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h4>🔑 Missing Keywords</h4>

    <div className="skills-list">
      {ats.missingKeywords.map((keyword, index) => (
        <span
          key={index}
          className="skill-tag"
        >
          {keyword}
        </span>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default ResumePreview;
