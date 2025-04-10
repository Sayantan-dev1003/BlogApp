import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userModel from "./models/userModel.js";
import postModel from "./models/postModel.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, "Sayantan", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Get user profile
app.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userid);
        if (!user) return res.sendStatus(404);
        res.json(user);
    } catch (error) {
        res.status(500).send("Error fetching profile: ", error);
    }
});

// New API endpoint to get posts for the current user
app.get("/userPosts", authenticateToken, async (req, res) => {
    try {
        const posts = await postModel.find({ user: req.user.userid }).populate('user', 'fullname username bio').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).send("Error fetching user posts: ", error);
    }
});

// Update user profile
app.put("/profile", authenticateToken, async (req, res) => {
    try {
        const { fullname, username, bio, email, phone, dob, occupation } = req.body;

        const updateData = {
            fullname,
            username,
            bio,
            email,
            phone,
            dob,
            occupation,
        };

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user.userid,
            updateData,
            { new: true }
        );

        await updatedUser.save();

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send("Error updating profile: ", error);
    }
});

// User registration
app.post("/register", async (req, res) => {
    const { fullname, email, username, password } = req.body;
    const existingUser = await userModel.findOne({ $or: [{ email }, { username }, { fullname }] });
    if (existingUser) return res.status(401).json("Something went wrong");

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

// Create a new post
app.post("/posts", authenticateToken, async (req, res) => {
    const { title, content, categories, tags } = req.body;

    try {
        const newPost = new postModel({
            user: req.user.userid,
            title,
            content,
            categories,
            tags,
        });

        await newPost.save();
        await userModel.findByIdAndUpdate(req.user.userid, { $push: { posts: newPost._id } }, { new: true });
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
});

// Get all posts from all users
app.get("/posts", async (req, res) => {
    try {
        const posts = await postModel.find().populate('user', 'fullname username bio').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).send("Error fetching posts: ", error);
    }
});

// Delete a post
app.delete("/posts/:id", authenticateToken, async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await userModel.findByIdAndUpdate(req.user.userid, { $pull: { posts: postId } });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Failed to delete post" });
    }
});

// New API endpoint to get a specific post by ID
app.get("/posts/:id", authenticateToken, async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId).populate('user', 'fullname username bio');
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Failed to fetch post" });
    }
});

// Update a post
app.put("/posts/:id", authenticateToken, async (req, res) => {
    const postId = req.params.id;
    const { title, content, categories, tags } = req.body;

    try {
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { title, content, categories, tags },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Failed to update post" });
    }
});

// Like a post
app.post("/posts/:id/like", authenticateToken, async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId).populate('user', 'fullname bio'); // Populate user data
        const userId = req.user.userid;

        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.likes.includes(userId)) {
            // User already liked the post, remove like
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
            await post.save();
            await userModel.findByIdAndUpdate(userId, { $pull: { liked: postId } });
        } else {
            // User likes the post
            post.likes.push(userId);
            await post.save();
            await userModel.findByIdAndUpdate(userId, { $addToSet: { liked: postId } });
        }

        // Return the updated post with user data
        const updatedPost = await postModel.findById(postId).populate('user', 'fullname bio');
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Failed to like post" });
    }
});

// Bookmark a post
app.post("/posts/:id/bookmark", authenticateToken, async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId).populate('user', 'fullname bio'); // Populate user data
        const userId = req.user.userid;

        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.bookmarks.includes(userId)) {
            // User already bookmarked the post, remove bookmark
            post.bookmarks = post.bookmarks.filter(id => id.toString() !== userId.toString());
            await post.save();
            await userModel.findByIdAndUpdate(userId, { $pull: { saved: postId } });
        } else {
            // User bookmarks the post
            post.bookmarks.push(userId);
            await post.save();
            await userModel.findByIdAndUpdate(userId, { $addToSet: { saved: postId } });
        }

        // Return the updated post with user data
        const updatedPost = await postModel.findById(postId).populate('user', 'fullname bio');
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error bookmarking post:", error);
        res.status(500).json({ message: "Failed to bookmark post" });
    }
});

// New API endpoint to get liked posts for the current user
app.get("/user/likedPosts", authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userid).populate('liked');
        if (!user) return res.sendStatus(404);
        res.json(user.liked);
    } catch (error) {
        res.status(500).send("Error fetching liked posts: ", error);
    }
});

// New API endpoint to get bookmarked posts for the current user
app.get("/user/bookmarkedPosts", authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userid).populate('saved');
        if (!user) return res.sendStatus(404);
        res.json(user.saved);
    } catch (error) {
        res.status(500).send("Error fetching bookmarked posts: ", error);
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
app.listen(3000, () => console.log("Server started"));