export default function truncate(str: string, length = 60) {
    if (typeof str !== 'string') return;
    str = str.trimStart().split('\n')[0];
    const omission = '...';
    const omissionLength = omission.length;
    if (str.length <= length) return str;
    return str.slice(0, length - omissionLength) + omission;
}
