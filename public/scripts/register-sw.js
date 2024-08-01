if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', {
            scope: $skyhigh.config.prefix,
        })
        .then(reg => {
            reg.update();
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const connection = new BareMux.BareMuxConnection('/baremux/worker.js');

const transport = localStorage.getItem('transport');
const url = localStorage.getItem('url');

const frame = document.getElementById('webproxy');

if (!url) {
    localStorage.setItem('url', btoa('https://example.com'));
}

if (!transport) {
    localStorage.setItem('transport', 'epoxy');
}

if (transport === 'epoxy') {
    connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }]);
} else if (transport === 'libcurl') {
    connection.setTransport('/libcurl/index.mjs', [{ wisp: wispUrl }]);
}

if (frame) {
    frame.src = `${location.origin}/sh/${url}`;
}