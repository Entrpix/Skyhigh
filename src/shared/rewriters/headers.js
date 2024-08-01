// https://github.com/MercuryWorkshop/scramjet/blob/main/src/shared/rewriters/headers.ts

import { encodeUrl } from "../utils/url";

const cspHeaders = [
    'cross-origin-embedder-policy',
    'cross-origin-opener-policy',
    'cross-origin-resource-policy',
    'content-security-policy',
    'content-security-policy-report-only',
    'expect-ct',
    'feature-policy',
    'origin-isolation',
    'strict-transport-security',
    'upgrade-insecure-requests',
    'x-content-type-options',
    'x-download-options',
    'x-frame-options',
    'x-permitted-cross-domain-policies',
    'x-powered-by',
    'x-xss-protection',
    'clear-site-data'
]

const urlHeaders = [
    "location",
    "content-location",
    "referer",
];

export function rewriteHeaders(headers) {
	const rewritenHeaders = {};

	for (const key in headers) {
		rewritenHeaders[key.toLowerCase()] = headers[key];
	}

	cspHeaders.forEach((csp) => {
		delete rewritenHeaders[csp];
	});

	urlHeaders.forEach((url) => {
		if (rewritenHeaders[url])
			rewritenHeaders[url] = encodeUrl(rewritenHeaders[url]);
	});

	if (rewritenHeaders["link"]) {
        const regex = /<(.*?)>/gi;
        
		rewritenHeaders["link"] = rewritenHeaders["link"].replace(regex, (match) =>
			encodeUrl(match, origin)
		);
	}

	return rewritenHeaders;
}
