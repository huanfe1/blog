import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import fs from 'fs';
import { streamToPromise, SitemapStream } from 'sitemap';

export default function Sitemap() {
    const sitemap = new SitemapStream({
        hostname: 'http://blog.huanfei.top',
        xmlns: { news: false, xhtml: false, image: false, video: false },
    });
    sitemap.write({ url: '/' });
    allPosts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    allPosts
        .filter(post => !post.draft)
        .map(post => sitemap.write({ url: `/post/${post.abbrlink}`, lastmod: post.date }));
    sitemap.write({ url: '/about' });
    sitemap.write({ url: '/archive' });
    sitemap.end();
    streamToPromise(sitemap).then(buffer => fs.writeFileSync('./public/sitemap.xml', buffer.toString()));
}
