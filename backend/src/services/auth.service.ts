import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../constants/env";
import verificationCodeType from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import appAssert from "../utils/appAssert";
import { CONFLICT } from "../constants/httpStatusCodes";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: CreateAccountParams) => {
    // verify the user doesn't exist in our db already
    const existingUser = await UserModel.exists({
        email: data.email,
    });
    appAssert(!existingUser,CONFLICT,"Email already in use");
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
    
    const accesToken = jwt.sign(
        {userId: user._id},
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m",
        }
    ) 
    // return user & tokens
    return {
        user: user.omitPassword(),
        accesToken,
        refreshToken
    };
}