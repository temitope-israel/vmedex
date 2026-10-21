import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "./lib/auth-token";

export async function proxy(request: NextRequest){
    // /the login page itself must stay reachable
    if(request.nextUrl.pathname === "/admin/login") return NextResponse.next();

    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyToken(token) : null;


    if(!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next();
}


export const config = {matcher: ["/admin/:path"]};