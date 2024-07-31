import { BareClient } from '@mercuryworkshop/bare-mux';
self.SkyhighServiceWorker = class SkyhighServiceWorker {
    constructor(config = self.$skyhigh.config) {
        this.client = new BareClient();

        if (!config.prefix) {
            config.prefix = '/sh/';
        }

        this.prefix = config.prefix;
    }

    route({ request }) {
        if (request.url.startsWith(location.origin + this.prefix)) {
            return true;
        } else {
            return false;
        }
    }

    async fetch({ request }) {
        const url = new URL(request.url);
        const targetUrl = decodeURIComponent(url.pathname.replace(this.prefix, ''));

        try {
            const response = await this.client.fetch(targetUrl);
            return response;
        } catch (error) {
            console.error('Fetch failed:', error);
            return new Response('Error fetching the URL', { status: 500 });
        }
    }
};
