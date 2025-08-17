import { ScopesList } from "./components/ScopesList";
import { ScopeHeader } from "../components/ScopeHeader";

export default async function GuildsPage() {
    return (
        <>
            <ScopeHeader />
            <ScopesList />
        </>
    );
}