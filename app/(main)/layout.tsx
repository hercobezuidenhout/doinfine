import { PropsWithChildren } from "react";
import { AppHeader } from "./components/AppHeader";
import { Container, HStack } from "@chakra-ui/react";
import { MainNavigationMenu } from "./components/MainNavigationMenu";

export default function MainLayout({ children }: PropsWithChildren) {

    return (
        <div>
            <AppHeader />
            <HStack width="full" alignItems="start" py={8}>
                <Container maxWidth="sm" fluid>
                    <MainNavigationMenu />
                </Container>
                <Container maxWidth="3xl">
                    {children}
                </Container>
                <Container maxWidth="sm" fluid>
                    {/* <MainNavigationMenu /> */}
                </Container>
            </HStack>
        </div>
    );
}