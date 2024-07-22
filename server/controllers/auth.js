import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User*/
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists." });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            firstName,
            lastName,
        });
        
        const savedUser = await newUser.save();

        // Create a token for the new user with a life span of a week
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Return the user data and token, excluding the password hash
        const userToSend = { ...savedUser._doc };
        delete userToSend.password;
        res.status(200).json({ token, user: userToSend });

    } catch (err) {
        res.status(500).json(err);
    }
};

/* Login User*/
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if (!user) return res.status(400).json({msg: "User does not exist "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials "});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});

    } catch (err){
        res.status(500).json(err);
    }
};

