import { getAllPosts } from '@/utils/notion';
import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

export default async function Sitemap() {
    const sitemap = new SitemapStream({
        hostname: 'http://blog.huanfei.top',
        xmlns: { news: false, xhtml: false, image: false, video: false },
    });
    sitemap.write({ url: '/' });
    getAllPosts().map(post => sitemap.write({ url: `/post/${post.slug}`, lastmod: post.date }));
    sitemap.write({ url: '/about' });
    sitemap.write({ url: '/archive' });
    sitemap.end();
    streamToPromise(sitemap).then(buffer => fs.writeFileSync('./public/sitemap.xml', buffer.toString()));
}
