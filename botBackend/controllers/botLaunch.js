import { spawn } from "child_process";
import fetch from 'node-fetch'; // Ensure you have node-fetch installed

export const botLaunch = async (req, res) => {
    try {
        const { gameCode, botName, botNum, pageType, sessionId } = req.body;
        const dataToSend = [gameCode, botNum, botName, sessionId];
        const bot = spawn("python", [`bots/${pageType}Bot.py`, ...dataToSend]);

        bot.stdout.on("data", (data) => {
            const output = data.toString();
            console.log(output);
            if (output.startsWith("status:")) {
                const [statusText, sessionIdText] = output.split(",");
                const status = statusText.split(":")[1].trim();
                const sessionId = sessionIdText.split(":")[1].trim();
                 //Forward this status to the MainBackend
                fetch(':3001/users/bot-status', {
                   method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ sessionId, status, gameCode, botName })
                });
            }
        });

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
