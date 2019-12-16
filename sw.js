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

function importValue(value) {
    const type = typeof value;
    if (type === "object") {
        value = JSON.stringify(value);
    }
    else if (type === "undefined") {
        value = null;
    }
    return { type, value };
}

function exportValue({ type, value }) {
    if (type === "number") {
        return new Number(value);
    }
    else if (type === "string") {
        return new String(value);
    }
    else if (type === "object") {
        return JSON.parse(value);
    }
    else if (type === "undefined") {
        return undefined;
    }
    else {
        return value;
    }
}

async function fetchFromServer(path, ...params) {
    const body = JSON.stringify(params.map(importValue));
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    });
    const value = exportValue(await response.json());
    return value;
}

async function checkSubscription() {
    if (typeof Notification === "undefined") {
        return;
    }
    try {
        if (Notification.permission === "granted") {
            let subscription = await self.registration.pushManager.getSubscription();
            if (!subscription) {
                const public = await fetchFromServer("/config/getParam", "push", "public");
                if (!public) {
                    throw "No push/public key found in config for subscription registration";
                }
                const applicationServerKey = urlB64ToUint8Array(public);
                const options = { applicationServerKey, userVisibleOnly: true };
                await fetchFromServer('/push/saveSubscription', subscription);
                await self.registration.pushManager.subscribe(options);
                console.log("Subscription Successful");
            }
        }
        else {
            console.log("Notification permissions are in the state of: ", Notification.permission);
        }
    }
    catch (err) {
        console.error("failed in subscription: ", err);
        await fetchFromServer("/logger/error", "failed in subscription: ", err);
    }
}

async function sendMessage(message) {
    const clientList = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    });
    clientList.forEach(client => {
        console.log("Sending message to client");
        client.postMessage(message);
    });
}

self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('activate', async event => {
    event.waitUntil(async function () {
        self.clients.claim();
        await checkSubscription();
    }());
});

self.addEventListener('message', event => {
    event.waitUntil(async function () {
        if (event.data) {
            const { type } = event.data;
            console.log("Recieved message:", type);
            if (type === "update") {
                await checkSubscription();
            }
        }
    }());
});

self.addEventListener('push', function (event) {
    event.waitUntil(async function () {
        if (event.data) {
            const { title, ...options } = event.data.json();
            self.registration.showNotification(title, options);
            console.log("Sending", title, "with options:", options);
            await sendMessage({ type: "push", title, ...options });
        } else {
            console.error('Push event but no data');
        }
    }());
});

self.addEventListener('notificationclick', function (event) {
    const clickedNotification = event.notification;
    if (clickedNotification) {
        clickedNotification.close();
    }
    event.waitUntil(async function () {
        const clientList = await self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        });
        if (clientList.length > 0) {
            console.log("Found a client");
            if (clientList[0].focused) {
                console.log("Client is in focus");
            }
            else {
                console.log("Focusing client");
                return clientList[0].focus();
            }
        }
        else {
            console.log("Opening new client");
            return self.clients.openWindow('/');
        }
    }());
});