import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import botRoutes from "./routes/botRoutes.js"

dotenv.config();

// Some stuff for the app to use

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(cors());
app.disable('x-powered-by')

//Creating an endpoit

app.use("/regBots", botRoutes)
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Thing might be working ${PORT}`));
   