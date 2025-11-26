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

        console.info('registerServiceWorker', sub);
        setSubscription(sub);
    }

    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
        });
        setSubscription(sub);
        const serializedSub = JSON.parse(JSON.stringify(sub));
        const response = await subscribeUser(serializedSub);
        console.info('subscribeToPush', response);
    }

    async function unsubscribeFromPush() {
        console.info('unsubscribeFromPush');
        if (!subscription) return;
        await subscription?.unsubscribe();
        setSubscription(null);
        const serializedSub = JSON.parse(JSON.stringify(subscription));
        await unsubscribeUser(serializedSub);
    }

    return (<PushNotificationsContext.Provider value={{
        isSupported,
        subscription,
        subscribe: subscribeToPush,
        unsubscribe: unsubscribeFromPush
    }}>{children}</PushNotificationsContext.Provider>);
};

export const usePushNotifications = () => useContext(PushNotificationsContext);