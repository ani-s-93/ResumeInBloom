const auth = require("../middleware/auth");
const express = require('express');
const router = express.Router();

const Resume = require('../models/Resume');

// GET all resumes
router.get('/',auth , async (req, res) => {
  try {
   const resumes = await Resume.find({
    user: req.user.userId
});

    res.json(resumes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a specific resume
router.get('/:id',auth , async (req, res) => {
  try {
    const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user.userId
});

    if (!resume) {
      return res.status(404).json({
        error: 'Resume not found'
      });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST a new resume
router.post('/',auth , async (req, res) => {
  try {
    const resume = await Resume.create({
    ...req.body,
    user: req.user.userId
});

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT update a resume
// PUT update a resume
router.put('/:id', auth, async (req, res) => {
  try {
    console.log("Resume ID:", req.params.id);
    console.log("User ID:", req.user.userId);
    console.log("Body:", req.body);

    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      req.body,
      { new: true }
    );

    console.log("Found resume:", resume);

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found"
      });
    }

    res.json(resume);

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// DELETE a resume
router.delete('/:id',auth , async (req, res) => {
  try {
    await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId
});;

    res.json({
      message: 'Resume deleted'
    });

  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
