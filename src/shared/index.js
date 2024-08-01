import { encodeUrl, decodeUrl } from "./utils/url";

if (!self.$skyhigh) {
	self.$skyhigh = {};
}

self.$skyhigh.url = {
        encodeUrl,
        decodeUrl
}