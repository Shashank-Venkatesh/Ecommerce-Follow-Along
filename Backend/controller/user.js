const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

// Create User
router.post("/create-user", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    console.log("Creating user...");
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
        if (req.file) {
            const filepath = path.join(__dirname, "../uploads", req.file.filename);
            try {
                fs.unlinkSync(filepath);
            } catch (err) {
                console.log("Error removing file:", err);
                return res.status(500).json({ message: "Error removing file" });
            }
        }
        return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file?.filename || "";
    const fileUrl = `/uploads/${filename}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { name, email, password: hashedPassword, avatar: fileUrl };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:8000/activation/${activationToken}`;

    try {
        await sendMail({
            email: user.email,
            subject: "Account Activation",
            message: `Please click on the link to activate your account: ${activationUrl}`,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }

    console.log("User registration initiated:", user);
    res.status(201).json({
        success: true,
        message: "User registered successfully. Please check your email for activation.",
    });
}));

// Function to create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

// Activate User
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        console.log("Activation request received");
        const { activation_token } = req.body;

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (!newUser) {
            return next(new ErrorHandler("Invalid activation token", 400));
        }

        const { name, email, password, avatar } = newUser;
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const user = await User.create({ name, email, avatar, password });

        res.status(200).json({
            success: true,
            message: "Account activated successfully",
            user,
        });
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 400));
    }
}));

// Login User
router.post("/login", catchAsyncErrors(async (req, res, next) => {
    console.log("Logging in user...");
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log("At Auth", "Password:", password, "Hash:", user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    user.password = undefined;

    res.status(200).json({
        success: true,
        user,
    });
}));

module.exports = router;