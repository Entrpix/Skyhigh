importScripts(
    '/sky/skyhigh.worker.js',
    '/sky/skyhigh.config.js',

);

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