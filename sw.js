self.addEventListener('activate', async () => {
    try {
        const options = { userVisibleOnly: true };
        const subscription = await self.registration.pushManager.subscribe(options);
        console.log(JSON.stringify(subscription));
    } catch (err) {
        console.log('Error', err)
    }
});
