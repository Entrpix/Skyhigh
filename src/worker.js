import { BareClient } from '@mercuryworkshop/bare-mux';

if (typeof self.$skyhigh === "undefined") {
	self.$skyhigh = {};
}

self.SkyhighServiceWorker = class SkyhighServiceWorker {
    constructor(config = self.$skyhigh.config) {

        this.client = new BareClient();

        if (!config.prefix) {
            config.prefix = '/sh/';
        }

        this.prefix = config.prefix;
    }

    route({ request }) {
        return request.url.startsWith(location.origin + this.prefix);
    }

    async fetch({ request }) {
        const { decodeUrl } = self.$skyhigh.url;
        const { rewriteCss, rewriteHeaders } = self.$skyhigh.rewriters;

        const decodedUrl = decodeUrl(request.url);
        const url = new URL(decodedUrl);

        console.log('Decoded URL: ' + decodedUrl);
        console.log('Fetching URL: ' + url);

        try {
            const response = await this.client.fetch(url, {
                method: request.method,
                headers: request.headers,
                body: request.body,
                mode: request.mode === "cors" ? request.mode : "same-origin",
                cache: request.cache,
                redirect: request.redirect,
                duplex: "half"
            });

            console.log('Vanilla Response: ', response);

            const rewrittenHeaders = rewriteHeaders(response.headers, url);
            let rewrittenBody;

            console.log('Rewritten Headers: ', rewrittenHeaders);

            switch (request.destination) {
                case "style":
                    rewrittenBody = rewriteCss(await response.text(), url);
                    console.log('Rewritten CSS: ', rewrittenBody);
                    break;
                default:
                    rewrittenBody = response.body;
                    console.log('Rewritten Body: ', rewrittenBody);
                    break;
            }

            console.log('Final Rewritten Body: ', rewrittenBody);

            return new Response(rewrittenBody, {
                headers: rewrittenHeaders,
                status: response.status,
                statusText: response.statusText,
            });
        } catch (error) {
            console.error(error);
            return render(error, decodedUrl);
        }
    }
};

function template(trace, url) {
    const script = `
        errorTrace.value = ${JSON.stringify(trace)};
        fetchedURL.textContent = ${JSON.stringify(url)};
        for (const node of document.querySelectorAll("#hostname")) node.textContent = ${JSON.stringify(location.hostname)};
        reload.addEventListener("click", () => location.reload());
        version.textContent = "0.0.1";
    `;

    return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" />
        <title>Error</title>
        <style>
        * { background-color: white }
        </style>
        </head>
        <body>
        <h1 id="errorTitle">Error processing your request</h1>
        <hr />
        <p>Failed to load <b id="fetchedURL"></b></p>
        <p id="errorMessage">Internal Server Error</p>
        <textarea id="errorTrace" cols="40" rows="10" readonly></textarea>
        <p>Try:</p>
        <ul>
        <li>Checking your internet connection</li>
        <li>Verifying you entered the correct address</li>
        <li>Clearing the site data</li>
        <li>Contacting <b id="hostname"></b>'s administrator</li>
        <li>Verify the server isn't censored</li>
        </ul>
        <p>If you're the administrator of <b id="hostname"></b>, try:</p>
        <ul>
        <li>Restarting your server</li>
        <li>Updating Skyhigh</li>
        <li>Troubleshooting the error on the <a href="https://github.com/entrpix/skyhigh" target="_blank">GitHub repository</a></li>
        </ul>
        <button id="reload">Reload</button>
        <hr />
        <p><i>Skyhigh v<span id="version"></span></i></p>
        <script src="${"data:application/javascript," + encodeURIComponent(script)}"></script>
        </body>
        </html>
    `;
}

function render(error, url) {
    const headers = {
        "content-type": "text/html",
    };
    if (crossOriginIsolated) {
        headers["Cross-Origin-Embedder-Policy"] = "require-corp";
    }

    return new Response(template(String(error), url), {
        status: 500,
        headers: headers,
    });
}
