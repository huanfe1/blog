import fs from 'fs';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import { Feed } from 'feed';

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
    generator: 'Nexj.js + Contentlayer',
});

export default function () {
    allPosts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    const posts = allPosts.filter(post => !post.draft).slice(0, 20);
    posts.forEach(post => {
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
