'use strict';

const counter = content => {
    const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
    const en = (
        content
            .replace(/[\u4E00-\u9FA5]/g, '')
            .match(
                /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
            ) || []
    ).length;
    return [cn, en];
};

export const min2read = (content, { cn = 300, en = 160 } = {}) => {
    const len = counter(content);
    const readingTime = len[0] / cn + len[1] / en;
    return readingTime < 1 ? '1' : parseInt(readingTime, 10);
};

export const wordcount = content => {
    const len = counter(content);
    const count = len[0] + len[1];
    if (count < 1000) {
        return count;
    }
    return Math.round(count / 100) / 10 + 'k';
};

export const totalcount = (posts, tiny = true) => {
    let count = 0;
    posts.forEach(function (post) {
        const len = counter(post.content);
        count += len[0] + len[1];
    });
    if (!tiny) return count;
    if (count < 1000) {
        return count;
    }
    return Math.round(count / 100) / 10 + 'k';
};