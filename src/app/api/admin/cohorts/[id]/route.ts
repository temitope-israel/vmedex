import {NextRequest, NextResponse} from "next/server";
import { getSession } from "@/lib/session";
import { parseCohortInput } from "@/lib/validation";
import {updateCohort, deleteCohort} from "@/lib/training-admin";
import { apiError } from "@/lib/api-errors";

type Context = {params: Promise<{id: string}>};

// Turns the id from the URL into a safe positive integer, or null
async function readId(context: Context) {
    const {id: raw} = await context.params; // params is a Promise in Next.js
    const id = Number(raw);
    return Number.isInteger(id) && id > 0 ? id : null;
}


export async function PUT (request:NextRequest, context: Context) {
    const session = await getSession();
    if(!session) {
        return NextResponse.json({error: "You're not signed in."}, {status: 401});
    }

    const id = await readId(context);
    if (id === null) {
        return NextResponse.json({error: "Invalid cohort."}, {status: 400})
    }

    try {
        const body = await request.json().catch(() => null);
        const parsed = parseCohortInput(body);
        if(!parsed.ok) {
            return NextResponse.json({error: parsed.error}, {status: 400})
        }
        const found = await updateCohort(id, parsed.data);
        if(!found) {
            return NextResponse.json({error: "That cohort no longer exists."}, {status: 404 })
        }
        return NextResponse.json({success: true});
    } catch(error) {
        return apiError(error, "Update cohort");
    }
}


export async function DELETE(_request: NextRequest, context: Context){
    const session = await getSession();
    if(!session) {
        return NextResponse.json({error: "You're not signed in."}, {status: 401})
    }

    const id = await readId(context);
    if(id === null) {
        return NextResponse.json({error: "Invalid cohort."}, {status: 400});
    }

    try{
        const outcome = await deleteCohort(id);
        if(outcome === "not_found"){
            return NextResponse.json({error: "That cohort no longer exists."}, {status:404})
        }
        if (outcome === "is_active") {
            // 409  Conflict: the request is valid but clashes with the current state
            return NextResponse.json({
                error: "The active cohort can't be deleted. Make another cohort active first, or untick 'active' on this one."
            }, {status: 409})
        }
        return NextResponse.json({success: true});
    } catch(error) {
        return apiError(error, "Delete cohort")
    }
}