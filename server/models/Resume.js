const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
    type: String,
    default: "Untitled Resume"
},
  fullName: String,
  email: String,
  phone: String,
  summary: String,

  skills: [String],

  education: [
    {
      college: String,
      degree: String,
      cgpa: String
    }
  ],

  projects: [
    {
      title: String,
      description: String,
      techStack: String
    }
  ],

  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String
    }
  ]
});

module.exports = mongoose.model('Resume', ResumeSchema);