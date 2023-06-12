import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv' 
import fileUpload from "express-fileupload";
import router from "./routes/index.js";

const app = express();


app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());
app.use(fileUpload());

const PORT = process.env.PORT || 5000;
dotenv.config()

app.use(cors( {
  origin: 'http://localhost:4200',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
} ));

router(app)


async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/angularJs").then(() => {
      console.log("Connected!");
      app.listen(PORT, () => {
        console.log(`port dang chay la ${PORT}`);
      });
    });
  } catch (error) {
    console.log("connection failed");
  }
}
connect();
