import { CookieOptions, Response } from "express"
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow()
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: "/auth/refresh"
})

export interface AuthParams {
    res: Response,
    accesToken: string,
    refreshToken: string
}

export const setAuthCookies = ({res, accesToken, refreshToken}: AuthParams) => {
    return res
            .cookie("accessToken", accesToken, getAccessTokenCookieOptions())
            .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())
}