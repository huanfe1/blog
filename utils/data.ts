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
    const data = await getGistFileByParams('posts.json');
    let posts: PostProps[] = JSON.parse(data);
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
    const data = await fetchGistsFiles();
    if (!data[params]) throw new Error('Gist file not found: ' + params);
    return data[params].content;
}

async function fetchGistsFiles() {
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
        .then(data => data.files)
        .catch(err => console.log(err));
    return data;
}
