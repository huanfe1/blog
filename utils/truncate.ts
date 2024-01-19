'use strict';

export default function truncate(str: string, length = 120) {
    if (typeof str !== 'string') throw new TypeError('str must be a string!');
    const omission = '...';
    const omissionLength = omission.length;
    if (str.length <= length) return str;
    return str.slice(0, length - omissionLength) + omission;
}
