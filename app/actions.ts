'use server';

import { adminDb } from '@/utils/firebase/admin';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import webpush from 'web-push';

webpush.setVapidDetails(
    'mailto:support@doinfine.app',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

async function getUser() {
    const supabaseClient = await createClient();
    const { data } = await supabaseClient.auth.getUser();

    if (data && data.user) {
        return data.user;
    }
}

async function getUserSubscriptions(user: User) {
    const userNotificationSettings = await adminDb.collection('userNotificationSettings').doc(user.id).get();
    const userNotificationSettingsData = userNotificationSettings.data();

    return userNotificationSettingsData?.subscriptions || [];
}

export async function subscribeUser(sub: webpush.PushSubscription) {
    // In a production environment, you would want to store the subscription in a database
    // For example: await db.subscriptions.create({ data: sub })
    const user = await getUser();

    if (user) {
        const userSubscriptions = await getUserSubscriptions(user);
        userSubscriptions.push(sub);
        await adminDb.collection('userNotificationSettings').doc(user.id).set({
            subscriptions: userSubscriptions
        });

        return { success: true };
    } else {
        return { success: false, message: 'User not authenticated' };
    }
}

export async function unsubscribeUser(subscriptionToRemove: webpush.PushSubscription) {

    // In a production environment, you would want to remove the subscription from the database
    // For example: await db.subscriptions.delete({ where: { ... } })
    const user = await getUser();

    if (user) {
        const userSubscriptions = await getUserSubscriptions(user);
        const updatedSubscriptions = userSubscriptions.filter(
            (sub: webpush.PushSubscription) => {
                return sub.endpoint !== subscriptionToRemove.endpoint ||
                    sub.keys?.p256dh !== subscriptionToRemove.keys?.p256dh ||
                    sub.keys?.auth !== subscriptionToRemove.keys?.auth;
            }
        );
        try {
            await adminDb.collection('userNotificationSettings').doc(user.id).update('subscriptions', updatedSubscriptions);
            return { success: true };
        } catch {
            return { success: false };
        }
    } else {
        return { success: false };
    }
}

export async function sendNotification(message: string) {
    const user = await getUser();

    if (user) {
        const userSubscriptions = await getUserSubscriptions(user);

        try {
            for (let subscriptionIndex = 0; subscriptionIndex < userSubscriptions.length; subscriptionIndex++) {
                const userSubscription = userSubscriptions[subscriptionIndex];
                console.info('sendNotification', userSubscription);
                try {
                    await webpush.sendNotification(
                        userSubscription,
                        JSON.stringify({
                            title: 'Test Notification',
                            body: message,
                            icon: '/icon.png',
                        })
                    );
                } catch (error) {
                    console.error('Error sending push notification:', error);
                    if ((error as webpush.SendResult).statusCode === 410) {
                        await unsubscribeUser(userSubscription);
                    }
                }

            }
            return { success: true };
        } catch (error) {
            console.error('Error sending push notification:', error);
            return { success: false, error: 'Failed to send notification' };
        }
    } else {
        return { success: false, message: 'User not authenticated' };
    }
}