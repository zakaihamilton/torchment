const { makeSubscribable } = require('../core/subscribe');
require('es6-promise').polyfill();
require('isomorphic-fetch');

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

function makeModule(mapping) {
    mapping = makeSubscribable(mapping);
    if (typeof window !== "undefined") {
        for (const path in mapping) {
            if (typeof mapping[path] !== "function") {
                continue;
            }
            mapping[path] = async (...args) => {
                let body = args.map(arg => importValue(arg));
                body = JSON.stringify(body);
                const response = await fetch("/" + path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }, body
                });
                if (response.status >= 400) {
                    throw new Error("Bad response from server for: " + path + " args: " + body);
                }
                const json = await response.json();
                if (json.err) {
                    throw json.err;
                }
                const result = exportValue(json);
                return result;
            };
        }
    }
    else {
        if (!global.modules) {
            global.modules = [];
        }
        global.modules.push(mapping);
    }
    return mapping;
}

function handleRequest(req) {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                resolve(body);
            });
        }
        else {
            resolve();
        }
    });
}

function handleModule(pathname, req, res) {
    const modules = global.modules || [];
    for (const methods of modules) {
        for (const method in methods) {
            if (pathname !== "/" + method) {
                continue;
            }
            handleRequest(req).then(async body => {
                const args = JSON.parse(body).map(arg => exportValue(arg));
                let result = {};
                try {
                    const returnVal = await methods[method].apply(req, args);
                    result = importValue(returnVal);
                }
                catch (err) {
                    console.error("error for method: " + method + " args: " + body + " err: " + err);
                    result = { err };
                }
                if (result) {
                    const text = JSON.stringify(result);
                    res.end(text);
                }
            });
            return true;
        }
    }
    return false;
}

module.exports = makeSubscribable({
    makeModule,
    handleModule
});
