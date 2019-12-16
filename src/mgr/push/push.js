const { makeModule, importModule } = require('../core/module');
const webpush = require('web-push');
const config = require('../core/config');
const { objectId, getCollectionHandle } = require('../data/db');
const logger = require("../core/logger");

let keysInit = false;

async function saveSubscription(subscription) {
    const collectionHandle = await getCollectionHandle("devices", "subscriptions");
    const _id = objectId().toString();
    const data = { _id, ...subscription };
    logger.log("saving subscription: ", data);
    await collectionHandle.insertOne(data);
    return _id;
}

async function sendNotification({ delay, ...options }, subscription) {
    logger.log("Sending notification:", options, "delay:", delay, "subscription:", subscription);
    const collectionHandle = await getCollectionHandle("devices", "subscriptions");
    if (!keysInit) {
        const { public, private, email } = (await config.getParam("push"));
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
