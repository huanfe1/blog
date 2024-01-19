'use strict';

export default function truncate(str: string, length = 120) {
    if (typeof str !== 'string') return;
    const omission = '...';
    const omissionLength = omission.length;
    if (str.length <= length) return str;
    return str.slice(0, length - omissionLength) + omission;
}
