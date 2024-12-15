import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/blogapp");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    username: String,
    password: String, 
});

export default mongoose.model("user", userSchema);