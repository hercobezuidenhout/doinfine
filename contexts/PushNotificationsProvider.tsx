'use client'

import {PropsWithChildren, useEffect} from "react";
import {db, messaging} from "@/utils/firebase/client";
import {getToken, onMessage} from "@firebase/messaging";
import {useAuthContext} from "@/contexts/AuthContext";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";

export const PushNotificationsProvider = ({ children }: PropsWithChildren) => {
    const {user} = useAuthContext();

    useEffect(() => {
        if (!messaging || !user) return;

        Notification.requestPermission().then(async (permission) => {
            if (permission === "granted") {
                const token = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                });

                if (token) {
                    await setDoc(doc(db, `users/${user.id}/deviceTokens/${token}`), {
                        token,
                        createdAt: serverTimestamp(),
                    });
                    console.info("Push token saved for user:", user.id);
                }
            }
        });
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);

        });
    }, [user]);



    return (
        <>{children}</>
    )
}