import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, max: 50 },
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, min: 3, max: 20 },
    password: { type: String, required: true, min: 5 },
    tokenNum: {type: Number, default: 3}
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;


