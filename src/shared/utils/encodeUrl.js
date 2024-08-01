function canParse(url, origin) {
    try {
		new URL(url, origin);

		return true;
	} catch {
		return false;
	}
}

export function encodeUrl(url) {
    const origin = new URL(self.$skyhigh.config.codec.decode(location.href.slice((location.origin + self.$skyhigh.config.prefix).length)))

    if (canParse(url, origin)) {
        const encoded = location.origin + self.$skyhigh.config.prefix + self.$skyhigh.config.codec.encode(new URL(url, origin).href);
        return encoded;
    }
};