'use server';

import { adminDb } from '@/utils/firebase/admin';
import { createClient } from '@/utils/supabase/server';
import webpush from 'web-push';

webpush.setVapidDetails(
    'mailto:support@doinfine.app',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

let subscription: webpush.PushSubscription | null = null;

export async function subscribeUser(sub: webpush.PushSubscription) {
    const supabaseClient = await createClient();
    subscription = sub;
    // In a production environment, you would want to store the subscription in a database
    // For example: await db.subscriptions.create({ data: sub })
    const { data } = await supabaseClient.auth.getUser();

    if (data && data.user) {
        await adminDb.collection('userNotificationSettings').doc(data.user?.id).set({
            subscription: sub
        });

        return { success: true };
    } else {
        return { success: false, message: 'User not authenticated' };
    }
}

export async function unsubscribeUser() {
    subscription = null;
    // In a production environment, you would want to remove the subscription from the database
    // For example: await db.subscriptions.delete({ where: { ... } })
    const supabaseClient = await createClient();
    const { data } = await supabaseClient.auth.getUser();

    if (data && data.user) {
        await adminDb.collection('userNotificationSettings').doc(data.user.id).delete();
        return { success: true };
    } else {
        return { success: false };
    }
}

export async function sendNotification(message: string) {
    const supabaseClient = await createClient();
    const { data } = await supabaseClient.auth.getUser();
    if (data && data.user) {
        const userNotificationSettings = await adminDb.collection('userNotificationSettings').doc(data.user.id).get();
        const userNotificationSettingsData = userNotificationSettings.data();
        if (!userNotificationSettings || !userNotificationSettingsData) {
            throw new Error('No subscription available');
        }


        try {
            await webpush.sendNotification(
                userNotificationSettingsData.subscription,
                JSON.stringify({
                    title: 'Test Notification',
                    body: message,
                    icon: '/icon.png',
                })
            );
            return { success: true };
        } catch (error) {
            console.error('Error sending push notification:', error);
            return { success: false, error: 'Failed to send notification' };
        }

        return { success: true };
    } else {
        return { success: false, message: 'User not authenticated' };
    }

    if (!subscription) {
        throw new Error('No subscription available');
    }
}