import React, { useEffect } from 'react';
import serviceWorker from '../mgr/serviceWorker/serviceWorker';
import '../mgr/push/push';

export default function ServiceWorker() {
    useEffect(() => {
        serviceWorker.register();
        return () => {
            serviceWorker.unregister();
        };
    }, []);
    return null;
}
