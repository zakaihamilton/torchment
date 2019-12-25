const { objectId, getCollectionHandle } = require('../data/db');
const { makeSubscribable } = require('../core/subscribe');
const { makeBindable } = require('../core/bind');

function collectionHandle({ dbName, collectionName }) {
    const collection = getCollectionHandle(dbName, collectionName);
    return collection;
}

async function find(params, query) {
    const collection = await collectionHandle(params);
    return collection.find(query);
}

async function push(params, item) {
    const collection = await collectionHandle(params);
    const _id = objectId().toString();
    const data = { _id, ...item };
    await collection.insertOne(data);
    return data;
}

async function deleteOne(params, query) {
    const collection = await collectionHandle(params);
    return collection.deleteOne(query);
}

async function deleteMany(params, query) {
    const collection = await collectionHandle(params);
    return collection.deleteMany(query);
}

module.exports = makeBindable(makeSubscribable({
    find,
    push,
    deleteOne,
    deleteMany
}));
