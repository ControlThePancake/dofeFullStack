//Imports
import { spawn } from "child_process";
import fetch from 'node-fetch'; 

// Main function use to launch bots
export const botLaunch = async (req, res) => {
    // Gets data from the request and then passes it through to the script
    try {
        const { gameCode, botName, botNum, pageType, sessionId, authToken} = req.body;
        const dataToSend = [gameCode, botNum, botName, sessionId];
        const bot = spawn("python", [`bots/${pageType}Bot.py`, ...dataToSend]);

        // Listening for any output data
        // Currerntly will stay in development and will be added later
        //bot.stdout.on("data", (data) => {
        //    const output = data.toString();
        //    console.log(output);
        //    if (output.startsWith("status:")) {
        //        const [statusText, sessionIdText] = output.split(",");
        //        const status = statusText.split(":")[1].trim();
        //        const sessionId = sessionIdText.split(":")[1].trim();
        //         //Forward this status to the MainBackend
        //        fetch('http://192.168.0.133:3001/users/bot-status', {
        //            method: 'POST',
        //            headers: {"Authorization": `Bearer ${authToken}`, 'Content-Type': 'application/json'},
        //            body: JSON.stringify({ sessionId, status, gameCode, botName })
        //        });
        //    }
        //});

        // Listening for any error data
        
        bot.stderr.on("data", (data) => {
            console.error("Error from Python script:", data.toString());
        });

        bot.on("close", (code) => {
            console.log(`Python script exited with code ${code}`);
        });

        res.status(200).json({message:"Bot initialised "});
    } catch (err) {
        console.error("Failed to launch bot:", err);
        res.status(500).json(err);
    }
};
