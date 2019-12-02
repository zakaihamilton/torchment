import { makeSubscribable } from '../core/subscribe';

function shouldShowPermissionRequest() {
    if (typeof window !== "undefined") {
        if (Notification.permission === "default") {
            return true;
        }
    }
    return false;
}

async function askForPermission() {
    if (typeof window !== "undefined") {
        let permission = Notification.permission;
        if (permission === "default") {
            permission = await window.Notification.requestPermission();
            if (permission !== 'granted') {
                console.error('Permission not granted for Notification');
            }
        }
    }
}

if (typeof self !== "undefined") {
    self.addEventListener('activate', async () => {
        try {
            const options = {}
            const subscription = await self.registration.pushManager.subscribe(options)
            console.log(JSON.stringify(subscription))
        } catch (err) {
            console.log('Error', err)
        }
    })
}

export default makeSubscribable({
    shouldShowPermissionRequest,
    askForPermission
});
