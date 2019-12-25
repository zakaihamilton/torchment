const { makeModule } = require('./module');
const config = require("./config");
const dbList = require('../data/list')({ dbName: "core", collectionName: "logger" });

async function logs() {
    const identity = await config.getParam("logger", "identity");
    return await dbList.find({ identity }).toArray();
}

async function push(type, ...params) {
    const identity = await config.getParam("logger", "identity");
    const data = { identity, type, params, date: new Date(), now: Date.now() };
    await dbList.push(data);
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
