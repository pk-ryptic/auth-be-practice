import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../constants/env";
import verificationCodeType from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent: string;
}

export const createAccount = async (data: CreateAccountParams) => {
    // verify the user doesn't exist in our db already
    const existingUser = await UserModel.exists({
        email: data.email,
    });
    if (existingUser) {
        throw new Error(`User Already exist`);
    }
    // create user 
    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });
    // create verification code 
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: verificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    })
    // send verification email 

    // create session 
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    })
    // sign access and refresh token
    const refreshToken = jwt.sign(
        {sessionId: session._id},
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d",
        }
    ) 
    // return user & tokens 
}