export function getClientID() {
    if (typeof window === "undefined") {
        return null;
    }
    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    let clientId = window.localStorage.getItem("client_id");
    if (clientId) {
        return clientId;
    }
    window.localStorage.setItem("client_id", uuidv4());
    clientId = window.localStorage.getItem("client_id");
    return clientId;
}
