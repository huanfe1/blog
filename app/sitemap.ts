import dayjs from 'dayjs';
import { MetadataRoute } from 'next';

import { type PostProps, getAllPosts } from '@/utils/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts: PostProps[] = await getAllPosts();
    return [
        {
            url: 'http://www.huanfei.top',
            lastModified: dayjs().toDate(),
        },
        {
            url: 'http://www.huanfei.top/about',
            lastModified: dayjs().toDate(),
        },
        {
            url: 'http://www.huanfei.top/archives',
            lastModified: dayjs().toDate(),
        },
        ...posts.map(post => ({
            url: `http://www.huanfei.top/post/${post.slug}`,
            lastModified: dayjs(post.date).toDate(),
        })),
    ];
}
