import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, min: 5 },
    isAdmin: { type: Boolean, default: false },
    picturePath: {type: String, default: ""},
    tokens: {type: Number, default: "2"},
    isPaying: {type: Boolean, default: false}
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;


