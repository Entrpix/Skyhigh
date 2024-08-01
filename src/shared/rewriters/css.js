import { encodeUrl } from "../utils/url";

export function rewriteCss(css) {
    return css.replace(
        /(?<=url\("?'?)[^"'][\S]*[^"'](?="?'?\);?)/g,
        (match) => {
            const encodedUrl = encodeUrl(match);
            return `url("${encodedUrl}")`;
        }
    );
}