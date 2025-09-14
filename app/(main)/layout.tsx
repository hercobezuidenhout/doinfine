import { PropsWithChildren } from "react"
import { AppHeader } from "./components/AppHeader"
import { Box, Container, HStack } from "@chakra-ui/react"
import { MainNavigationMenu } from "./components/MainNavigationMenu"
import { BottomNavigationBar } from "./components/BottomNavigationBar"
import { MobileAppHeader } from "./components/MobileAppHeader"

export default function MainLayout({ children }: PropsWithChildren) {

    return (
        <div>
            <Box display={{ base: 'none', md: 'block' }}>
                <AppHeader />
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
                <MobileAppHeader />
            </Box>
            <HStack width="full" alignItems="start" py={{ base: 4, md: 8 }}>
                <Container maxWidth="sm" fluid display={{ base: 'none', md: 'block' }}>
                    <MainNavigationMenu />
                </Container>
                <Container maxWidth="3xl">
                    {children}
                </Container>
                <Container maxWidth="sm" fluid display={{ base: 'none', md: 'block' }}>
                    {/* <MainNavigationMenu /> */}
                </Container>
            </HStack>
            <Box display={{ base: 'block', md: 'none' }}>
                <BottomNavigationBar />
            </Box>
        </div>
    )
}