const { makeModule } = require('./module');
const fs = require("fs");
const _ = require("lodash");
const http = require("http");

async function getConfig() {
    const file = await fs.promises.readFile('./package.json');
    let json = JSON.parse(file);
    const path = './config/' + (json.profile || "default");
    const list = await fs.promises.readdir(path);
    for (const name of list) {
        if (!name.endsWith(".json")) {
            continue;
        }
        const subFile = await fs.promises.readFile(path + "/" + name);
        try {
            json = _.merge(json, JSON.parse(subFile));
        }
        catch (err) {
            console.error("The profile configuration " + path + "/" + name + " is invalid: " + err);
        }
    }
    if (json.private && !(typeof this === "object" && this instanceof http.IncomingMessage)) {
        json = _.merge(json, json.private);
    }
    delete json.private;
    return json;
}

async function getParam(...tokens) {
    const config = await getConfig();
    return tokens.reduce((parent, name) => {
        if (parent) {
            return parent[name];
        }
    }, config);
}

module.exports = makeModule("config", {
    getConfig,
    getParam
});
