import { spawn } from "child_process";

export const botLaunch = async (req,res) => {
    try{
        const {gameCode , botName, botNumNew, pageType} = req.body;
        const dataToSend = [gameCode,botNumNew, botName];
        const bot = spawn("python", [`bots/${pageType}Bot.py`, ...dataToSend]);
        let pythonOutput = "";

        bot.stdout.on("data", (data) => {
            pythonOutput += data.toString();
        });

        bot.stderr.on("data", (data) => {
            console.error("Error from Python script:", data.toString());
        });
        
        bot.on("close", (code) => {
            console.log(`Python script exited with code ${code}`);
            console.log("Output from Python script:", pythonOutput);
        
            if (code === 0) {
                console.log("Python script ran successfully");
                // Handle successful execution
            } else {
                console.error("Python script encountered an error");
                // Handle error
            }
        });
        res.status(200);
    } catch(err){
        res.status(500).json(err);
    }
    


};




 