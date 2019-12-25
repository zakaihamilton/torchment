const { makeBindable } = require('../core/bind');
const { makeModule } = require('../core/module');
const dbList = require('../data/list')({ dbName: "devices", collectionName: "messages" });

async function count({ user }) {
    return (await dbList.find({ user })).count();
}

async function list({ user }) {
    return (await dbList.find({ user })).toArray();
}

function push({ user }, message) {
    const data = { ...message, user, date: new Date() };
    return dbList.push(data);
}

function remove({ user }, _id) {
    return dbList.deleteOne({ user, _id });
}

function empty({ user }) {
    return dbList.deleteMany({ user });
}

module.exports = makeBindable(makeModule("messages", {
    count,
    list,
    push,
    remove,
    empty
}));
