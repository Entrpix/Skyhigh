import { build } from "esbuild";

await build({
    entryPoints: {
        worker: "./src/worker.js",
    },
    entryNames: "skyhigh.[name]",
    outdir: "./dist",
    bundle: true,
    logLevel: "info",
    treeShaking: true,
    minify: true
});
