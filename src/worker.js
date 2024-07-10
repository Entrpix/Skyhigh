// TODO: Swap to bare-mux
import { createBareClient } from '@tomphttp/bare-client';

self.skyhighServiceWorker = class SkyhighServiceWorker {
    constructor(config) {
        this.config = config;
        this.prefix = this.config.prefix;
    }

    async init() {
        this.client = await createBareClient(this.config.bare);
    } // Set Bare Server

    route(event) {
        const url = new URL(event.request.url);
        return url.pathname.startsWith(this.prefix);
    } // Ex. /url/https://example.com (TODO: Codecs)

    async fetch(event) {
        const url = new URL(event.request.url);
        const targetUrl = decodeURIComponent(url.pathname.replace(this.prefix, ''));
        try {
            const response = await this.client.fetch(targetUrl);
            return response;
        } catch (error) {
            console.error('Fetch failed:', error);
            return new Response('Error fetching the URL', { status: 500 });
        }
    } // Fetches URL using Bare Client (TODO: rewritting)
};

(async () => {
    const worker = new self.skyhighServiceWorker(__skyhigh$config);
    await worker.init();
    self.skyhigh = worker;
})(); // Init Service Worker
