"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, PropsWithChildren } from "react";
import { db } from "@/utils/firebase/client";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { useAuthContext } from "./AuthContext";

export interface Notification {
    id: string;
    userId: string;
    title: string;
    description: string;
    href?: string;
    type: string;
    metadata: Record<string, any>;
    read: boolean;
    createdAt: Date;
}

interface NotificationsContextValue {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (notificationId: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "notifications"),
            where("userId", "==", user.id),
            where("read", "==", false),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notifs: Notification[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Notification, "id" | "createdAt">),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
            }));
            setNotifications(notifs);
        });

        return () => unsubscribe();
    }, [user]);

    const markAsRead = async (notificationId: string) => {
        const notifRef = doc(db, "notifications", notificationId);
        await updateDoc(notifRef, { read: true });
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("useNotifications must be used within an InAppNotificationsProvider");
    }
    return context;
};
