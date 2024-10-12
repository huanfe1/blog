import dayjs from 'dayjs';
import GithubSlugger from 'github-slugger';
import probe from 'probe-image-size';
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
    images?: { [key: string]: { width: number; height: number } };
};

export const getAllPosts = async (): Promise<PostProps[]> => {
    const content = JSON.parse((await getGistsFiles())['posts.json']['content']);
    const slugger = new GithubSlugger();
    const posts: PostProps[] = [];
    for (const item of content) {
        slugger.reset();
        const images = {};
        const urls: string[] = item.content.match(/!\[.*\]\(.*\)/g)?.map((_: string) => _.match(/\((.*?)\)/)![1]) || [];
        await Promise.all(urls.map(_ => probe(_).then(({ width, height }) => (images[_] = { width, height }))));
        posts.push({
            title: item.title,
            slug: item.slug,
            date: dayjs(item.date).format('YYYY-MM-DD'),
            summary: item.summary || truncate(item.content) || '',
            cover: item?.cover,
            wordcount: readingTime(item.content, 300, 'cn').words,
            content: item.content,
            tags: item?.tags,
            update: item?.update && dayjs(item.update).format('YYYY-MM-DD'),
            toc: item.content.match(/^#{1,6} (.*)$/gm)?.map(item => {
                return {
                    title: item.replace(/#{1,6} /g, ''),
                    id: slugger.slug(item.replace(/#{1,6} /g, '')),
                    level: (item.match(/#/g) as string[]).length,
                };
            }),
            images,
        });
    }
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
