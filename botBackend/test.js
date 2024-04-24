import { spawn } from "child_process";

// Data to send to the Python script
const dataToSend = [1848832, 3, "cheeseborger"];

// Convert data to JSON string and pass it as a single command-line argument
const bot = spawn("python", ["./bots/kahootBot.py", JSON.stringify(dataToSend)]);

let pythonOutput = ""; // Variable to store the output from the Python script

// Listen for data from the Python script's stdout
bot.stdout.on("data", (data) => {
    pythonOutput += data.toString();
});

// Listen for errors from the Python script's stderr
bot.stderr.on("data", (data) => {
    console.error("Error from Python script:", data.toString());
});

bot.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    console.log("Output from Python script:", pythonOutput);
});
