import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User*/
export const register = async (req, res) => {
    try{
        console.log("Received request body:", req.body);
        const{
            email,
            password,
            firstName,
            lastName,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            firstName,
            lastName,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json(err);
    }
}

/* Login User*/
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if (!user) return res.status(400).json({msg: "User dont exist "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials "});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    } catch (err){
        res.status(500).json(err);
    }
};

