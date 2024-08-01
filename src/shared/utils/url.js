function canParse(url, origin) {
    try {
		new URL(url, origin);

		return true;
	} catch {
		return false;
	}
}

export function decodeUrl(url) {
    const baseUrl = location.origin.length + self.$skyhigh.config.prefix.length;

    if (canParse(url)) {
        const fragment = url.slice(baseUrl);
        return self.$skyhigh.config.codec.decode(fragment);
    }
}

export function encodeUrl(url) {
    const baseUrl = location.origin.length + self.$skyhigh.config.prefix.length;
    const fragment = self.$skyhigh.config.codec.decode(location.href.slice(baseUrl));
    const origin = new URL(fragment);

    if (canParse(url, origin.href)) {
        const encodedUrl = self.$skyhigh.config.codec.encode(new URL(url, origin).href);
        return `${location.origin}${self.$skyhigh.config.prefix}${encodedUrl}`;
    }
}