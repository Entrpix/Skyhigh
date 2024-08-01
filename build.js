import { build } from "esbuild";

await build({
    entryPoints: {
        worker: "./src/worker.js",
        config: "./src/config.js",
        codecs: "./src/codecs.js",
        shared: "./src/shared/index.js",
    },
    entryNames: "skyhigh.[name]",
    outdir: "./dist",
    bundle: true,
    logLevel: "info",
    treeShaking: true,
    minify: true
});
