import { adminDb, FieldValue } from "@/utils/firebase/admin";

export type NotificationType = "REACTION" | "FINE";

export interface NotificationPayload {
    userId: string;
    title: string;
    description: string;
    href?: string;
    type: NotificationType;
    metadata?: Record<string, unknown>;
}

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

        const tokensSnapshot = await adminDb
            .collection("users")
            .doc(userId)
            .collection("deviceTokens")
            .get();


        const tokens = tokensSnapshot.docs.map((doc) => doc.id);
        console.info(tokens);
        if (!tokens.length) return;
    } catch (err) {
        console.error("Failed to create notification or send push", err);
        throw err;
    }
}
