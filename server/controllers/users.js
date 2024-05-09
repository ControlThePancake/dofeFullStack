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

export const botLaunch = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { _id, values, pageType} = req.body;
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
        const gameCode = parseInt(values.gameCode);
        const botName = values.botName;
        const send = async (gameCode ,botName, botNumNew, pageType) =>{
            const dataToSend = {gameCode, botName, botNumNew, pageType}
            const response = await fetch("http://192.168.0.133:3002/regBots/botLaunch", {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            console.log(data);
        };
        await send(gameCode, botName , botNumNew, pageType);
        res.status(200).json({ msg: "work, yes" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
