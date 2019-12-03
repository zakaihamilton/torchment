export function makeSubscribable(object) {
    if (typeof object === "object") {
        for (let key in object) {
            const method = object[key];
            if (typeof method !== "function") {
                continue;
            }
            const proxy = object[key] = function (...args) {
                object[key].notify("before", ...args);
                const result = method.apply(this, args);
                object[key].notify("after", result, ...args);
                return result;
            }
            proxy._handlers = [];
            proxy.subscribe = (callbacks) => {
                proxy._handlers.push(callbacks);
            }
            proxy.unsubscribe = (callbacks) => {
                proxy._handlers = proxy._handlers.filter(entry => entry.callbacks !== callbacks);
            }
            proxy.notify = (type, ...args) => {
                for (let handler of proxy._handlers) {
                    if (type in handler) {
                        const method = handler[type];
                        if (typeof method === "function") {
                            method(...args);
                        }
                    }
                }
            }
            object[key] = proxy;
        }
    }
    return object;
}
