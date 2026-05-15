import mongoose from "mongoose";

// make schema for user model
const userSchema = new mongoose.Schema({

});

// make model for user schema
const UserModel = mongoose.model('User', userSchema);

// exporting the model
export default UserModel;