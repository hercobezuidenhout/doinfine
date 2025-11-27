'use client';

import { ScopesList } from "./components/ScopesList";
import { ScopeHeader } from "../components/ScopeHeader";

export default function Page() {
    return (
        <>
            <ScopeHeader />
            <ScopesList />
        </>
    );
}