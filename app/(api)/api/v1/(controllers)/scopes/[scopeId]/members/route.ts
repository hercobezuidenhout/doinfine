import { getScopeMembers } from "@/prisma/queries/get-scope-members";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ scopeId: string; }>; }) {
    const { scopeId } = await params;

    const scopeMembers = await getScopeMembers(Number(scopeId));

    if (!scopeMembers) {
        return new Response(JSON.stringify({ error: "Scope not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(scopeMembers), {
        headers: { 'Content-Type': 'application/json' },
    });
}