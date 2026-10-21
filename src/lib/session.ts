import {cookies} from "next/headers";
import { COOKIE_NAME, SESSION_HOURS, signToken, verifyToken } from "./auth-token";

export async function createSession(adminId: number, email: string){
    const token = await signToken(adminId, email);
    (await cookies()).set(COOKIE_NAME, token, {
        httpOnly: true, // JS in the browser cannot read it
        secure: process.env.NODE_ENV === "production", // HTTPS only when live
        sameSite: "lax", // not sent on cross-site POSTs
        path:'/',
        maxAge: SESSION_HOURS * 60 * 60,
    })
}

export async function getSession() {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    return token ? verifyToken(token) : null;
}


export async function destroySession() {
    (await cookies()).delete(COOKIE_NAME);
}