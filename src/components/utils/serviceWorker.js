import { makeSubscribable } from '../../mgr/core/subscribe';
import { sendNotification } from '../../mgr/push/push';

let handle = null;

async function unregister() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.unregister();
        handle = null;
    }
}

async function register() {
    if ('serviceWorker' in navigator) {
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
    await sendNotification(options, subscription);
    return true;
}

export default makeSubscribable({
    register,
    unregister,
    showLocalNotification,
    showPushNotification
});
