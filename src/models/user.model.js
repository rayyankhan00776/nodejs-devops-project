import mongoose from "mongoose";

// make schema for user model
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// make model for user schema
const UserModel = mongoose.model('User', userSchema);

// exporting the model
export default UserModel;