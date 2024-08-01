import { rewriteCss } from "./rewriters/css";
import { rewriteHeaders } from "./rewriters/headers";
import { encodeUrl, decodeUrl } from "./utils/url";

if (!self.$skyhigh) {
	self.$skyhigh = {};
}

self.$skyhigh = {
        url: {
                encodeUrl,
                decodeUrl
        },

        rewriters: {
                rewriteCss,
                rewriteHeaders
        }
}
