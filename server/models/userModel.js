import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/blogapp");

const userSchema = mongoose.Schema({
    fullname: String,
    username: String,
    profilePic: String,
    bio: String,
    email: String,
    phone: Number,
    dob: String,
    occupation: String,
    password: String
});

export default mongoose.model("user", userSchema);