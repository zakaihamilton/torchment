import React, { useEffect } from 'react';
import serviceWorker from './utils/serviceWorker';
import './utils/push';

export default function ServiceWorker() {
    useEffect(() => {
        serviceWorker.register();
        return () => {
            serviceWorker.unregister();
        };
    }, []);
    return null;
}
