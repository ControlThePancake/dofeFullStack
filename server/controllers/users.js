import User from "../models/User.js";
import jwt from "jsonwebtoken";
/* Read */

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

export const tokenNum = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const tokenNum = user ? user.tokenNum : null;
        res.status(200).json(tokenNum);
    }catch (err) {
        res.status(404).json({ message: err.message });
      }
    };

/* Update */

export const updateTokenNum = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { _id, values} = req.body;
        console.log(_id, values.botNum);
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User found HURRAAAAA:", user);
        const botNumNew = parseInt(values.botNum)
        let tokenNum = user ? user.tokenNum : null;
        tokenNum -= botNumNew;
        user.tokenNum = tokenNum;
        console.log("User tokenNum:", user.tokenNum);
        await user.save();
        const token = jwt.sign({id: _id}, process.env.JWT_SECRET);
        res.status(200).json({token,user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const botLaunch = async (req,res) => {
    try{

    }catch (err){
        
    }
}