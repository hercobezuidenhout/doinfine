'use client';

import { Alert, CloseButton, Heading, Link, Stack, VStack } from "@chakra-ui/react";
import { Feed } from "../components/Feed";

import { subscribeUser, unsubscribeUser, sendNotification } from '../actions';
import { useEffect, useState } from "react";
import { LuSparkles } from "react-icons/lu";

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null
    );
    const [message, setMessage] = useState('');

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
        await subscription?.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message);
            setMessage('');
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                    <input
                        type="text"
                        placeholder="Enter notification message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    );
}

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; }>;
}

interface WindowWithMSStream extends Window {
    MSStream?: unknown;
}


function InstallPrompt() {
    const DISMISS_INSTALL_PROMPT = 'dismissInstallPrompt';

    const [hasDismissed, setHasDismissed] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const userHasDismissed = localStorage.getItem(DISMISS_INSTALL_PROMPT);
        setHasDismissed(!!userHasDismissed);

        setIsIOS(

            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as WindowWithMSStream).MSStream
        );

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);
        setDeferredPrompt(null);
    };

    const handleDismissClick = () => {
        localStorage.setItem(DISMISS_INSTALL_PROMPT, 'true');
        setHasDismissed(true);
    };

    if (isStandalone) {
        return null; // Don't show install button if already installed
    }

    if (hasDismissed) {
        return null;
    }

    return (
        <>
            <Alert.Root>
                <Alert.Indicator>
                    <LuSparkles />
                </Alert.Indicator>
                <Alert.Content>
                    <Alert.Title>App available</Alert.Title>
                    <Alert.Description>
                        {isIOS ? (
                            'To install this app on your iOS device, tap the share button and select Add to Home Screen.'
                        ) : (

                            <Stack>
                                This app can be downloaded and installed on your device.
                                <Link onClick={handleInstallClick}><b>Install now</b></Link>
                            </Stack>
                        )}
                    </Alert.Description>
                </Alert.Content>
                <CloseButton pos="relative" top="-2" insetEnd="-2" onClick={handleDismissClick} />
            </Alert.Root >
        </>
    );
}

export default function Home() {
    return (
        <VStack alignItems="stretch">
            <PushNotificationManager />
            <InstallPrompt />
            <Heading size={{ base: "3xl", md: "5xl" }}>Feed</Heading>
            <Feed />
        </VStack>
    );
}
