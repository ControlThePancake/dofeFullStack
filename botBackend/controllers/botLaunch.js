import child_process from "child_process";
const spawner = child_process();


export const botLaunch = async (req,res) => {
    try{
        const {gameCode , botName, botNumber, pageType} = req.body;
        const dataToSend = {gameCode,botNumber, botName };
        const bot = spawner("python", [`../bots/${pageType}Bot.py`, dataToSend]);

        bot.stdout.on("data", (data) => {
            console.log("Data received from python script:", data.toString());
        });

        res.status(200);
    } catch(err){
        res.status(500).json(err);
    }
    


};