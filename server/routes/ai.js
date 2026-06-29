const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Test Route
router.get("/", (req, res) => {
  res.json({
    message: "AI Route Working!"
  });
});

// Improve Project Description
router.post("/improve-project", async (req, res) => {
  try {
    const { description } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Rewrite project descriptions professionally using ATS friendly language. Keep it under 60 words."
        },
        {
          role: "user",
          content: description
        }
      ]
    });

    res.json({
      improved: completion.choices[0].message.content
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "AI Generation Failed"
    });
  }
});
router.post("/generate-summary", async (req, res) => {
  try {

    const { fullName, skills, projects, experience } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Write a professional ATS-friendly resume summary in under 70 words."
        },
        {
          role: "user",
          content: `
Name: ${fullName}

Skills:
${skills.join(", ")}

Projects:
${projects.map(p => p.title).join(", ")}

Experience:
${experience.map(e => e.role + " at " + e.company).join(", ")}
`
        }
      ],

      temperature: 0.7,
    });

    res.json({
      summary: completion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "AI failed"
    });
  }
});
router.post("/ats-score", async (req, res) => {
  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an ATS Resume Reviewer.

Return ONLY valid JSON.

Example:

{
  "score":87,
  "strengths":[
    "Strong projects",
    "Good technical skills"
  ],
  "improvements":[
    "Add measurable achievements",
    "Mention leadership"
  ],
  "missingKeywords":[
    "Docker",
    "JWT",
    "REST API"
  ]
}
`
        },
        {
          role: "user",
          content: JSON.stringify(req.body)
        }
      ],

      response_format: {
        type: "json_object"
      },

      temperature: 0.3
    });

    res.json(
      JSON.parse(completion.choices[0].message.content)
    );

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "ATS Scoring Failed"
    });

  }
});

module.exports = router;