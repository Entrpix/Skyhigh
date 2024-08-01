import { encodeUrl } from "./utils/encodeUrl";
import { decodeUrl } from "./utils/decodeUrl";

if (!self.$skyhigh) {
	self.$skyhigh = {};
}

self.$skyhigh.shared = {
    url: {
        encodeUrl,
        decodeUrl
    }
}