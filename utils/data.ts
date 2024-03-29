import dayjs from 'dayjs';
import { readingTime } from 'reading-time-estimator';

import cache from './cache';
import truncate from './truncate';

export type PostProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover: string;
    wordcount: number;
    content: string;
    tags: string[] | string;
};

/** 获取数据库已发布文章内容 */
export const getAllPosts = async (): Promise<PostProps[]> => {
    const data = await fetchPosts();
    const posts = data.map(post => {
        return {
            title: post.title,
            slug: post.slug,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            summary: post.summary || truncate(post.content) || '',
            cover: post.cover || '',
            wordcount: readingTime(post.content, 300, 'cn').words,
            content: post.content,
            tags: post.tags || [],
        };
    });
    return posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
};

if (!process.env.GIST_ID || !process.env.GIST_TOKEN) {
    throw new Error('GIST_ID or GIST_TOKEN is not set');
}

/** 从 Gist 获取已发布文章 */
async function fetchPosts(): Promise<PostProps[]> {
    const temp = cache.get('posts');
    if (temp) return temp;
    console.log('fetch', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const posts = await fetch('https://api.github.com/gists/' + process.env.GIST_ID, {
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + process.env.GIST_TOKEN,
            Accept: 'application/vnd.github+json',
        },
    })
        .then(data => data.json())
        .then(data => JSON.parse(data.files['posts.json']['content']));
    cache.set('posts', posts, 3 * 60 * 1000);
    return posts;
}
