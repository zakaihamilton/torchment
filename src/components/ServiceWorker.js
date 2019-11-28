import React, { useEffect } from 'react';
import { register, unregister } from 'next-offline/runtime';

export default function ServiceWorker() {
    useEffect(() => {
        register();
        return () => {
            unregister();
        };
    }, []);
    return null;
}
