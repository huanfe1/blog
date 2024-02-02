import dayjs from 'dayjs';
import probe from 'probe-image-size';

import cache from './cache';
import truncate from './truncate';
import { wordcount } from './wordcount';

export type AllPostsProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover: string;
};

export type PostProps = AllPostsProps & {
    content: string;
    tags: string[] | string;
    wordcount: number;
    images: { [key: string]: { width: string; height: string } };
};

/** 根据 slug 获取文章 */
export const getPostBySlug = async (slug: string): Promise<PostProps> => {
    const post = await fetchPosts().then(posts => posts.find(post => post.slug === slug));
    if (!post) return;
    const images: PostProps['images'] = {};
    for (const image of post.content.match(/!\[.*\]\((.*)\)/g) || []) {
        const url = image.match(/\((.*)\)/)[1];
        const { width, height } = await probe(url);
        images[url] = { width, height };
    }
    return {
        ...post,
        date: dayjs(post.date).format('YYYY-MM-DD'),
        wordcount: wordcount(post.content),
        images,
    };
};

/** 获取数据库已发布文章内容 */
export const getAllPosts = async (): Promise<AllPostsProps[]> => {
    const data = await fetchPosts();
    const posts = data.map(post => {
        return {
            title: post.title,
            slug: post.slug,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            summary: post.summary || truncate(post.content) || '',
            cover: post.cover || '',
        };
    });
    return posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
};

/** 从 Gist 获取已发布文章 */
async function fetchPosts(): Promise<PostProps[]> {
    const temp = cache.get('posts');
    if (temp) return temp;
    console.log('fetch', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const data = await fetch('https://api.github.com/gists/' + process.env.GIST_ID, {
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + process.env.GIST_TOKEN,
            Accept: 'application/vnd.github+json',
        },
    });
    const json = await data.json();
    const posts = JSON.parse(json.files['posts.json']['content']);
    cache.set('posts', posts, 3 * 60 * 1000);
    return posts;
}
