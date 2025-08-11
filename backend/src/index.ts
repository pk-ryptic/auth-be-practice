import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { APP_ORIGIN } from "./constants/env";
import authRoutes from "./routes/authRoutes";

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

// health check
app.get('/', (_,res) => {
    return res.status(200).json({
        status : "Server is healthy"
    });
});

// auth routes
app.use('/auth', authRoutes);