import { deleteScope } from "@/prisma/commands/delete-scope";
import { updateScope } from "@/prisma/commands/update-scope";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ scopeId: string; }>; }
) {
    const { scopeId } = await params;
    const scopeData = await request.json();

    await updateScope({ id: Number(scopeId), ...scopeData });

    return Response.json({});
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ scopeId: string; }>; }
) {
    const { scopeId } = await params;

    await deleteScope(Number(scopeId));

    return Response.json({});
}