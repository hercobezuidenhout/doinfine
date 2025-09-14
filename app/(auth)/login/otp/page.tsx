import { VStack, HStack, Image, Heading } from "@chakra-ui/react";
import { OtpForm } from "./components/OtpForm";

interface LoginOtpPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
}

export default async function LoginOtpPage({ searchParams }: LoginOtpPageProps) {
    const email = await searchParams.then(params => params.email as string);
    const redirectTo = await searchParams.then(params => params.redirectTo as string | undefined);

    return (
        <VStack alignItems="stretch" padding={8} gap={8}>
            <VStack alignItems="center" gap={8}>
                <HStack>
                    <Image src="/assets/logo.jpg" alt="Doinfine logo" width={35} height={35} borderRadius="full" />
                    <Heading>Doinfine</Heading>
                </HStack>
                <Heading size="4xl">Verify OTP</Heading>
            </VStack>
            <OtpForm email={email} redirectTo={redirectTo} />
        </VStack>
    );
}