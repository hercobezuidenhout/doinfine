import { deleteScope } from "@/prisma/commands/delete-scope";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ scopeId: string; }>; }
) {
    const { scopeId } = await params;

    await deleteScope(Number(scopeId));

    return Response.json({});
}