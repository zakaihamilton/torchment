import { makeSubscribable } from '../../mgr/core/subscribe';
import { sendNotification } from '../../mgr/push/push';
import notification from './notification';

let handle = null;

notification.askForPermission.subscribe({
    after: (promise) => {
        promise.then(() => {
            if (handle && handle.active) {
                handle.active.postMessage({
                    type: "update"
                });
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    }
});

async function unregister() {
    if (typeof navigator !== "undefined" && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.unregister();
        handle = null;
    }
}

async function register() {
    if (typeof navigator !== "undefined" && 'serviceWorker' in navigator) {
        handle = await navigator.serviceWorker.register('/service-worker.js');
        return handle;
    }
}

function showLocalNotification({ title, body, ...options }) {
    if (!handle) {
        return false;
    }
    handle.showNotification(title, { body, ...options });
    return true;
}

async function showPushNotification(options) {
    if (!handle || !handle.pushManager) {
        return false;
    }
    const subscription = await handle.pushManager.getSubscription();
    if (subscription) {
        await sendNotification(options, subscription);
    }
    else {
        alert("Push Notifications are not supported");
    }
    return true;
}

async function getSubscription() {
    if (!handle || !handle.pushManager) {
        return { error: "Push Manager Not supported" };
    }
    const subscription = await handle.pushManager.getSubscription();
    if (!subscription) {
        return { error: "No subscription" };
    }
    return subscription;
}

function registerEventListener(callback) {
    if (typeof navigator !== "undefined" && 'serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', callback);
    }
}

export default makeSubscribable({
    register,
    unregister,
    showLocalNotification,
    showPushNotification,
    getSubscription,
    registerEventListener
});
