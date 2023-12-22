import React from 'react';
import { parse } from 'url';

/**
 * Check whether the link is external
 * @param {String} input The url to check
 * @param {String} input The hostname / url of website
 * @param {Array} input Exclude hostnames. Specific subdomain is required when applicable, including www.
 * @returns {Boolean} True if the link doesn't have protocol or link has same host with config.url
 */

function isExternalLink(input: string, sitehost: string = 'https://www.huanfei.top'): boolean {
    // Return false early for internal link
    if (!/^(\/\/|http(s)?:)/.test(input)) return false;
    sitehost = parse(sitehost).hostname || sitehost;
    if (!sitehost) return false;
    // handle relative url and invalid url
    let data;
    try {
        data = new URL(input, `http://${sitehost}`);
    } catch (e) {
        console.log(e);
    }
    // if input is invalid url, data should be undefined
    if (typeof data !== 'object') return false;
    // handle mailto: javascript: vbscript: and so on
    if (data.origin === 'null') return false;
    const host = data.hostname;
    if (host !== sitehost) return true;
    return false;
}

export default function CustomLink(props: React.AnchorHTMLAttributes<HTMLElement>) {
    const { href } = props;

    if (isExternalLink(href)) {
        return <a {...props} target="_blank" rel="noopener noreferrer external nofollow" />;
    }

    return <a {...props} />;
}
