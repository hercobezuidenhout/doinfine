import { unsubscribeUser } from "@/app/actions";
import { adminDb, FieldValue } from "@/utils/firebase/admin";
import webpush from 'web-push';

export type NotificationType = "REACTION" | "FINE";

export interface NotificationPayload {
    userId: string;
    title: string;
    description: string;
    href?: string;
    type: NotificationType;
    metadata?: Record<string, unknown>;
}

webpush.setVapidDetails(
    'mailto:support@doinfine.app',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

export async function createNotification(payload: NotificationPayload) {
    const { userId, title, description, href, type, metadata = {} } = payload;

    try {
        await adminDb.collection("notifications").add({
            userId,
            title,
            description,
            href,
            type,
            metadata,
            read: false,
            createdAt: FieldValue.serverTimestamp(),
        });

        const userNotificationSettingsSnapshot = await adminDb
            .collection("userNotificationSettings")
            .doc(userId)
            .get();

        const settingsData = userNotificationSettingsSnapshot.data();

        if (!settingsData) return;

        for (let subscriptionIndex = 0; subscriptionIndex < settingsData.subscriptions.length; subscriptionIndex++) {
            const userSubscription = settingsData.subscriptions[subscriptionIndex];
            console.info('sendNotification', userSubscription);
            try {
                await webpush.sendNotification(
                    userSubscription,
                    JSON.stringify({
                        title: title,
                        body: description,
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

    } catch (err) {
        console.error("Failed to create notification or send push", err);
        return;
    }
}
