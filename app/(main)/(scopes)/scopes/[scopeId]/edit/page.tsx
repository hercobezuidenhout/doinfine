import { ScopeHeader } from "@/app/(main)/(scopes)/components/ScopeHeader";
import { getScopeDetails } from "@/prisma/queries/get-scope-details";
import { LuUsers } from "react-icons/lu";
import { EditScopeForm } from "./components/EditScopeForm";

export default async function Page({ params }: { params: Promise<{ scopeId: number; }>; }) {
    const { scopeId } = await params;
    const scope = await getScopeDetails(Number(scopeId));

    const title = `Edit ${scope.name}`;
    const href = `/scopes/${scopeId}`;

    return (
        <>
            <ScopeHeader title={title} icon={<LuUsers />} href={href} />
            {scope && <EditScopeForm scope={{
                id: scope.id || 0,
                name: scope.name || '',
                description: scope.description || ''
            }} />}
        </>
    );
}