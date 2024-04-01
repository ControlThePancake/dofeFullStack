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



/* CONFIGS*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const app1 = express();
app.use(express.json());
app1.use(express.json());

app.use(helmet());
app1.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app1.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));

app.use(morgan("common"));
app1.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

app1.use(bodyParser.json({ limit: "30mb", extended: true}));
app1.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

app.use(cors());
app1.use(cors());

app.use("/assets",express.static(path.join(__dirname, "public/assets")));

/* Routes */
app.use("/auth", authRoutes); // Use the authRoutes router for /auth routes
app.use("/users", userRoutes);

app1.use("/stripe", stripeRoutes)

/* MONGOOSE SETUP*/
/*This uses an api url and port which are located in a seperate hidden .env file*/
const PORT = process.env.PORT || 6001;
const SPORT = process.env.SPORT;
console.log("MongoDB URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(error.message, "index.js"));

app1.listen(SPORT, () => console.log(`Stripe running on port: ${SPORT}`));

