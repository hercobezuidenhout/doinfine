import { GuildsList } from "./components/GuildsList";
import { GuildHeader } from "../components/GuildHeader";

export default async function GuildsPage() {
    return (
        <>
            <GuildHeader />
            <GuildsList />
        </>
    );
}