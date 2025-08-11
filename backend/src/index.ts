import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

// add middlewares
app.use(express.json());
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
