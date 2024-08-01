import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { fileURLToPath } from "node:url";
import wisp from "wisp-server-node";
import { createServer } from "http";
import { join } from "node:path";
import express from "express";

const app = express();

app.use(express.static(join(fileURLToPath(new URL(".", import.meta.url)), "./public")));

app.use("/sky", express.static(join(fileURLToPath(new URL(".", import.meta.url)), "./dist")));

app.use("/baremux", express.static(baremuxPath));
app.use("/epoxy", express.static(epoxyPath));
app.use("/libcurl", express.static(libcurlPath));

const server = createServer(app);
server.on("upgrade", (req, socket, head) => {
	wisp.routeRequest(req, socket, head);
});

server.listen(3000, () => {
	console.log("Server listening on port 3000");
});
