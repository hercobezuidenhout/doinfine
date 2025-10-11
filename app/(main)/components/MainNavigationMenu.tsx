import { VStack, Card } from "@chakra-ui/react";
import { MainNavigationMenuItem } from "./MainNavigationMenuItem";
import { LuHouse, LuUser, LuUsers } from "react-icons/lu";
import { PostDialog } from "./PostDialog";

export const MainNavigationMenu = () => (
    <VStack alignItems="stretch" gap={4}>
        <Card.Root variant="subtle">
            <Card.Body>
                <VStack alignItems="stretch">
                    <MainNavigationMenuItem href="/" icon={<LuHouse />} label="Home" />
                    <MainNavigationMenuItem href="/scopes" icon={<LuUsers />} label="Groups" />
                    <MainNavigationMenuItem href="/me" icon={<LuUser />} label="Profile" />
                </VStack>
            </Card.Body>
        </Card.Root>
        <PostDialog />
    </VStack>
);