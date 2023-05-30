'use strict';

function truncate(str, options = {}) {
    if (typeof str !== 'string') throw new TypeError('str must be a string!');
    const { length = 30, omission = '...', separator } = options;
    const omissionLength = omission.length;
    if (str.length <= length) return str;
    if (separator) {
        const words = str.split(separator);
        let result = '';
        let resultLength = 0;
        for (const word of words) {
            const wordLength = word.length;
            if (resultLength + wordLength + omissionLength <= length) {
                result += word + separator;
                resultLength += wordLength + 1;
            } else {
                break;
            }
        }
        return result.slice(0, -1) + omission;
    }
    return str.slice(0, length - omissionLength) + omission;
}
export default truncate;
