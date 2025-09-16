import { adminDb, FieldValue } from "@/utils/firebase/admin";

export type NotificationType = "REACTION" | "NEW_POST" | "INVITE_JOIN";

export interface NotificationPayload {
    userId: string;
    title: string;
    description: string;
    type: NotificationType;
    metadata?: Record<string, any>;
}

export async function createNotification(payload: NotificationPayload) {
    const { userId, title, description, type, metadata = {} } = payload;

    try {
        await adminDb.collection("notifications").add({
            userId,
            title,
            description,
            type,
            metadata,
            read: false,
            createdAt: FieldValue.serverTimestamp(),
        });
    } catch (err) {
        console.error("Failed to create notification", err);
        throw err;
    }
}
