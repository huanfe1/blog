import dayjs from 'dayjs';
import { readingTime } from 'reading-time-estimator';

import truncate from './truncate';

export type PostProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover?: string;
    wordcount: number;
    content: string;
    tags?: string[];
    update?: string;
};

export type LinkProps = {
    title: string;
    url: string;
    avatar: string;
    slogan?: string;
};

/** 获取数据库已发布文章内容 */
export const getAllPosts = async (): Promise<PostProps[]> => {
    const data: PostProps[] = await fetchGists().then(data => JSON.parse(data['posts.json'].content));
    const posts = data.map(post => {
        return {
            title: post.title,
            slug: post.slug,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            summary: post.summary || truncate(post.content) || '',
            cover: post?.cover,
            wordcount: readingTime(post.content, 300, 'cn').words,
            content: post.content,
            tags: post?.tags,
            update: post?.update,
        };
    });
    return posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
};

export const getAllLinks = async (): Promise<LinkProps[]> => {
    const data: LinkProps[] = await fetchGists().then(data => JSON.parse(data['links.json'].content));
    return data;
};

if (!process.env.GIST_ID || !process.env.GIST_TOKEN) {
    throw new Error('GIST_ID or GIST_TOKEN is not set');
}

/** 从 Gist 获取已发布文章 */
async function fetchGists() {
    const data: PostProps[] = await fetch('https://api.github.com/gists/' + process.env.GIST_ID, {
        next: { tags: ['posts'], revalidate: 60 * 60 * 24 },
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + process.env.GIST_TOKEN,
            Accept: 'application/vnd.github+json',
        },
    })
        .then(data => data.json())
        .then(data => data.files);
    return data;
}
