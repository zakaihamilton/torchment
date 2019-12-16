const { makeModule } = require('./module');
const { objectId, getCollectionHandle } = require('../data/db');
const config = require("./config");

async function logs() {
    const identity = await config.getParam("logger", "identity");
    const collectionHandle = await getCollectionHandle("core", "logger");
    return await collectionHandle.find({ identity }).toArray();
}

async function push(type, ...params) {
    const identity = await config.getParam("logger", "identity");
    const collectionHandle = await getCollectionHandle("core", "logger");
    const _id = objectId().toString();
    const data = { _id, identity, type, params, date: new Date(), now: Date.now() };
    await collectionHandle.insertOne(data);
}

function log(...params) {
    console.log(...params);
    return push("log", ...params);
}

function error(...params) {
    console.error(...params);
    return push("error", ...params);
}

function warn(...params) {
    console.warn(...params);
    return push("warn", ...params);
}

module.exports = makeModule("logger", {
    logs,
    log,
    error,
    warn
});
