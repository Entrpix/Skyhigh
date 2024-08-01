function canParse(url, origin) {
    try {
		new URL(url, origin);

		return true;
	} catch {
		return false;
	}
}

export function decodeUrl(url) {
    if (canParse(url)) {
        const decoded = self.$skyhigh.config.codec.decode(url.slice((location.origin + self.$skyhigh.config.prefix).length));
        console.log(decoded);
        return decoded;
    }
};