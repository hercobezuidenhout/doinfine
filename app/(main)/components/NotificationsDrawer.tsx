'use client';

import { useNotifications } from "@/contexts/NotificationsContext";
import {
    Badge,
    Button,
    Card,
    CloseButton,
    Drawer,
    Heading,
    IconButton,
    Portal,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import { LuBell, } from "react-icons/lu";

export const NotificationsDrawer = () => {
    const { notifications, unreadCount, markAsRead } = useNotifications();

    return (
        <>
        <Drawer.Root placement="end">
            <Drawer.Backdrop />
            <Drawer.Trigger asChild>
                <IconButton variant="ghost" aria-label="Menu" borderRadius="full">
                    <LuBell />
                    {unreadCount > 0 && (
                        <Badge
                            ml="-1.5" // position over icon
                            mt="-1.5"
                            colorScheme="red"
                            borderRadius="full"
                            fontSize="0.7rem"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton />
                        </Drawer.CloseTrigger>

                        <Drawer.Header>
                            <Text fontSize="lg" fontWeight="bold">Notifications</Text>
                        </Drawer.Header>
                        <Drawer.Body>
                            <VStack gap={3} align="stretch">
                                {notifications.length === 0 && <Text>No notifications</Text>}

                                {notifications.map((notification) => (
                                    <Card.Root key={notification.id} variant="subtle">
                                        <Card.Body>
                                            <Stack gap={2}>
                                                <Heading size="md">{notification.title}</Heading>
                                                <Text>{notification.description}</Text>
                                            </Stack>
                                        </Card.Body>
                                        {/* <Card.Footer /> */}
                                    </Card.Root>
                                ))}
                            </VStack>
                        </Drawer.Body>
                        <Drawer.Footer>
                            {notifications.length > 0 && (
                                <Button
                                    size="sm"
                                    onClick={async () => {
                                        await Promise.all(notifications.map((n) => !n.read && markAsRead(n.id)));
                                    }}
                                >
                                    Mark all as read
                                </Button>
                            )}
                        </Drawer.Footer>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
        </>
    );
};