importScripts('/sky/skyhigh.worker.js');

const skyhigh = new SkyhighServiceWorker();

async function handleRequest(event) {
    if (skyhigh.route(event)) {
        return skyhigh.fetch(event);
    }
    return fetch(event.request);
}

self.addEventListener('fetch', event => {
    event.respondWith(handleRequest(event));
});
