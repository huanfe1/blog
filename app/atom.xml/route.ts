import { config } from '@/blog.config';
import dayjs from 'dayjs';
import { Feed } from 'feed';
import { toHtml } from 'hast-util-to-html';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { getAllPosts } from '@/utils/data';

const url = config.url;

const feed = new Feed({
    title: config.title,
    description: config.description,
    id: url,
    link: url,
    feedLinks: {
        atom: `${url}/atom.xml`,
    },
    copyright: `Copyright © 2022 - ${dayjs().format('YYYY')} HuanFei All Rights Reserved`,
    author: {
        name: config.title,
        link: url,
    },
    favicon: `${url}/favicon.ico`,
    generator: 'Nexj.js',
});

const followClaim = `
<follow_challenge>
    <feedId>48224099084379136</feedId>
    <userId>47261911326774272</userId>
</follow_challenge>
`;

export async function GET() {
    const posts = await getAllPosts();

    for (const post of posts.slice(0, 20)) {
        const pipeline = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw);
        const content = post.cover ? `![${post.slug}](${post.cover})\n${post.content}` : post.content;
        const mdastTree = pipeline.parse(content);
        feed.addItem({
            title: `${post.title}`,
            id: `${url}/post/${post.slug}`,
            link: `${url}/post/${post.slug}`,
            content: toHtml(pipeline.runSync(mdastTree)),
            description: post.summary,
            date: dayjs(post.date).toDate(),
            published: dayjs(post.date).toDate(),
        });
    }
    return new Response(feed.atom1().replace('</feed>', followClaim + '</feed>'), {
        headers: {
            'content-type': 'application/xml',
        },
    });
}
