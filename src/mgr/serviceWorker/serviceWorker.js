import { makeSubscribable } from '../core/subscribe';

async function unregister() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.unregister();
    }
}

async function register() {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.register('/service-worker.js');
    }
}

export default makeSubscribable({
    register,
    unregister
});
