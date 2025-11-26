'use client';

import { Card, HStack, IconButton, Switch, SwitchCheckedChangeDetails, Text } from '@chakra-ui/react';
import { sendNotification } from '../../actions';
import { useEffect, useState } from "react";
import { usePushNotifications } from '@/contexts/PushNotificationsContext';
import { LuSend } from 'react-icons/lu';
import { useMutation } from '@tanstack/react-query';

export function PushNotificationManager() {
    const { isSupported, subscription, subscribe, unsubscribe } = usePushNotifications();
    const [checked, setChecked] = useState(subscription !== null);

    const sendNotificationMutation = useMutation({
        mutationFn: async (notificationMessage: string) => {
            if (!subscription) {
                throw new Error('No subscription available');
            }
            return await sendNotification(notificationMessage);
        },
        onSuccess: () => {
            console.log('Notification sent successfully');
        },
        onError: (error) => {
            console.error('Failed to send notification:', error);
        },
    });

    async function sendTestNotification() {
        const message = "Hello from Doinfine 👋!";

        if (subscription) {
            console.info('sendTestNotification', subscription);
            sendNotificationMutation.mutate(message);
        }
    }


    const handleCheckChanged = async (event: SwitchCheckedChangeDetails) => {
        setChecked(event.checked);

        if (event.checked) {
            await subscribe();
        } else {
            await unsubscribe();
        }
    };


    useEffect(() => {
        setChecked(subscription !== null);
    }, [subscription]);

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <Card.Root variant="subtle">
            <Card.Header>
                <HStack justifyContent="space-between">
                    <Card.Title>Notifications</Card.Title>
                    <IconButton variant="ghost" onClick={sendTestNotification} loading={sendNotificationMutation.isPending}>
                        <LuSend />
                    </IconButton>
                </HStack>
            </Card.Header>
            <Card.Body gap={4}>
                <HStack justifyContent="space-between" alignItems="center">
                    <Text>Enabled</Text>
                    <Switch.Root size="lg" checked={checked} onCheckedChange={handleCheckChanged}>
                        <Switch.HiddenInput />
                        <Switch.Control />
                    </Switch.Root>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
}