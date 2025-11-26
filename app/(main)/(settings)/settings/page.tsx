import { BackButton } from "@/app/(main)/components/BackButton";
import { PushNotificationManager } from "@/app/(main)/components/PushNotificationsManager";
import { Heading, HStack, VStack } from "@chakra-ui/react";

const Page = () => {

    return (
        <VStack alignItems="stretch" gap={4}>
            <VStack alignItems="start" width="full">
                <BackButton href="/" />
                <HStack justifyContent="space-between" width="full">
                    <HStack>
                        <Heading size={{ base: "3xl", md: "5xl" }}>Settings</Heading>
                    </HStack>
                </HStack>
            </VStack>

            <PushNotificationManager />
        </VStack>
    );
};

export default Page;