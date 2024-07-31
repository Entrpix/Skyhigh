if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js', {
            scope: '/sh/',
        })
        .then(reg => {
            reg.update();
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}


const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
connection.setTransport('/epoxy/index.mjs', [{ wisp: 'wss://wisp.mercurywork.shop/' }]);

localStorage.setItem('url', 'https://example.com');
const url = `${location.origin}/sh/${localStorage.getItem('url')}`;

const iframe = document.querySelector('iframe');
iframe.src = url;
