const { makeModule } = require('../core/module');
const webpush = require('web-push');
const config = require('../core/config');

const subscriptions = [];

let keysInit = false;

async function saveSubscription(subscription) {
    console.log("subscription: " + JSON.stringify(subscription));
    subscriptions.push(subscription);
    return true;
}

async function sendNotification({ delay, ...options }, subscription) {
    console.log("sendNotification delay:" + delay + " options: " + JSON.stringify(options));
    if (!keysInit) {
        const { push: { public, private, email } } = (await config.getConfig());
        webpush.setVapidDetails(
            email,
            public,
            private
        );
        keysInit = true;
    }
    setTimeout(() => {
        if (subscription) {
            webpush.sendNotification(subscription, JSON.stringify(options));
        }
        else if (subscriptions.length) {
            subscriptions.map(subscription => webpush.sendNotification(subscription, JSON.stringify(options)));
        }
        else {
            console.error("No subscriptions!");
        }
    }, parseInt(delay) || 0);
};

module.exports = makeModule("push", {
    saveSubscription,
    sendNotification
});
