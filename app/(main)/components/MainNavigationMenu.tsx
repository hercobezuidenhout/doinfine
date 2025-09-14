import { VStack, HStack, Icon, Text, Card, Button } from "@chakra-ui/react";
import { MainNavigationMenuItem } from "./MainNavigationMenuItem";
import { LuHouse, LuUsers } from "react-icons/lu";

export const MainNavigationMenu = () => (
    <VStack alignItems="stretch" gap={4}>
        <Card.Root variant="subtle">
            <Card.Body>
                <VStack bg="gray.100" alignItems="stretch">
                    <MainNavigationMenuItem href="/" icon={<LuHouse />} label="Home" />
                    <MainNavigationMenuItem href="/scopes" icon={<LuUsers />} label="Groups" />
                </VStack>
            </Card.Body>
        </Card.Root>
        <Button size="xl">Fine someone</Button>
    </VStack>
);