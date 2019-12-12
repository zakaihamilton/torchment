const { makeModule, importModule } = require('../core/module');
const webpush = require('web-push');
const config = require('../core/config');
const { objectId, getCollectionHandle } = require('../data/db');

let keysInit = false;

async function saveSubscription(subscription) {
    const collectionHandle = await getCollectionHandle("devices", "subscriptions");
    const _id = objectId().toString();
    const data = { _id, ...subscription };
    console.log("saving subscription: " + JSON.stringify(data));
    await collectionHandle.insertOne(data);
    return _id;
}

async function sendNotification({ delay, ...options }, subscription) {
    const collectionHandle = await getCollectionHandle("devices", "subscriptions");
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
        else {
            collectionHandle.find({}).forEach(subscription => {
                webpush.sendNotification(subscription, JSON.stringify(options));
            });
        }
    }, parseInt(delay) || 0);
};

module.exports = makeModule("push", {
    saveSubscription,
    sendNotification
});
