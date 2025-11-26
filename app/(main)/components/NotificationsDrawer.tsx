'use client';

import { Notification, useNotifications } from "@/contexts/NotificationsContext";
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
import { LuBell } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PushNotificationManager } from "./PushNotificationsManager";

export const NotificationsDrawer = () => {
    const [open, setOpen] = useState(false);
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const router = useRouter();

    const handleNotificationClick = async (notification: Notification) => {
        await markAsRead(notification.id);

        if (notification.href) {
            setOpen(false);
            router.push(notification.href);
        }
    };

    return (
        <>
            <Drawer.Root placement="end" open={open} onOpenChange={(event) => setOpen(event.open)}>
                <Drawer.Trigger asChild>
                    <IconButton variant="ghost" aria-label="Menu" borderRadius="full">
                        <LuBell />
                        {unreadCount > 0 && (
                            <Badge
                                ml="-4"
                                mt="-4"
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
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton />
                            </Drawer.CloseTrigger>

                            <Drawer.Header>
                                <Text fontSize="lg" fontWeight="bold">Notifications <Badge>{unreadCount}</Badge></Text>
                            </Drawer.Header>
                            <Drawer.Body>
                                <PushNotificationManager />
                                <VStack gap={3} align="stretch">
                                    {notifications.length === 0 && <Text>No notifications</Text>}

                                    {notifications.map((notification) => (
                                        <Card.Root key={notification.id} variant="subtle"
                                            onClick={() => handleNotificationClick(notification)}>
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