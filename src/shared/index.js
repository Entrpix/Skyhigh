import { encodeUrl, decodeUrl } from "./utils/url";
import { rewriteCss } from './rewriters/css';
import { rewriteHeaders } from './rewriters/headers'

if (!self.$skyhigh) {
	self.$skyhigh = {};
}

self.$skyhigh.url = {
        encodeUrl,
        decodeUrl
}

self.$skyhigh.rewriters = {
        rewriteCss,
        rewriteHeaders
}