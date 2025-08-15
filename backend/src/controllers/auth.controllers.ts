import express, { NextFunction, Request, Response } from "express";
import registerSchema from "../schemas/registerSchema";
import catchErrors from "../utils/catchErrors";

export const registerHandler = catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
    // validate the request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    })
    // call service

    // return response
}
);