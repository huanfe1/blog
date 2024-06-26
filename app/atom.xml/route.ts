import dayjs from 'dayjs';
import { Feed } from 'feed';
import { toHtml } from 'hast-util-to-html';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { getAllPosts } from '@/utils/data';

const url = 'https://www.huanfei.top';

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
        link: 'https://www.huanfei.top',
    },
    favicon: `${url}/favicon.ico`,
    generator: 'Nexj.js',
});

export async function GET() {
    const posts = await getAllPosts();

    for (const post of posts.slice(0, 20)) {
        const pipeline = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeSlug);
        const mdastTree = pipeline.parse(post.content);
        feed.addItem({
            title: `${post.title}`,
            id: `${url}/post/${post.slug}`,
            link: `${url}/post/${post.slug}`,
            content: toHtml(pipeline.runSync(mdastTree, post.content)),
            description: post.summary,
            date: dayjs(post.date).toDate(),
            published: dayjs(post.date).toDate(),
        });
    }
    return new Response(feed.atom1(), {
        headers: {
            'content-type': 'application/xml',
        },
    });
}
