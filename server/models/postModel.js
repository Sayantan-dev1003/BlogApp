import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/blogapp");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
    categories: {
        type: [String], 
    },
    tags: {
        type: [String], 
    },
});

export default mongoose.model("posts", postSchema);