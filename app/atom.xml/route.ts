import dayjs from 'dayjs';
import { Feed } from 'feed';

import { getAllPosts } from '@/utils/data';

export async function GET() {
    const url = 'https://blog.huanfei.top';
    const feed = new Feed({
        title: '幻非',
        description: '幻非的个人博客',
        id: url,
        link: url,
        feedLinks: {
            atom: `${url}/atom.xml`,
        },
        copyright: `Copyright © 2022 - ${dayjs().format('YYYY')} HuanFei All Rights Reserved`,
        author: {
            name: '幻非',
            link: 'https://huanfei.top',
        },
        favicon: `${url}/favicon.ico`,
        generator: 'Nexj.js',
    });
    const posts = await getAllPosts();
    posts.slice(0, 20).forEach(post => {
        feed.addItem({
            title: `${post.title}`,
            id: `${url}/post/${post.slug}`,
            link: `${url}/post/${post.slug}`,
            description: post.summary,
            date: dayjs(post.date).toDate(),
            published: dayjs(post.date).toDate(),
        });
    });
    return new Response(feed.atom1(), {
        headers: {
            'content-type': 'application/xml',
        },
    });
}
