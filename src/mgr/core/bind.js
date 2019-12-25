function bindMethods(methods, params) {
    const binds = {};
    for (const methodName in methods) {
        const callback = methods[methodName];
        binds[methodName] = callback.bind(this, params);
    }
    return binds;
}

function makeBindable(methods) {
    const bind = params => {
        return bindMethods(methods, params);
    };
    return bind;
}
module.exports = {
    makeBindable
};