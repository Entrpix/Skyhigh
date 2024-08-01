if (typeof self.$skyhigh === 'undefined') {
    self.$skyhigh = {}
};

self.$skyhigh.config = {
    prefix: '/sh/',
    codec: self.$skyhigh.codecs.base64,
    config: '/sky/skyhigh.config.js',
    worker: '/sky/skyhigh.worker.js',
    codecs: '/sky/skyhigh.codecs.js',
    shared: '/sky/skyhigh.shared.js',
};