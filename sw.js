function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

async function checkSubscription() {
    try {
        let subscription = await self.registration.pushManager.getSubscription();
        if (!subscription) {
            const config = JSON.parse((await (await fetch("/config/getConfig")).json()).value);
            const applicationServerKey = urlB64ToUint8Array(config.push.public);
            const options = { applicationServerKey, userVisibleOnly: true };
            const subscription = await self.registration.pushManager.subscribe(options);
            const response = await fetch('/push/saveSubscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([{
                    type: "object",
                    value: JSON.stringify(subscription)
                }])
            });
            const result = await response.json();
            console.log("saveSubscription: " + result);
        }
    }
    catch (err) {
        console.log('Error', err);
    }
}

self.addEventListener('activate', async () => {
    checkSubscription();
});

self.addEventListener('push', function (event) {
    if (event.data) {
        const { title, ...options } = event.data.json();
        self.registration.showNotification(title, options);
    } else {
        console.error('Push event but no data');
    }
});
