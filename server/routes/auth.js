const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({
        message: "User already exists"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({
    name,
    email,
    password: hashedPassword
});

await user.save();

console.log(hashedPassword);

res.status(201).json({
    message: "User created successfully!"
});


    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: error.message
    });
}
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
       const token = jwt.sign(
    {
        userId: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

res.json({
    message: "Login successful!",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
       

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;