import { config } from '@/blog.config';
import dayjs from 'dayjs';
import { MetadataRoute } from 'next';

import { type PostProps, getAllPosts } from '@/lib/data';

const url = config.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts: PostProps[] = await getAllPosts();
    return [
        {
            url: url,
            lastModified: dayjs().toDate(),
        },
        {
            url: `${url}/posts`,
            lastModified: dayjs().toDate(),
        },
        ...posts.map(post => ({
            url: `${url}/post/${post.slug}`,
            lastModified: dayjs(post.date).toDate(),
        })),
    ];
}
