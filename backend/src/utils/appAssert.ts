import assert from "node:assert";
import { HttpStatusCode } from "../constants/httpStatusCodes";
import AppErrorCode from "../constants/appErrorCodes";
import AppError from "./AppError";


type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition;

// Asserts a condition and throws an AppError if the condition is falsy

const appAssert: AppAssert = (
    condition,
    httpStatusCode,
    message,
    appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
