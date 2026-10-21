import {NextResponse} from "next/server";

// Error codes meaning "the database could not be reached, or refused us"
const DB_UNAVAILABLE = [
    "ECONNREFUSED",
    "ETIMEDOUT",
    "ENOTFOUND",
    "EAI_AGAIN",
    "PROTOCOL_CONNECTION_LOST",
    "ER_ACCESS_DENIED_ERROR",
];

// Logs the real error for us and returns a friendly JSON response for the visitor.
export function apiError(error: unknown, context: string) {
    console.error(`${context} failed:`, error);

    const code = (error as {code?: string})?.code;
    const message = (error as {message?:string})?.message;

    if((code && DB_UNAVAILABLE.includes(code)) || message === "LOCK_TIMEOUT") {
        return NextResponse.json (
            {error: "We cannot complete that right now. Please try again in a moment."},
            {status: 503}
        )
    };

    return NextResponse.json(
        {error: "Something went wrong on our side. Please try again."},
        {status: 500}
    )
}