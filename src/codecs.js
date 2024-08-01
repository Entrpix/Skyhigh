const base64 = {
    encode: (str) => {
        return btoa(encodeURIComponent(str));
    },

    decode: (str) => {
        return decodeURIComponent(atob(str));
    }
};

const plain = {
    encode: (str) => {
        return encodeURIComponent(str);
    },

    decode: (str) => {
        return decodeURIComponent(str);
    }
};


const none = {
    encode: (str) => {
        return str;
    },

    decode: (str) => {
        return str;
    }
};

if (typeof self.$skyhigh === "undefined") {
	self.$skyhigh = {};
}
self.$skyhigh.codecs = {
	none,
	plain,
	base64,
};