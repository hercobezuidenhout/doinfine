import { Box } from "@chakra-ui/react";
import { OtpForm } from "./components/OtpForm";

interface LoginOtpPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
}

export default async function LoginOtpPage({ searchParams }: LoginOtpPageProps) {
    const email = await searchParams.then(params => params.email as string);
    const redirectTo = await searchParams.then(params => params.redirectTo as string | undefined);

    return (
        <Box maxW="sm" mx="auto" mt={12} p={6}>
            <OtpForm email={email} redirectTo={redirectTo} />
        </Box>
    );
}