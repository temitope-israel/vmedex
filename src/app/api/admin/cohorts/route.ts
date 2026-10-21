import { NextRequest,NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { parseCohortInput } from "@/lib/validation";
import { createCohort } from "@/lib/training-admin";
import { apiError } from "@/lib/api-errors";

export async function POST(request: NextRequest) {
    // The proxy does not cover /api, so every admin route checks the session itself
    const session = await getSession();
    if(!session) {
        return NextResponse.json({error: "You're not signed in."}, {status: 401});
    }

    try {
        const body = await request.json().catch(() => null);
        const parsed = parseCohortInput(body);
        if(!parsed.ok) {
            return NextResponse.json({error: parsed.error}, {status:400});

        }

        const id = await createCohort(parsed.data);
        return NextResponse.json({success:true, id}, {status: 201})
    } catch(error) {
        return apiError (error, "Create cohort");
    }
}