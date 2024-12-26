import dayjs from 'dayjs';

import truncate from './truncate';

export type PostProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover?: string;
    content: string;
    tags?: string[];
    update?: string;
};

export const getAllPosts = async (): Promise<PostProps[]> => {
    let posts: PostProps[] = await getGistFileByParams('posts.json').then(data => JSON.parse(data));
    posts = posts.map(post => {
        return {
            title: post.title,
            slug: post.slug,
            content: post.content,
            cover: post.cover,
            tags: post.tags,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            summary: post.summary || truncate(post.content) || '',
            update: post?.update && dayjs(post.update).format('YYYY-MM-DD'),
        };
    });
    return posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
};

if (!process.env.GIST_ID || !process.env.GIST_TOKEN) {
    throw new Error('GIST_ID or GIST_TOKEN is not set');
}

export async function getGistFileByParams(params: string) {
    const data = await fetchGist().then(data => data.files);
    if (!(params in data)) throw new Error('Gist file not found: ' + params);
    return data[params].content;
}

export async function getLastUpdateDate() {
    const date = await fetchGist().then(data => data.updated_at);
    return dayjs(date).toDate();
}

async function fetchGist() {
    const data = await fetch('https://api.github.com/gists/' + process.env.GIST_ID, {
        next: { revalidate: 60 * 10 },
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + process.env.GIST_TOKEN,
            Accept: 'application/vnd.github+json',
        },
        cache: 'force-cache',
    })
        .then(data => data.json())
        .then(data => {
            if (data.truncated) {
                throw new Error('The current data is truncated');
            }
            return data;
        })
        .catch(err => console.log(err));
    return data;
}
