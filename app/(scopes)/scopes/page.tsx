import { ScopesList } from "./components/ScopesList";
import { ScopeHeader } from "../components/ScopeHeader";

export default async function Page() {
    return (
        <>
            <ScopeHeader />
            <ScopesList />
        </>
    );
}