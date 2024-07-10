importScripts('/skyhigh/skyhigh.config.js');
importScripts(__skyhigh$config.worker || '/skyhigh/skyhigh.worker.js');

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        if (self.skyhigh.route(event)) {
            return await self.skyhigh.fetch(event);
        } else {
            return await fetch(event.request);
        }
    })());
});