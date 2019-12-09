import React, { useEffect } from 'react';
import serviceWorker from './utils/serviceWorker';
import './utils/notification';

export default function ServiceWorker() {
    useEffect(() => {
        serviceWorker.register();
        return () => {
            serviceWorker.unregister();
        };
    }, []);
    return null;
}
