import { makeSubscribable } from '../../mgr/core/subscribe';

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

const showLocalNotification = ({ title, body, ...options }) => {
    handle.showNotification(title, { body, ...options });
}

export default makeSubscribable({
    register,
    unregister,
    showLocalNotification
});
