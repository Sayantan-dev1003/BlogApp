import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userModel from "./models/userModel.js";
import multer from 'multer';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

app.set("view engine", "ejs");

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});
const upload = multer({ storage });

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, "Sayantan", (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save user info for use in other routes
        next();
    });
};

// Get user profile
app.get("/profile", authenticateToken, async (req, res) => {
    const user = await userModel.findById(req.user.userid);
    if (!user) return res.sendStatus(404); // Not Found
    res.json(user);
});

// Update user profile
app.put("/profile", authenticateToken, upload.single('profilePic'), async (req, res) => {
    const { fullname, username, bio, email, phone, dob, occupation } = req.body;
    const profilePic = req.file ? req.file.path : undefined; // Get the uploaded file path

    const updatedUser  = await userModel.findByIdAndUpdate(req.user.userid, {
        fullname,
        username,
        bio,
        email,
        phone,
        dob,
        occupation,
        profilePic: profilePic || undefined // Update profilePic if a new one is uploaded
    }, { new: true });

    res.json(updatedUser );
});

// User registration
app.post("/register", async (req, res) => {
    const { fullname, email, username, password } = req.body;
    const existingUser  = await userModel.findOne({ $or: [{ email }, { username }, { fullname }] });
    if (existingUser ) return res.status(401).json("Something went wrong");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
        fullname,
        email,
        username,
        password: hashedPassword
    });

    const token = jwt.sign({ email: email, userid: user._id }, "Sayantan");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Registration Successful" });
});

// User login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const token = jwt.sign({ email: email, userid: user._id }, "Sayantan");
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: "Login Successful" });
    } else {
        return res.status(401).json("Invalid email or password");
    }
});

// User logout
app.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.redirect("/");
});

// Protected route example
app.get("/feed", authenticateToken, (req, res) => {
    res.send("feed");
});

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(3000, () => console.log ("Server started"));