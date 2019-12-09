import { makeSubscribable } from '../../mgr/core/subscribe';

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

export default makeSubscribable({
    shouldShowPermissionRequest,
    askForPermission
});
