import dayjs from 'dayjs';
import GithubSlugger from 'github-slugger';
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
    toc?: { title: string; id: string; level: number }[];
};

export const getAllPosts = async (): Promise<PostProps[]> => {
    let posts: PostProps[] = JSON.parse((await getGistsFiles())['posts.json']['content']);
    const slugger = new GithubSlugger();
    posts = posts.map(post => {
        slugger.reset();
        return {
            title: post.title,
            slug: post.slug,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            summary: post.summary || truncate(post.content) || '',
            cover: post?.cover,
            wordcount: readingTime(post.content, 300, 'cn').words,
            content: post.content,
            tags: post?.tags,
            update: post?.update && dayjs(post.update).format('YYYY-MM-DD'),
            toc: post.content.match(/^#{1,6} (.*)$/gm)?.map(item => {
                return {
                    title: item.replace(/#{1,6} /g, ''),
                    id: slugger.slug(item.replace(/#{1,6} /g, '')),
                    level: (item.match(/#/g) as string[]).length,
                };
            }),
        };
    });
    return posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
};

if (!process.env.GIST_ID || !process.env.GIST_TOKEN) {
    throw new Error('GIST_ID or GIST_TOKEN is not set');
}

export async function getGistsFiles() {
    const data = await fetch('https://api.github.com/gists/' + process.env.GIST_ID, {
        next: { revalidate: 60 * 10 },
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
