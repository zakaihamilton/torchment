const { makeModule } = require('../core/module');
const webpush = require('web-push');
const config = require('../core/config');
const logger = require("../core/logger");
const designateList = require('../data/list');
const dbList = designateList({ dbName: "devices", collectionName: "subscriptions" });

let keysInit = false;

function saveSubscription(subscription) {
    return dbList.push(subscription);
}

async function sendNotification({ delay, ...options }, subscription) {
    logger.log("Sending notification:", options, "delay:", delay, "subscription:", subscription);
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
            dbList.find({}).forEach(subscription => {
                webpush.sendNotification(subscription, JSON.stringify(options));
            });
        }
    }, parseInt(delay) || 0);
};

module.exports = makeModule("push", {
    saveSubscription,
    sendNotification
});
