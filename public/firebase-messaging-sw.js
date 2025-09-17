// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDjbFSkxVKjXSRskj0m9R7PROgDdnz6Nzo",
    authDomain: "doinfine-v0.firebaseapp.com",
    projectId: "doinfine-v0",
    storageBucket: "doinfine-v0.firebasestorage.app",
    messagingSenderId: "955137499372",
    appId: "1:955137499372:web:c8c592457883a518f945c9",
    measurementId: "G-FMEK5PY9YF"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );

    console.log("Notification permission:", Notification.permission);

    // Customize notification here
    const { title, body, icon } = payload.notification || {};
    const notificationTitle = title || "New notification";
    const notificationOptions = {
        body: body || "",
        icon: icon || "/assets/logo.jpg",
        data: payload.data || {},
    };

    self.registration.showNotification(notificationTitle, notificationOptions)
        .then(response => console.log(response))
        .catch(error => console.log(error));
});