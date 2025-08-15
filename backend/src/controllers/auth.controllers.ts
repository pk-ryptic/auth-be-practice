import express, { NextFunction, Request, Response } from "express";
import registerSchema from "../schemas/registerSchema";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/httpStatusCodes";
import { setAuthCookies } from "../utils/cookies";

export const registerHandler = catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
    // validate the request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"] || "unknown",
    })
    // call service
    const { user, accesToken, refreshToken } = await createAccount(request);
    // return response
    return setAuthCookies({res, accesToken, refreshToken}) 
        .status(CREATED)
        .json(user);
});