import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"; 
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"; // Import the authRoutes router
import userRoutes from "./routes/users.js";
import stripeRoutes from "./routes/stripe.js";
import https from "https";
import fs from "fs";


/* CONFIGS*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(cors());
app.disable('x-powered-by')

const app1 = express();
app1.use(helmet());
app1.use(cors());
app1.use(morgan("common"));
app1.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app1.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app1.disable('x-powered-by')


app.use("/assets",express.static(path.join(__dirname, "public/assets")));

/* Routes */
app.use("/auth", authRoutes); // Use the authRoutes router for /auth routes
app.use("/users", userRoutes);

app1.use("/stripe", stripeRoutes)

/* MONGOOSE SETUP*/
/*This uses an api url and port which are located in a seperate hidden .env file*/
const PORT = process.env.PORT || 6001;
const SPORT = process.env.SPORT;
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'botpulse.xyz.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'botpulse.xyz.pem'))
};

app.use(express.static(path.join(__dirname, 'server')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'server', 'index.html'));
});


console.log("MongoDB URL:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    https.createServer(options, app).listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch((error) => console.log(error.message, "index.js"));

https.createServer(options, app1).listen(SPORT, () => {
    console.log(`Server listening on port ${SPORT}`);
});

