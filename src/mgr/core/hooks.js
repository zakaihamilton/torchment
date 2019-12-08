import React, { useEffect, useState } from 'react';

export function useAPI(method, ...args) {
    const [result, setResult] = useState(undefined);
    const depends = args.map(arg => {
        if (typeof arg === "undefined") {
            return typeof arg;
        }
    });
    useEffect(() => {
        const promise = method(...args);
        if (promise.then) {
            promise.then(result => {
                setResult(result);
            });
        }
        else {
            setResult(promise);
        }
    }, depends);

    return result;
}
