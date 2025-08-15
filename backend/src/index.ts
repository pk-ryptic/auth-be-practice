
import express, { Request, Response } from "express";
import cors from "cors";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import { OK } from "./constants/httpStatusCodes";

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
app.get('/', (_: Request,res: Response) => {
    return res.status(OK).json({
        status : "Server is healthy"
    });
});

// auth routes
app.use('/auth', authRoutes);

app.use(errorHandler);


app.listen(PORT, async () => {
    console.log(`server is listening to ${PORT} in ${NODE_ENV} environment`);
    await connectToDatabase();
})