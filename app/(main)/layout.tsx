import { PropsWithChildren } from "react";
import { AppHeader } from "./components/AppHeader";

export default function MainLayout({ children }: PropsWithChildren) {

    return (
        <div>
            <AppHeader />
            {children}
        </div>
    );
}