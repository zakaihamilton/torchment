import { makeSubscribable } from '../../mgr/core/subscribe';

let messages = [];
let exports = null;

function update() {

}

function count() {
    return messages.length;
}

function list() {
    return [...messages];
}

function push(message) {
    message = { ...message };
    if (!message.id) {
        message.id = new Date();
    }
    messages = [...messages, message];
    exports.update();
    return message;
}

function remove(id) {
    messages = messages.filter(message => message.id !== id);
    exports.update();
}

function empty() {
    messages = [];
    exports.update();
}

exports = makeSubscribable({
    count,
    list,
    push,
    remove,
    empty,
    update
});

export default exports;
