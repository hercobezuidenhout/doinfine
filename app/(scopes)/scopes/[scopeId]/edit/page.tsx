import { ScopeHeader } from "@/app/(scopes)/components/ScopeHeader";
import { getScopeDetails } from "@/prisma/queries/get-scope-details";
import { LuShieldEllipsis } from "react-icons/lu";
import { EditScopeForm } from "./components/EditScopeForm";

export default async function Page({ params }: { params: Promise<{ scopeId: number; }>; }) {
    const { scopeId } = await params;
    const scope = await getScopeDetails(Number(scopeId));

    const title = `Edit ${scope.name}`;

    return (
        <>
            <ScopeHeader title={title} icon={<LuShieldEllipsis />} />
            {scope && <EditScopeForm scope={{
                id: scope.id || 0,
                name: scope.name || '',
                description: scope.description || ''
            }} />}
        </>
    );
}