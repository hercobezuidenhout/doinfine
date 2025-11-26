'use client';

import { subscribeUser, unsubscribeUser } from "@/app/actions";
import { urlBase64ToUint8Array } from "@/utils/lib/conversions";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface PushNotificationsContextType {
    isSupported: boolean;
    subscription: PushSubscription | null;
    subscribe: () => void;
    unsubscribe: () => void;
};

const PushNotificationsContext = createContext<PushNotificationsContextType>({
    isSupported: false,
    subscription: null,
    subscribe: () => { },
    unsubscribe: () => { }
});

export const PushNotificationsProvider = ({ children }: PropsWithChildren) => {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
    }

    async function subscribeToPush() {
        console.info('subscribeToPush');
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
        });
        setSubscription(sub);
        const serializedSub = JSON.parse(JSON.stringify(sub));
        await subscribeUser(serializedSub);
    }

    async function unsubscribeFromPush() {
        console.info('unsubscribeFromPush');
        await subscription?.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
    }

    return (<PushNotificationsContext.Provider value={{
        isSupported,
        subscription,
        subscribe: subscribeToPush,
        unsubscribe: unsubscribeFromPush
    }}>{children}</PushNotificationsContext.Provider>);
};

export const usePushNotifications = () => useContext(PushNotificationsContext);