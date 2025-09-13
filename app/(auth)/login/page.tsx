import { Box } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";
import { NextParams } from "@/types/next-params";

interface LoginPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const redirectTo = await searchParams.then(params => params.redirectTo as string | undefined);

    return (
        <Box maxW="sm" mx="auto" mt={12} p={6}>
            <LoginForm redirectTo={redirectTo} />
        </Box>
    );
}