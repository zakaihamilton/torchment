const { makeSubscribable } = require('../core/subscribe');
const { importModule } = require('../core/module');
const config = require('../core/config');
const mongodb = importModule('mongodb');

let _clusterHandle = null;

async function getClusterHandle() {
    if (_clusterHandle) {
        return _clusterHandle;
    }
    const { url } = await config.getParam("db");
    _clusterHandle = await mongodb.MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
    return _clusterHandle;
}

async function getDatabaseHandle(dbName) {
    const clusterHandle = await getClusterHandle();
    return clusterHandle.db(dbName);
}

async function getCollectionHandle(dbName, collectionName) {
    const dbHandle = await getDatabaseHandle(dbName);
    const collectionHandle = await dbHandle.collection(collectionName);
    if (!collectionHandle) {
        throw "No collection found for " + dbName + "/" + collectionName;
    }
    return collectionHandle;
}

function objectId(id) {
    if (id) {
        id = id.toString();
        var object = mongodb.ObjectID(id);
        return object;
    }
    else {
        var object = mongodb.ObjectID();
        return object;
    }
};

module.exports = makeSubscribable({
    objectId,
    getCollectionHandle
});
