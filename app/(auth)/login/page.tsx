import { Heading, HStack, Image, VStack } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";

interface LoginPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const redirectTo = await searchParams.then(params => params.redirectTo as string | undefined);

    return (
        <VStack alignItems="stretch" padding={8} gap={8} width={{ base: "full", md: "500px" }}>
            <VStack alignItems="center" gap={8}>
                <HStack>
                    <Image src="/assets/logo.jpg" alt="Doinfine logo" width={35} height={35} borderRadius="full" />
                    <Heading>Doinfine</Heading>
                </HStack>
                <Heading size="4xl">Login</Heading>
            </VStack>
            <LoginForm redirectTo={redirectTo} />
        </VStack>
    );
}