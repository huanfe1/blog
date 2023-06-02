import { Feed } from 'feed';
import dayjs from 'dayjs';
import { allPosts } from '@/.contentlayer/generated';
import fs from 'fs';

const url = 'https://blog.huanfei.top';

const feed = new Feed({
    title: '幻非',
    description: '幻非的个人博客',
    id: url,
    link: url,
    feedLinks: {
        atom: `${url}/atom.xml`,
    },
    author: {
        name: '幻非',
        link: 'https://huanfei.top',
    },
    favicon: `${url}/favicon.ico`,
    generator: 'Nexj.js + Contentlayer',
});

export default function () {
    allPosts.sort((a, b) => dayjs(b.date) - dayjs(a.date));
    allPosts.slice(0, 20).forEach(post => {
        feed.addItem({
            title: `${post.title}`,
            id: `${url}/post/${post.abbrlink}`,
            link: `${url}/post/${post.abbrlink}`,
            description: post.excerpt,
            content: post.body.html,
            date: dayjs(post.date).toDate(),
            published: dayjs(post.date).toDate(),
        });
    });
    fs.writeFileSync('./public/atom.xml', feed.atom1());
    fs.writeFileSync('./public/rss.xml', feed.rss2());
}
