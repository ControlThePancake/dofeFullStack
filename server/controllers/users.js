import User from "../models/User.js";

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
    }catch (err) {
        res.status(404).json({ message: err.message });
      }
    };

