import {SignJWT, jwtVerify} from 'jose';

export const COOKIE_NAME = 'vmedex_admin_session';
export const SESSION_HOURS = 8;

function getKey() {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if(!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
    return new TextEncoder().encode(secret);
}

export async function signToken(adminId: number, email:string) {
    return new SignJWT({email})
    .setProtectedHeader({alg: 'HS256'})
    .setSubject(String(adminId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(getKey())
}

// Returns the session if the token is genuine and unexpired, otherwise null
export async function verifyToken(token: string){
try{
    const {payload} = await jwtVerify(token, getKey());
    return {adminId: Number(payload.sub), email: String(payload.email)};
} catch {
    return null;
}
}